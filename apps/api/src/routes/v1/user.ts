import { Router } from "itty-router";
import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { VerifyIdToken } from "../../../data/firebaseAuth";
import { Env } from "../types";
import { UserGetEntry, UserPostEntry } from "./User/entry";
import { checkForValidAuthorization } from "../utils/CheckForAuth";
import Unauthorized from "../utils/Unauthorized";

const router = Router({ base: "/v1/users/" });

router.options("*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }),true);
})

router.post("*", async (req : Request, env : Env) => {
    
    const Authorized = await checkForValidAuthorization(req,env)
    
    if (!Authorized) {
        console.log("user isnt authroized at the top level")
        return Unauthorized(req)
    }

    return await UserPostEntry(req,env)
})

router.get("*", async (req : Request, env : Env) => {
    
    const Authorized = await checkForValidAuthorization(req,env)
    
    if (!Authorized) {
        console.log("user isnt authroized at the top level")
        return Unauthorized(req)
    }

    return await UserGetEntry(req,env)
})

export const handleUser = (req: Request, env: Env) => router.handle(req, env);