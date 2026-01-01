import { Router } from "itty-router";
import { Env } from "../types";
import { checkForValidAuthorization } from "../utils/CheckForAuth";
import Unauthorized from "../utils/Unauthorized";
import JSONResponse from "../utils/JSONResponse";

const router = Router({ base: "/v1/business/" });

router.get("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        return Unauthorized(request)
    }

    return JSONResponse(request,{
        success : true,
        message : "hello"
    })

}) 

router.post("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        return Unauthorized(request)
    }

    return JSONResponse(request,{
        success : true,
        message : "hello 1"
    })

}) 

router.delete("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        return Unauthorized(request)
    }

    return JSONResponse(request,{
        success : true,
        message : "hello 2"
    })

}) 

export const handleBusiness = (req: Request, env: Env) => router.handle(req, env);