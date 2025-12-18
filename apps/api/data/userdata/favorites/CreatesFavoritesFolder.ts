import { Env } from "../../../src/routes/types"

interface CreateUserFavoritesFolder_ReturnType {
    error?: {
        code: string,
        message: string,
        status: string
    }
    ok? : boolean
}


export default async function CreateUserFavoritesFolder(
    uid : string, idToken : string, business_id : string, env : Env
) : Promise<CreateUserFavoritesFolder_ReturnType | null> {
    
    try {

        const AddFolderRequest = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${idToken}`
                },
                body : JSON.stringify({
                    fields: {
                        timeCreated : {timestampValue : new Date().toISOString()}
                    }
                })
            }
        )

        const Data : CreateUserFavoritesFolder_ReturnType = await AddFolderRequest.json()

        return Data
        
    } catch(err) {
        console.log(err)
        return null
    }

}