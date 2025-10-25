import { SignJWT } from "jose";
import { env } from "cloudflare:workers";

import { Env } from "../../types";
import pemToArrayBuffer from "./PemToArray";

const creds = JSON.parse((env as Env).GOOGLE_SERVICE_ACCOUNT_JSON!);
const private_key = creds.private_key!;
const client_email = creds.client_email!;

export async function getAccessToken() {
    
    const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        pemToArrayBuffer(private_key),
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        true,
        ["sign"]
    );

    const now = Math.floor(Date.now() / 1000);

    console.log((env as Env).SPREADSHEET_ID, (env as Env).GOOGLE_SERVICE_ACCOUNT_JSON)

    const signed_jwt = await new SignJWT({
        scope: "https://www.googleapis.com/auth/spreadsheets",
    })
        .setProtectedHeader({ alg: "RS256", typ: "JWT" })
        .setIssuer(client_email)
        .setAudience(creds.token_uri!)
        .setIssuedAt(now)
        .setExpirationTime(now + 3600)
        .sign(privateKey);

    const Response = await fetch(creds.token_uri!, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signed_jwt}`,
    });

    const ResponseData = (await Response.json() as { access_token: string });
    return ResponseData.access_token

}