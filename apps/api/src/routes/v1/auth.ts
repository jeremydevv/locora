import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";

import GoogleEntry from "./Auth/Google/entry";
import MicrosoftEntry from "./Auth/Microsoft/entry"
import DefaultEntry from "./Auth/Default/entry"

const router = Router({ base: "/v1/auth/" });

router.options("*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }));
});

router.get("google/*", (req : Request) => {
    return GoogleEntry(req)
})

router.get("microsoft/*", (req : Request) => {
    return MicrosoftEntry(req)
})

router.get("default/*", (req : Request) => {
    return DefaultEntry(req)
})

export const handleAuth = (req: Request, env: Env) => router.handle(req, env);