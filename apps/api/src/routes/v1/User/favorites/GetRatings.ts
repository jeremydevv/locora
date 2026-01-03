import { Env } from "../../../types";
import {GetUserRatingsFolder} from "../../../../../data/userdata/ratings/GetRatingsFolder"
import MalformedData from "../../../utils/MalformedRequest";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";
import JSONResponse from "../../../utils/JSONResponse";

export default async function GetUserRatings(
    req : Request,
    env : Env
) {

    const idToken = req.headers.get("Authorization")?.replace("Bearer ","")

    if (!idToken) {
        return MalformedData(req,"No ID token!")
    }

    const UID = await getUidFromIdToken(idToken,env)

    if (!UID) {
        return MalformedData(req,"UID could not be gotten")
    }
    
    try {

        const UserRatingsFolderData = await GetUserRatingsFolder(UID,env)
        return JSONResponse(req,{
            success : true,
            message : "Data was correctly fetched!",
            data : UserRatingsFolderData?.documents
        })

    } catch(err) {
        console.log("could not get the users ratings!",err)
    }

}