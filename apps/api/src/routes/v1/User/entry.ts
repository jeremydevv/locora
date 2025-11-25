import { Env } from "../../types";
import JSONResponse from "../../utils/JSONResponse";
import { InformationEndpoint } from "./information/information";

function UserPostEntry(req : Request, env : Env) {

    return JSONResponse(req,{
        success : true,
        message : "working"
    },200)

}

async function UserGetEntry(req : Request, env : Env) {

    const path = req.url.split("/v1/users/")[1];
    const segments = path.split("/");

    if (segments[0] === "information") {
        return await InformationEndpoint(req, env);
    } else {
        return JSONResponse(req,{
            success : false,
            message : "Unknown endpoint"
        },404)
    }

}

export { UserPostEntry, UserGetEntry }