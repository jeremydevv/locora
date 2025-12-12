import { Env } from "../../../src/routes/types";
import { FetchUserRecord } from "../../firebaseUserData";

export default async function ModifyFavoriteForUser(uid: string, idToken: string, business_id: string, env : Env) {

    try {

        const Request = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/${business_id}`,
            {
                headers : {
                    "Authorization" : "Bearer " + idToken 
                }
            }
        )

        const Data : {
            error? : object
        } = await Request.json()

        if (!Request.ok) {
            console.log(Data.error || "no error bruh")
        }

    } catch (err) {
        console.log(err)
    }

    return "added"

}