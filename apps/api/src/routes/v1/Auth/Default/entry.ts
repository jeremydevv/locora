import { json } from "itty-router";
import JSONResponse from "../../../utils/JSONResponse";
import VerifyTurnstileToken from "./VerifyTurnstile";
import { Env } from "../../../types";

import { LogInWithEmailAndPassword , SignUpWithEmailAndPassword } from "../../../../../data/firebaseAuth"

export default async function(req : Request, env : Env, context : any) {

    const Body : {
        TurnstileToken : string,
        Username? : string
        Info : string,
        Password : string,
    } = await req.json()

    function MalformedData() {
        console.log("Malformed request.")
        return JSONResponse(req,{
            message : "Issue with Verification"
        },400)
    }

    if (!Body) MalformedData();

    if (!Body.Info || !Body.Password || !Body.TurnstileToken) MalformedData();

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
    
    const Action = req.url.endsWith("register") ? "register" : "login"

    if (Action == "login") {
        return LogInWithEmailAndPassword(req,Body.Info,Body.Password,env)
    } else if(Action == "register") {
        if (Body.Username == null || Body.Username === "") MalformedData();
        
        return SignUpWithEmailAndPassword(req,Body.Info,Body.Password,Body.Username!,env)
    }

    return JSONResponse(req,{
        success : true,
        message : "working"
    },200)

}