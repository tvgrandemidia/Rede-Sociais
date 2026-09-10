export default async function handler(req, res) {
    try {
        const { code, state, error, error_description } = req.query;

        // TikTok retornou um erro
        if (error) {
            return res.status(400).json({
                sucesso: false,
                erro: error,
                descricao: error_description || "Erro na autorização do TikTok"
            });
        }

        // Verifica se recebemos o código
        if (!code) {
            return res.status(400).json({
                sucesso: false,
                erro: "Código de autorização não recebido."
            });
        }

        // Verificação temporária do state
        if (state !== "tvgrandemidia") {
            return res.status(400).json({
                sucesso: false,
                erro: "State inválido."
            });
        }

        const clientKey = process.env.TIKTOK_CLIENT_KEY;
        const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

        if (!clientKey || !clientSecret) {
            return res.status(500).json({
                sucesso: false,
                erro: "Credenciais do TikTok não configuradas na Vercel."
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

        const resposta = await fetch(
            "https://open.tiktokapis.com/v2/oauth/token/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok || dados.error) {
            console.error("Erro retornado pelo TikTok:", dados);

            return res.status(400).json({
                sucesso: false,
                erro: dados.error || "Erro ao trocar código por token.",
                descricao: dados.error_description || null
            });
        }

        console.log("TikTok autorizado com sucesso.");
        console.log("Open ID:", dados.open_id);

        return res.status(200).json({
            sucesso: true,
            mensagem: "TikTok autorizado com sucesso.",
            open_id: dados.open_id,
            token_recebido: !!dados.access_token,
            expires_in: dados.expires_in
        });

    } catch (erro) {
        console.error("Erro no callback TikTok:", erro);

        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno no callback.",
            descricao: erro.message
        });
    }
}