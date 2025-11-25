import { Env } from "../../../../types";
import JSONResponse from "../../../../utils/JSONResponse";

export default async function PostDisplayInformation(req : Request, env : Env) {
    return JSONResponse(req,{
        success : true,
        message : "Post Display information endpoint working"
    },200)
}   