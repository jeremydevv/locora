import { Env } from "../../../types";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import ModifyFavoriteForUser from "../../../../../data/userdata/favorites/ModifyUserFavorite";
import MalformedData from "../../../utils/MalformedRequest";
import InternalError from "../../../utils/InternalError";
import JSONResponse from "../../../utils/JSONResponse";

export default async function ModifyUserFavorites(req : Request, env : Env) {
    // todo: add the favorite to the business's favorites num

    const url = new URL(req.url)
    
    const business_id = url.searchParams.get("id")

    if (!business_id) {
        return MalformedData(req,"No business_id provided.")
    }

    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const UID = await getUidFromIdToken(idToken,env)

    if (!idToken || !UID) {
        return MalformedData(req, "No UID or no idToken found for user.")
    }

    const ActionToUser = await ModifyFavoriteForUser(UID,business_id,env)

    if (ActionToUser == "added") {
        return JSONResponse(req,{
            "action" : "added"
        })
    } else if (ActionToUser == "removed") {
        return JSONResponse(req,{
            "action" : "removed"
        })
    } else {
        return InternalError(req)
    }

}