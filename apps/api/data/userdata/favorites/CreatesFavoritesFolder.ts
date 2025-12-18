import { Env } from "../../../src/routes/types"
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount"

interface CreateUserFavoritesFolder_ReturnType {
    error?: {
        code: string,
        message: string,
        status: string
    }
    ok? : boolean
}


export async function CreateUserFavoritesFolder(
    uid : string, business_id : string, env : Env
) : Promise<CreateUserFavoritesFolder_ReturnType | null> {

    const service_acc_jwt = await GetFirebaseServiceAccount(env)
    
    try {

        const AddFolderRequest = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/_meta`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    fields: {
                        timeCreated : {timestampValue : new Date().toISOString()}
                    }
                })
            }
        )

        const Data : CreateUserFavoritesFolder_ReturnType = await AddFolderRequest.json()

        if (!AddFolderRequest.ok) {
            console.log("issue with creating user favorites folder!")
            console.log(Data.error)
            return null
        }

        return Data
        
    } catch(err) {
        console.log(err)
        return null
    }

}