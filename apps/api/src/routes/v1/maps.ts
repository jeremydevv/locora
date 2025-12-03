import { Router } from "itty-router";
import Corsify from "../utils/Corsify";
import idSearch from "./Maps/IdSearch";
import { Env } from "../types";
import positionSearch from "./Maps/PositionSearch";
import { NotFound } from "../utils/NotFound";
import { checkForValidAuthorization } from "../utils/CheckForAuth";
import JSONResponse from "../utils/JSONResponse";

const router = Router({ base: "/v1/maps/" });

router.options("*", (req: Request) => {
    return Corsify(req, new Response(null, {
        status: 200
    }));
})

router.get("/positionsearch", async (req: Request, env: Env) => {

    const Authorized = await checkForValidAuthorization(req, env)

    if (!Authorized) {
        return JSONResponse(req, {
            success: false,
            message: "Unauthorized"
        }, 401)
    }

    return positionSearch(req, env)
})

router.get("/querysearch", async (req : Request, env : Env) => {

    return 

})

router.get("/getplaceinfo", async (req: Request, env: Env) => {

    const Authorized = await checkForValidAuthorization(req, env)

    if (!Authorized) {
        return JSONResponse(req, {
            success: false,
            message: "Unauthorized"
        }, 401)
    }

    return idSearch(req, env)
})

router.all("/*", (req: Request) => {
    return NotFound(req)
})
