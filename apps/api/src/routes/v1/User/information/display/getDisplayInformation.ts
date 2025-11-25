import { FetchUserRecord } from "../../../../../../data/firebaseUserData";
import { DataPayload, Env } from "../../../../types";
import cleanFirebaseData from "../../../../utils/CleanFirebaseData";
import getUidFromIdToken from "../../../../utils/GetUIDFromIdToken";
import InternalError from "../../../../utils/InternalError";
import JSONResponse from "../../../../utils/JSONResponse";
import MalformedData from "../../../../utils/MalformedRequest";
import Unauthorized from "../../../../utils/Unauthorized";

export default async function GetDisplayInformation(req : Request, env : Env) {

    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const uid = await getUidFromIdToken(idToken,env)

    if ((!uid) || (idToken == "")) {
        console.log(uid,idToken)
        return Unauthorized(req)
    }

    const userData = await FetchUserRecord(uid, idToken, env)

    if (!userData) {
        return InternalError(req)
    }

    const CleanedUserRecordData : DataPayload = cleanFirebaseData(userData);

    return JSONResponse(req,{
        success : true,
        message : "Get Display information endpoint working",
        data : {
            displayName : CleanedUserRecordData.displayName,
            username : CleanedUserRecordData.username,
            bio : CleanedUserRecordData.bio
        }
    },200);

}