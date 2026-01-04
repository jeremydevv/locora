import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";

import DefaultEntry from "./Auth/Default/entry"
import MalformedData from "../utils/MalformedRequest";
import { RefreshIdToken } from "../../../data/firebaseAuth";
import { NotFound } from "../utils/NotFound";

const router = Router({ base: "/v1/auth/" });

router.options("/*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }),true);
});

router.post("/default/*", async (req : Request, env : Env, context : any) => {
    return await DefaultEntry(req,env,context)
})

router.post("/refresh", async (req : Request, env : Env) => {
    if (!req.body) return MalformedData(req, "No body was provided by refresh.");
    return await RefreshIdToken(req,env)
})

router.all("/*" , async (req : Request) => {
    return NotFound(req)
})

export const handleAuth = (req: Request, env: Env) => router.handle(req, env);