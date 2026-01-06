import { Env } from "../../src/routes/types";
import { SignJWT } from "jose"
import pemToArrayBuffer from "../../src/routes/v1/Waitlist/PemToArray";

export async function GetFirebaseServiceAccount(env: Env) {

    try {

        const serviceAccountCredentials: {
            private_key: string,
            client_email: string,
        } = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON)

        const privateKey = await crypto.subtle.importKey(
            "pkcs8",
            pemToArrayBuffer(serviceAccountCredentials.private_key),
            {
                name: "RSASSA-PKCS1-v1_5",
                hash: { name: "SHA-256" }
            },
            true,
            ["sign"]
        )

        const currTime = Math.floor(Date.now() / 1000)

        const signedJWT = await new SignJWT({
            scope: "https://www.googleapis.com/auth/datastore"
        })
            .setProtectedHeader({ alg: "RS256", typ: "JWT" })
            .setIssuer(serviceAccountCredentials.client_email)
            .setSubject(serviceAccountCredentials.client_email)
            .setAudience("https://oauth2.googleapis.com/token")
            .setIssuedAt(currTime)
            .setExpirationTime(currTime + 3600)
            .sign(privateKey)

        const tokenResult = await fetch("https://oauth2.googleapis.com/token", {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body : new URLSearchParams({
                grant_type : "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion : signedJWT
            })
        })

        const tokenData : {
            ok : boolean,
            access_token : string
        } = await tokenResult.json()

        if (tokenResult.ok) {
            return tokenData.access_token
        } else {
            console.log("error with oauth2: " , tokenData)
            return null
        }

    } catch (err) {
        console.log(err)
        return null
    }

}