export default async function handler(req, res) {
    try {
        const {
            code,
            state,
            error,
            error_description
        } = req.query;

        if (error) {
            return res.status(400).json({
                sucesso: false,
                erro: error,
                descricao:
                    error_description ||
                    "Erro na autorização do TikTok."
            });
        }

        if (!code) {
            return res.status(400).json({
                sucesso: false,
                erro:
                    "Código de autorização não recebido."
            });
        }

        if (state !== "tvgrandemidia") {
            return res.status(400).json({
                sucesso: false,
                erro: "State inválido."
            });
        }

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

        const redirectUri =
            "https://tvgrandemidia.vercel.app/api/auth/tiktok/callback";

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
                JSON.stringify(
                    dadosTikTok,
                    null,
                    2
                )
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

        if (
            !respostaUsuario.ok ||
            (
                dadosUsuario.error?.code &&
                dadosUsuario.error.code !== "ok"
            )
        ) {
            console.error(
                "ERRO COMPLETO USER.INFO.BASIC:",
                JSON.stringify(
                    dadosUsuario,
                    null,
                    2
                )
            );

            return res.status(400).json({
                sucesso: false,
                etapa: "user.info.basic",
                erro:
                    dadosUsuario.error?.code ||
                    "Erro ao consultar informações do usuário.",
                descricao:
                    dadosUsuario.error?.message ||
                    null,
                resposta_tiktok:
                    dadosUsuario
            });
        }

        const usuario =
            dadosUsuario.data?.user || {};

        const respostaCreator = await fetch(
            "https://open.tiktokapis.com/v2/post/publish/creator_info/query/",
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,
                    "Content-Type":
                        "application/json"
                }
            }
        );

        const dadosCreator =
            await respostaCreator.json();

        if (
            !respostaCreator.ok ||
            (
                dadosCreator.error?.code &&
                dadosCreator.error.code !== "ok"
            )
        ) {
            console.error(
                "Erro no creator_info:",
                JSON.stringify(
                    dadosCreator,
                    null,
                    2
                )
            );

            return res.status(400).json({
                sucesso: false,
                etapa: "creator_info",
                erro:
                    dadosCreator.error?.code ||
                    "Erro ao consultar informações do criador.",
                descricao:
                    dadosCreator.error?.message ||
                    null,
                resposta_tiktok:
                    dadosCreator
            });
        }

        const respostaVideoInit = await fetch(
            "https://open.tiktokapis.com/v2/post/publish/video/init/",
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,
                    "Content-Type":
                        "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    post_info: {
                        title:
                            "Teste TV Grande Mídia",
                        privacy_level:
                            "SELF_ONLY",
                        disable_duet: false,
                        disable_comment: false,
                        disable_stitch: false
                    },
                    source_info: {
                        source:
                            "FILE_UPLOAD",
                        video_size:
                            1000000,
                        chunk_size:
                            1000000,
                        total_chunk_count:
                            1
                    }
                })
            }
        );

        const dadosVideoInit =
            await respostaVideoInit.json();

        if (
            !respostaVideoInit.ok ||
            (
                dadosVideoInit.error?.code &&
                dadosVideoInit.error.code !== "ok"
            )
        ) {
            console.error(
                "ERRO COMPLETO VIDEO.INIT:",
                JSON.stringify(
                    dadosVideoInit,
                    null,
                    2
                )
            );

            return res.status(400).json({
                sucesso: false,
                etapa: "video.init",
                erro:
                    dadosVideoInit.error?.code ||
                    "Erro ao iniciar publicação do vídeo.",
                descricao:
                    dadosVideoInit.error?.message ||
                    null,
                resposta_tiktok:
                    dadosVideoInit
            });
        }

        return res.status(200).json({
            sucesso: true,

            mensagem:
                "TikTok autorizado e video/init executado com sucesso.",

            autorizacao: {
                open_id:
                    dadosTikTok.open_id,

                token_recebido:
                    true,

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
            },

            creator_info:
                dadosCreator.data || null,

            video_init: {
                publish_id:
                    dadosVideoInit.data?.publish_id || null,

                upload_url_recebido:
                    !!dadosVideoInit.data?.upload_url
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