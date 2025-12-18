import { GetUserFavoritesFolder } from "../../../../../data/userdata/favorites/GetFavoritesFolder";
import { Env } from "../../../types";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import InternalError from "../../../utils/InternalError";
import JSONResponse from "../../../utils/JSONResponse";

export default async function GetUsersFavorites(req : Request, env : Env) {
    // todo: get the list from the users firebase data

    const UID = await getUidFromIdToken(req.headers.get("Authorization") || "", env)

    console.log("user uid" , UID)

    if (!UID || UID === "") {
        console.log("the users UID was invalid or couldnt be fetched.")
        return InternalError(req)
    }

    try {
        const FavoritesData = GetUserFavoritesFolder(UID,env)

        console.log(FavoritesData)

        return JSONResponse(req,{
            success : true,
            message: "endpoint was hit right"
        },200)

    } catch(err) {
        console.log("issue getting the users favorites")
        console.log(err)
        return InternalError(req)
    }

}