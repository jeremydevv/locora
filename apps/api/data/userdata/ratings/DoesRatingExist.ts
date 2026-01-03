import { Env } from "../../../src/routes/types"
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount"

export default async function DoesUserRatingExist(
    uid : string,
    business_id : string,
    env : Env
) : Promise<boolean | null> {
    
    const service_acc_jwt = GetFirebaseServiceAccount(env)

    try {

        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/ratings/${business_id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                },
            })

        if (!Result.ok) {
            if (Result.status == 404) {
                return false
            }
            return null
        }

        return Result.ok ? true : null

    } catch(err) {
        console.log("Issue with checking if a rating existed under a user", err)
        return null
    }

    return null

}