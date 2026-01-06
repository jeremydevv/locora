import { Env } from "../../../types";
import DeleteUserRating from "../../../../../data/userdata/ratings/DeleteRating";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import Unauthorized from "../../../utils/Unauthorized";
import InternalError from "../../../utils/InternalError";
import MalformedData from "../../../utils/MalformedRequest";
import DoesUserRatingExist from "../../../../../data/userdata/ratings/DoesRatingExist";
import JSONResponse from "../../../utils/JSONResponse";

export default async function RemoveRating(
    req : Request,
    env : Env
) {

    const requestURL = new URL(req.url)

    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const business_id = requestURL.searchParams.get('businessId')

    if (!idToken || idToken === "") {
        return Unauthorized(req)
    }

    if (!business_id || business_id == "") {
        return MalformedData(req,"No business ID was provided!")
    }

    const UID = await getUidFromIdToken(idToken,env)

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

    const PreexistingRatingOnBusiness : boolean | null = await DoesUserRatingExist(UID,business_id,env)
    
        if (PreexistingRatingOnBusiness === false) {
            return JSONResponse(req,{
                message : "This business was never rated!",
                success : false
            },404)
        }

    const userRatingRemoved = await DeleteUserRating(UID,business_id,env)

    return userRatingRemoved

}