import { Env } from "../../../src/routes/types";
import GetUserFavoritesFolder from "../favorites/GetFavoritesFolder"
import CreateUserFavoritesFolder from "../favorites/CreatesFavoritesFolder"
import InternalError from "../../../src/routes/utils/InternalError";

export default async function ModifyFavoriteForUser(uid: string, idToken: string, business_id: string, env : Env) {

    try {

        const FavoriteFolderData = await GetUserFavoritesFolder(uid,idToken,business_id,env)

        if (!FavoriteFolderData || (FavoriteFolderData.error && FavoriteFolderData.error.code == "403")) {
            // their folder for favorites doesnt exist
            console.log("favorites folder doesnt exist")

            const newFolderRes = await CreateUserFavoritesFolder(uid,idToken,business_id,env)

            if (!newFolderRes) {
                return "error"
            }
            
            console.log(newFolderRes.error)

            return "added"
        } else if (FavoriteFolderData && FavoriteFolderData.ok) {
            // their folder for favorite exists, check if business id is in there, else, add it

            return "removed"

        } else {
            
            return "error"
        }

    } catch (err) {
        console.log(err)
    }

    return "added"

}