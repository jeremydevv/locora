import { Env } from "../../../types";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import { NotFound } from "../../../utils/NotFound";
import Unauthorized from "../../../utils/Unauthorized";
import GetUserRatings from "./GetRatings";

export default async function RatingsEndpoint(req: Request, env: Env) {

    // auth
    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const uid = await getUidFromIdToken(idToken, env)

    if ((!uid) || (idToken == "")) {
        return Unauthorized(req)
    }

    // directing
    const path = req.url.split("/v1/users/ratings/")[1];
    const segments = path.split("/");

    if (segments[0].startsWith("getRatings")) {
        return GetUserRatings(req, env)
    } else {
        return NotFound(req)
    }

}