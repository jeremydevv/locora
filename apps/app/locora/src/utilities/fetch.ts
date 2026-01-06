import { DataPayload } from "../../types";
import baseAPIUrl from "./BaseAPIUrl";

async function CheckForTokenValidity() : Promise<string> {
    
    const expiresIn = await window.authAPI?.getExpiresIn()

    if (!expiresIn || expiresIn == "") {
        return ""
    }

    if (Date.now() >= Number(expiresIn) - (300 * 1000)) {
        try {
            const newPayload : DataPayload = await window.authAPI?.refreshSessionData() as DataPayload

            if (!newPayload || !newPayload.idToken) {
                return ""
            }

            return newPayload.idToken as string
        } catch(err) {
            console.log("Refreshing the users idToken failed!", err)
            return ""
        }
    } else {

        const idToken = await window.authAPI?.getIdToken()

        if (!idToken) {
            return ""
        }

        return idToken
    }
    
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = baseAPIUrl();

    if ((options?.headers && "Authorization" in options.headers) || (options?.headers instanceof Headers && options.headers.get("Authorization"))) {
        const checkedIdToken : string = await CheckForTokenValidity()

        if (checkedIdToken == "") {
            return new Response(JSON.stringify({
                success : false,
                message : "No Valid Authheader Present"
            }))
        }

        if (options.headers instanceof Headers) {
            options.headers.set("Authorization",`Bearer ${checkedIdToken}`)
        } else {
            options.headers = {
                ...options.headers,
                Authorization : `Bearer ${checkedIdToken}`
            }
        }

    }

    return fetch(`${baseUrl}${path}`, options);
}

export default request;
