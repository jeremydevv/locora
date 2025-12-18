import { Env, User_FavoriteInFolder, User_FavoritesFolder } from "../../../src/routes/types";
import { GetUserFavoritesFolder } from "../favorites/GetFavoritesFolder"
import { CreateUserFavoritesFolder } from "../favorites/CreatesFavoritesFolder"
import { ExecuteFavoriteAction } from "../favorites/FavoriteExecution"
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount";

async function DoesBusinessExistInData(uid : string, search_id : string, env : Env) : Promise<boolean> {

    const service_acc_jwt = await GetFirebaseServiceAccount(env)

    try {

        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/favorites/${search_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${service_acc_jwt}`
                }
            }
        )

        const Data : {
            error : object
        } = await Result.json()

        if (!Result.ok && Result.status !== 404) {
            console.log("issue with firebase request to see if a business is favorited!")
            console.log(Data.error)
            return false
        }

        return Result.status == 404 ? false : true

    } catch(err) {
        console.log("errored trying to see if something was favorited!")
        return false
    }

    return false
}

export default async function ModifyFavoriteForUser(uid: string, business_id: string, env : Env) {

    try {

        const FavoriteFolderData = await GetUserFavoritesFolder(uid,env)

        if (!FavoriteFolderData || (FavoriteFolderData.error && FavoriteFolderData.error.code == "404")) {

            const newFolderRes = await CreateUserFavoritesFolder(uid,business_id,env)

            if (!newFolderRes) {
                console.log("no new folder res")
                return "error"
            }
            
            console.log("new folder made: " , newFolderRes)

            return "added"
        } else if (FavoriteFolderData && FavoriteFolderData.documents) {
            // their folder for favorite exists, check if business id is in there, else, add it

            const BusinessesFavorited = FavoriteFolderData.documents
            const isBusinessFavorited = await DoesBusinessExistInData(uid,business_id,env)

            if (isBusinessFavorited != false) {
                // the user did not favorite the business

                const result = await ExecuteFavoriteAction(uid,business_id,"remove",env)

                return "added"
            } else {
                // the user did favorite this business, finna unfavorite

                const result = await ExecuteFavoriteAction(uid, business_id ,"add",env)

                return "removed"
            }

        } else {

            console.log("outlier")
            console.log(FavoriteFolderData)

            return "error"
        }

    } catch (err) {
        console.log(err)
    }

    return "added"

}