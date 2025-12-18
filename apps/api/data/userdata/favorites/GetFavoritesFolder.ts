import { Env, User_FavoritesFolder } from "../../../src/routes/types";
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount";

interface GetUserFavoritesFolder_ReturnType {
    error?: {
        code: string,
        message: string,
        status: string
    }
    
    documents : User_FavoritesFolder
}

export async function GetUserFavoritesFolder(
    uid: string, env: Env
) : Promise<GetUserFavoritesFolder_ReturnType | null> {

    try {

        const service_acc_jwt = await GetFirebaseServiceAccount(env)

        const Request = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${service_acc_jwt}`
                }
            }
        )

        const Data: GetUserFavoritesFolder_ReturnType = await Request.json()

        if (!Request.ok) {
            console.log("issue with getting the users fav folder!")
            console.log(Data.error)
            return null
        }

        return Data

    } catch (err) {
        console.log(err)
        return null
    }

}