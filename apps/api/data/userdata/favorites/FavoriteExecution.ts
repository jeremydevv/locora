import { Env } from "../../../src/routes/types";
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount";

export async function ExecuteFavoriteAction(
    uid : string,
    location : string | number,
    action : "add" | "remove",
    env : Env
) {

    const service_acc_jwt = await GetFirebaseServiceAccount(env)

    try {

        if (action == "add") {

            const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/${location}`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    fields: {
                        business_id : { stringValue : location },
                        timeCreated : {timestampValue : new Date().toISOString()}
                    }
                })
            })

            const Data : {
                error : object
            } = await Result.json()

            if (!Result.ok) {
                console.log("issue with adding business to favorites" , Data.error)
                return null
            }

        } else if (action == "remove") {

            const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/${location}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                },
            })

            const Data = await Result.json()

            if (!Result.ok && Result.status !== 404) {
                console.log("issue with removing business from favorites" , Data)
                return null
            }

        }

    } catch(err) {
        console.log(err)
        return null
    }

}