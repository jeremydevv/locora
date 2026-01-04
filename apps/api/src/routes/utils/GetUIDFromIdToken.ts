import { Env } from "../types"
import { checkForValidAuthorization } from "./CheckForAuth"
import JSONResponse from "./JSONResponse"

export default async function getUidFromIdToken(idToken: string, env : Env) {

    try {

        const body = JSON.stringify({
            "idToken" : idToken
        })

        const Result = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`,
            {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : body
            }
        )

        if (!Result.ok) {
            const data : {
                error : object
            } = await Result.json()
            console.log("issue occured when getting user uid", data.error)
            return false
        }

        const tokenData : {
            users : Array<{localId : string}>
        } = await Result.json()

        if (!(tokenData.users) || (tokenData.users.length === 0)) {
            console.log("no user data was returned")
            return false
        }

        return tokenData.users[0].localId
    } catch (err) {
        console.log(err)
    }

}