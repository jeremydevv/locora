import { DataPayload } from "../../types";
import baseAPIUrl from "./BaseAPIUrl";

async function CheckForTokenValidity() : Promise<string> {
    
    const expiresIn = await window.authAPI?.getExpiresIn()

    console.log("expires in" , expiresIn)

    if (!expiresIn || expiresIn == "") {
        console.log("User isn't logged in, shouldnt be sending with auth header.")
        return ""
    }

    if (Date.now() >= +expiresIn) {
        console.log("the expiresIn says that its expired, refreshing session")
        const newPayload : DataPayload = await window.authAPI?.refreshSessionData() as DataPayload

        if (!newPayload.idToken) {
            console.log("No idtoken was recieved from the newpayload refresh")
        }

        console.log(newPayload)
        return newPayload.idToken as string
    } else {

        const idToken = await window.authAPI?.getIdToken()

        if (!idToken) {
            console.log("got no idtoken")
            return ""
        }

        return idToken
    }
    
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = baseAPIUrl();

    if ((options?.headers && "Authorization" in options.headers) || (options?.headers instanceof Headers && options.headers.get("Authorization"))) {
        console.log("auth header present")
        const checkedIdToken : string = await CheckForTokenValidity()

        if (checkedIdToken == "") {
            console.log("Auth header is missing?")
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
