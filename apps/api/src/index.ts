// libs
import { Router } from "itty-router";

// services
import {handleAuth} from "./routes/v1/auth";
import {handleWaitlist} from "./routes/v1/waitlist";
import Corsify from "./routes/utils/Corsify";
import OriginValidate from "./routes/utils/OriginValidate";
import { handleUser } from "./routes/v1/user";
import JSONResponse from "./routes/utils/JSONResponse";
import { NotFound } from "./routes/utils/NotFound";
import { handleMaps } from "./routes/v1/maps";
import { handleBusiness } from "./routes/v1/business";

const router = Router();

// auto redirecting, no one should go to api.locora.org
router.get("/", () => {
    return Response.redirect("https://locora.org", 302);
});

router.all("/v1/auth/*", handleAuth)
router.all("/v1/waitlist/*", handleWaitlist);
router.all("/v1/users/*", handleUser);
router.all("/v1/maps/*", handleMaps)
router.all("/v1/business/*", handleBusiness)

router.all("*", (req : Request) => {
    console.log("couldnt be found in index.ts")
    return NotFound(req)
})

// middle man for api routes
export default {
    fetch : (request : Request, env : any, ctx : any) => {

        if (request.url == "/") {
            return Response.redirect("https://locora.org", 302);
        }

        if (request.method === "OPTIONS") {
            return Corsify(request,new Response(null, { status: 200 }));
        }

        if (!(OriginValidate(request.headers.get("Origin")!)) && (!(request.headers.get("Authorization")))) {
            return JSONResponse(request,{
                Message : "Origin is not valid"
            },403)
        }

        return router.handle(request, env, ctx);
    }
};
