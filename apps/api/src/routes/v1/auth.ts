import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";

import GoogleEntry from "./Auth/Google/entry";
import MicrosoftEntry from "./Auth/Microsoft/entry"
import DefaultEntry from "./Auth/Default/entry"
import MalformedData from "../utils/MalformedRequest";
import { RefreshIdToken } from "../../../data/firebaseAuth";

const router = Router({ base: "/v1/auth/" });

router.options("/*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }));
});

router.post("/default/*", async (req : Request, env : Env, context : any) => {
    return await DefaultEntry(req,env,context)
})

router.post("/google/*", async (req : Request) => {
    return GoogleEntry(req)
})

router.post("/microsoft/*", async (req : Request) => {
    return MicrosoftEntry(req)
})

router.post("/refresh", async (req : Request, env : Env) => {
    if (!req.body) return MalformedData(req);
    return await RefreshIdToken(req,env)
})

export const handleAuth = (req: Request, env: Env) => router.handle(req, env);