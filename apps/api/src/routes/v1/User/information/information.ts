import { Env } from "../../../types";
import JSONResponse from "../../../utils/JSONResponse";
import GetDisplayInformation from "./display/getDisplayInformation";
import PostDisplayInformation from "./display/postDisplayInformation";

export async function InformationEndpoint(req : Request, env : Env) {
    
    const path = req.url.split("/v1/users/information")[1];
    const segments = path.split("/");

    if (segments[1] === "display") {
        if (req.method === "GET") {
            return await GetDisplayInformation(req, env);
        } else if (req.method === "POST") {
            return await PostDisplayInformation(req, env);
        } else {
            return JSONResponse(req, {
                success : false,
                message : "Method not allowed"
            }, 405);
        }
    }

}