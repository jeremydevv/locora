import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";

import GoogleEntry from "./Auth/Google/entry";
import MicrosoftEntry from "./Auth/Microsoft/entry"
import DefaultEntry from "./Auth/Default/entry"

const router = Router({ base: "/v1/auth/" });

router.options("/*", (req : Request) => {
    console.log("CORS Preflight Request Received");
    return Corsify(req, new Response(null, {
        status : 200
    }));
});

router.post("/default/*", async (req : Request, env : Env, context : any) => {
    return DefaultEntry(req,env,context)
})

router.get("/google/*", async (req : Request) => {
    return GoogleEntry(req)
})

router.get("/microsoft/*", async (req : Request) => {
    return MicrosoftEntry(req)
})

export const handleAuth = (req: Request, env: Env) => router.handle(req, env);