import "dotenv/config";

import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error(
        "DATABASE_URL não configurada no .env"
    );
}

const sql = neon(DATABASE_URL);


/**
 * Salva a autorização do TikTok.
 *
 * Se o open_id já existir, atualiza os dados
 * da autorização existente.
 */
export async function salvarTokenTikTok({
    openId,
    accessToken,
    refreshToken,
    accessExpiresAt,
    refreshExpiresAt = null,
    scope = null
}) {
    if (
        !openId ||
        !accessToken ||
        !refreshToken ||
        !accessExpiresAt
    ) {
        throw new Error(
            "Dados obrigatórios do token TikTok não informados."
        );
    }

    await sql`
        INSERT INTO tiktok_tokens (
            open_id,
            access_token,
            refresh_token,
            access_expires_at,
            refresh_expires_at,
            scope,
            created_at,
            updated_at
        )
        VALUES (
            ${openId},
            ${accessToken},
            ${refreshToken},
            ${accessExpiresAt},
            ${refreshExpiresAt},
            ${scope},
            NOW(),
            NOW()
        )
        ON CONFLICT (open_id)
        DO UPDATE SET
            access_token = EXCLUDED.access_token,
            refresh_token = EXCLUDED.refresh_token,
            access_expires_at = EXCLUDED.access_expires_at,
            refresh_expires_at = EXCLUDED.refresh_expires_at,
            scope = EXCLUDED.scope,
            updated_at = NOW()
    `;
}


/**
 * Obtém a autorização mais recente do TikTok.
 */
export async function obterTokenTikTok() {
    const resultado = await sql`
        SELECT
            id,
            open_id,
            access_token,
            refresh_token,
            access_expires_at,
            refresh_expires_at,
            scope,
            created_at,
            updated_at
        FROM tiktok_tokens
        ORDER BY updated_at DESC
        LIMIT 1
    `;

    if (resultado.length === 0) {
        return null;
    }

    return resultado[0];
}


/**
 * Atualiza os tokens após uma renovação.
 *
 * O TikTok pode retornar um novo refresh_token.
 * Por isso, sempre substituímos o antigo pelo recebido.
 */
export async function atualizarTokenTikTok({
    openId,
    accessToken,
    refreshToken,
    accessExpiresAt,
    refreshExpiresAt = null
}) {
    if (
        !openId ||
        !accessToken ||
        !refreshToken ||
        !accessExpiresAt
    ) {
        throw new Error(
            "Dados obrigatórios para atualização do token não informados."
        );
    }

    await sql`
        UPDATE tiktok_tokens
        SET
            access_token = ${accessToken},
            refresh_token = ${refreshToken},
            access_expires_at = ${accessExpiresAt},
            refresh_expires_at = ${refreshExpiresAt},
            updated_at = NOW()
        WHERE open_id = ${openId}
    `;
}


/**
 * Remove a autorização armazenada.
 *
 * Útil futuramente caso seja necessário
 * desconectar a conta TikTok.
 */
export async function removerTokenTikTok(openId) {
    if (!openId) {
        throw new Error(
            "openId não informado."
        );
    }

    await sql`
        DELETE FROM tiktok_tokens
        WHERE open_id = ${openId}
    `;
}