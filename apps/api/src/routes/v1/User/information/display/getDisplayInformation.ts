import { FetchUserRecord } from "../../../../../../data/firebaseUserData";
import { DataPayload, Env } from "../../../../types";
import getUidFromIdToken from "../../../../utils/GetUIDFromIdToken";
import JSONResponse from "../../../../utils/JSONResponse";
import MalformedData from "../../../../utils/MalformedRequest";
import Unauthorized from "../../../../utils/Unauthorized";

export default async function GetDisplayInformation(req : Request, env : Env) {

    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1] || "";
    const uid = await getUidFromIdToken(idToken)

    if ((!uid) || (idToken == "")) {
        console.log(uid,idToken)
        return Unauthorized(req)
    }

    console.log("GetDisplayInformation called with UID:", uid);

    const UserRecordData : DataPayload = await FetchUserRecord(uid, idToken, env) as DataPayload;

    console.log("Fetched user record data:", UserRecordData);

    return JSONResponse(req,{
        success : true,
        message : "Get Display information endpoint working",
        data : {
            displayName : UserRecordData.displayName,
            username : UserRecordData.username
        }
    },200);

}