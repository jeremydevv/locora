import { Env } from "../../../types";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import { NotFound } from "../../../utils/NotFound";
import Unauthorized from "../../../utils/Unauthorized";
import AddFavorite from "./ModifyFavorite";
import GetUsersFavorites from "./GetFavorites";
import ModifyFavorites from "../../Business/D1Interactions/Favorites/FavoritesModify";
import ModifyUserFavorites from "./ModifyFavorite";

export default async function FavoritesEndpoint(req: Request, env: Env) {

    // auth
    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const uid = await getUidFromIdToken(idToken, env)

    if ((!uid) || (idToken == "")) {
        return Unauthorized(req)
    }

    // directing
    const path = req.url.split("/v1/users/favorites/")[1];
    const segments = path.split("/");

    if (segments[0].startsWith("getfavorites")) {
        return GetUsersFavorites(req, env)
    } else if (segments[0].startsWith("modifyfavorite")) {
        return ModifyUserFavorites(req,env)
    } else {
        return NotFound(req)
    }

}