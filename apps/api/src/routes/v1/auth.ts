import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";

const router = Router({ base: "/v1/auth/" });

router.post("login", async (req : Request, env : Env) => {

})

router.post("create", async (req : Request, env : Env) => {

})

router.post("verify", async (req : Request, env : Env) => {

})

export const handleAuth = (req: Request, env: Env) => router.handle(req, env);