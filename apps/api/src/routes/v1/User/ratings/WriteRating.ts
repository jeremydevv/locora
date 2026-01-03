import { Env } from "../../../types";
import CreateUserRating from "../../../../../data/userdata/ratings/CreateRating";
import DoesRatingExist from "../../../../../data/userdata/ratings/DoesRatingExist"
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import Unauthorized from "../../../utils/Unauthorized";
import InternalError from "../../../utils/InternalError";
import MalformedData from "../../../utils/MalformedRequest";
import JSONResponse from "../../../utils/JSONResponse";
import CreateBusinessRating from "../../Business/Endpoints/CreateRating";
import { FetchUserRecord } from "../../../../../data/firebaseUserData";
import cleanFirebaseData from "../../../utils/CleanFirebaseData";

export default async function WriteNewRating(
    req : Request,
    env : Env
) {

    const requestURL = new URL(req.url)

    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const business_id = requestURL.searchParams.get('businessId')

    if (!idToken || idToken === "") {
        console.log(idToken)
        console.log("didnt get the token")
        return Unauthorized(req)
    }

    if (!business_id || business_id == "") {
        return MalformedData(req,"No business ID was provided!")
    }

    const UID = await getUidFromIdToken(idToken,env)

    if (!UID || UID == "") {
        console.log("didnt get the uid!")
        return Unauthorized(req)
    }

    let Body : {
        header : string,
        text : string,
        rating : string
    } | null = null

    try {
        Body = await req.json()
    } catch(err) {
        Body = null
    }

    if (!Body || Body.header == null || Body.rating == null || Body.text == null) {
        return MalformedData(req,"Missing information for the rating!")
    }

    const PreexistingRatingOnBusiness : boolean | null = await DoesRatingExist(UID,business_id,env)

    if (PreexistingRatingOnBusiness === true) {
        return JSONResponse(req,{
            message : "This business was already rated!",
            success : false
        },409)
    }

    const userInformation = await FetchUserRecord(UID,idToken,env)

    if (!userInformation) {
        return InternalError(req)
    }

    const username = (userInformation as {username : {stringValue : string}}).username.stringValue

    const userRatingAdded : Response | boolean = await CreateUserRating(req,UID,business_id,{
        name : username,
        uid : UID,
        header : Body.header,
        text : Body.text,
        rating : Body.rating
    }, env)

    if (userRatingAdded === false || (userRatingAdded as Response).status == 409) {
        return InternalError(req)
    }

    const businessRatingAdded = await CreateBusinessRating(business_id,UID,Body.header,Body.text,Body.rating,username,env)

    return userRatingAdded

}