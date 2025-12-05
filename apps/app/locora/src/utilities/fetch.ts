import { DataPayload } from "../../types";
import baseAPIUrl from "./BaseAPIUrl";

async function CheckForTokenValidity() : Promise<string> {
    
    const expiresIn = await window.authAPI?.getExpiresIn()

    if (!expiresIn || expiresIn == "") {
        console.log("User isn't logged in, shouldnt be sending with auth header.")
        return ""
    }

    if (Date.now() >= Number(expiresIn) - (300 * 1000)) {
        console.log("the expiresIn says that its expired, refreshing session")
        const newPayload : DataPayload = await window.authAPI?.refreshSessionData() as DataPayload

        if (!newPayload.idToken) {
            console.log("No idtoken was recieved from the newpayload refresh")
            return ""
        }

        return newPayload.idToken as string
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
