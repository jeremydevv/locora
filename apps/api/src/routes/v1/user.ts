import { Router } from "itty-router";
import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { VerifyIdToken } from "../../../data/firebaseAuth";
import { Env } from "../types";
import { UserGetEntry, UserPostEntry } from "./User/entry";
import { checkForValidAuthorization } from "../utils/CheckForAuth";

const router = Router({ base: "/v1/users/" });

router.options("*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }));
})

router.post("*", async (req : Request, env : Env) => {
    
    const Authorized = await checkForValidAuthorization(req,env)
    
    if (!Authorized) {
        return JSONResponse(req, {
            success : false,
            message : "Unauthorized"
        },401)
    }

    return UserPostEntry(req,env)
})

router.get("*", async (req : Request, env : Env) => {
    
    const Authorized = await checkForValidAuthorization(req,env)
    
    if (!Authorized) {
        return JSONResponse(req, {
            success : false,
            message : "Unauthorized"
        },401)
    }

    return UserGetEntry(req,env)
})

export const handleUser = (req: Request, env: Env) => router.handle(req, env);