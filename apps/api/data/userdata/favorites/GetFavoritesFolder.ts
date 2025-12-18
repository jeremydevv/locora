import { Env } from "../../../src/routes/types";

interface GetUserFavoritesFolder_ReturnType {
    error?: {
        code: string,
        message: string,
        status: string
    }
    ok? : boolean
}

export default async function GetUserFavoritesFolder(
    uid: string, idToken: string, business_id : string, env: Env
) : Promise<GetUserFavoritesFolder_ReturnType | null> {

    try {

        const Request = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/${business_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )

        const Data: GetUserFavoritesFolder_ReturnType = await Request.json()

        return Data

    } catch (err) {
        console.log(err)
        return null
    }

}