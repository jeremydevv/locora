import { Env } from "../../../types";
import DeleteUserRating from "../../../../../data/userdata/ratings/DeleteRating";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import Unauthorized from "../../../utils/Unauthorized";
import InternalError from "../../../utils/InternalError";
import MalformedData from "../../../utils/MalformedRequest";

export default async function RemoveRating(
    req : Request,
    env : Env
) {

    const requestURL = new URL(req.url)

    const Token = req.headers.get("Authorization")?.replace("Bearer ","")
    const business_id = requestURL.searchParams.get('businessId')

    if (!Token || Token === "") {
        return Unauthorized(req)
    }

    if (!business_id || business_id == "") {
        return MalformedData(req,"No business ID was provided!")
    }

    const UID = await getUidFromIdToken(Token,env)

    if (!UID || UID == "") {
        return Unauthorized(req)
    }

    const Body : {
        header : string,
        text : string,
        rating : string
    } = await req.json()

    if (!Body || !Body.header || !Body.rating || !Body.text) {
        return MalformedData(req,"Missing information for the rating!")
    }

    const userRatingRemoved = await DeleteUserRating(UID,business_id,env)

}