import { Env } from "../../../src/routes/types"
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount"

export default async function DeleteUserRating(
    uid: string,
    business_id: string,
    env: Env
) {

    const service_acc_jwt = GetFirebaseServiceAccount(env)

    try {

        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/ratings/${business_id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                },
            })

        const Data = await Result.json()

        if (!Result.ok && Result.status !== 404) {
            console.log("issue with removing business from favorites", Data)
            return null
        }

    } catch (err) {

        console.log("Issue with removing a rating from a business", err)

    }

}