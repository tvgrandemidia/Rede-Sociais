export default async function handler(req, res) {
    try {
        const {
            code,
            state,
            error,
            error_description
        } = req.query;

        // ======================================
        // 1. VERIFICAR ERRO DO TIKTOK
        // ======================================

        if (error) {
            return res.status(400).json({
                sucesso: false,
                erro: error,
                descricao:
                    error_description ||
                    "Erro na autorização do TikTok."
            });
        }

        // ======================================
        // 2. VERIFICAR CODE
        // ======================================

        if (!code) {
            return res.status(400).json({
                sucesso: false,
                erro: "Código de autorização não recebido."
            });
        }

        // ======================================
        // 3. VERIFICAR STATE
        // ======================================

        if (state !== "tvgrandemidia") {
            return res.status(400).json({
                sucesso: false,
                erro: "State inválido."
            });
        }

        // ======================================
        // 4. PEGAR CREDENCIAIS
        // ======================================

        const clientKey =
            process.env.TIKTOK_CLIENT_KEY;

        const clientSecret =
            process.env.TIKTOK_CLIENT_SECRET;

        if (!clientKey || !clientSecret) {
            return res.status(500).json({
                sucesso: false,
                erro:
                    "Credenciais do TikTok não configuradas na Vercel."
            });
        }

        // ======================================
        // 5. REDIRECT URI
        // ======================================

        const redirectUri =
            "https://tvgrandemidia.vercel.app/api/auth/tiktok/callback";

        // ======================================
        // 6. TROCAR CODE POR ACCESS TOKEN
        // ======================================

        const body = new URLSearchParams({
            client_key: clientKey,
            client_secret: clientSecret,
            code,
            grant_type: "authorization_code",
            redirect_uri: redirectUri
        });

        const respostaToken = await fetch(
            "https://open.tiktokapis.com/v2/oauth/token/",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body
            }
        );

        const dadosTikTok =
            await respostaToken.json();

        if (
            !respostaToken.ok ||
            dadosTikTok.error
        ) {
            console.error(
                "Erro ao trocar code por token:",
                dadosTikTok
            );

            return res.status(400).json({
                sucesso: false,
                etapa: "troca_token",
                erro:
                    dadosTikTok.error ||
                    "Erro ao trocar código por token.",
                descricao:
                    dadosTikTok.error_description ||
                    null
            });
        }

        // ======================================
        // 7. VERIFICAR SE TOKEN FOI RECEBIDO
        // ======================================

        const accessToken =
            dadosTikTok.access_token;

        if (!accessToken) {
            return res.status(400).json({
                sucesso: false,
                etapa: "troca_token",
                erro:
                    "O TikTok não retornou um access token."
            });
        }

        console.log(
            "TikTok autorizado com sucesso."
        );

        console.log(
            "Open ID:",
            dadosTikTok.open_id
        );

        // ======================================
        // 8. CONSULTAR USER.INFO.BASIC
        // ======================================

        const respostaUsuario = await fetch(
            "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
            {
                method: "GET",
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`
                }
            }
        );

        const dadosUsuario =
            await respostaUsuario.json();

        // ======================================
        // 9. VERIFICAR RESPOSTA DO USER.INFO
        // ======================================

        if (
            !respostaUsuario.ok ||
            dadosUsuario.error?.code
        ) {
            console.error(
                "Erro no user.info.basic:",
                dadosUsuario
            );

            return res.status(400).json({
                sucesso: false,
                etapa: "user.info.basic",
                erro:
                    dadosUsuario.error?.code ||
                    "Erro ao consultar informações do usuário.",
                descricao:
                    dadosUsuario.error?.message ||
                    null
            });
        }

        // ======================================
        // 10. PEGAR DADOS DO USUÁRIO
        // ======================================

        const usuario =
            dadosUsuario.data?.user || {};

        console.log(
            "user.info.basic consultado com sucesso."
        );

        console.log(
            "Display Name:",
            usuario.display_name
        );

        console.log(
            "Open ID:",
            usuario.open_id
        );

        // ======================================
        // 11. RETORNO DO TESTE
        // ======================================
        //
        // IMPORTANTE:
        // O access_token NÃO é retornado.
        //

        return res.status(200).json({
            sucesso: true,

            mensagem:
                "TikTok autorizado e user.info.basic consultado com sucesso.",

            autorizacao: {
                open_id: dadosTikTok.open_id,
                token_recebido:
                    !!dadosTikTok.access_token,
                expires_in:
                    dadosTikTok.expires_in
            },

            usuario: {
                open_id:
                    usuario.open_id || null,

                union_id:
                    usuario.union_id || null,

                display_name:
                    usuario.display_name || null,

                avatar_url:
                    usuario.avatar_url || null
            }
        });

    } catch (erro) {
        console.error(
            "Erro no callback TikTok:",
            erro
        );

        return res.status(500).json({
            sucesso: false,
            etapa: "callback",
            erro:
                "Erro interno no callback do TikTok.",
            descricao:
                erro.message
        });
    }
}