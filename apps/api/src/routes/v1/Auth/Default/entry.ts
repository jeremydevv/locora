import { json } from "itty-router";
import JSONResponse from "../../../utils/JSONResponse";
import VerifyTurnstileToken from "./VerifyTurnstile";
import { Env } from "../../../types";

export default async function(req : Request, env : Env, context : any) {

    const Body : {
        TurnstileToken : string,
        Username? : string
        Info : string,
        Password : string,
    } = await req.json()

    if (!Body) {
        console.log("Malformed request.")
        return JSONResponse(req,{
            message : "Issue with Verification"
        },400)
    }

    const UserIP = req.headers.get("CF-Connecting-IP") || ""
    const TurnstileToken = Body.TurnstileToken
    const ValidTurnstileToken = await VerifyTurnstileToken(req,TurnstileToken,env,UserIP)

    if (!ValidTurnstileToken) {
        console.log("The Turnstile Token was invalid")
        return JSONResponse(req, {
            message : "Issue with Verification"
        },400)
    }

    // Actually get to Authentication
    

}