import { Env, User_FavoritesFolder, User_RatingInFolder } from "../../../src/routes/types";
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount";

interface GetUserRatingsFolder_ReturnType {
    error?: {
        code: string,
        message: string,
        status: string
    }
    
    documents : User_RatingInFolder
}

export async function GetUserRatingsFolder(
    uid: string, env: Env
) : Promise<GetUserRatingsFolder_ReturnType | null> {

    try {

        const service_acc_jwt = await GetFirebaseServiceAccount(env)

        const Request = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/ratings`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${service_acc_jwt}`
                }
            }
        )

        const Data: GetUserRatingsFolder_ReturnType = await Request.json()

        if (!Request.ok) {
            console.log("issue with getting the users ratings folder!",Data.error)
            return null
        }

        return Data

    } catch (err) {
        console.log(err)
        return null
    }

}