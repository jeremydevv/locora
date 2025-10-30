// libs
import { Router } from "itty-router";

// services
import {handleAuth} from "./routes/v1/auth";
import {handleWaitlist} from "./routes/v1/waitlist";
import Corsify from "./routes/utils/Corsify";
import OriginValidate from "./routes/utils/OriginValidate";

const router = Router();

// auto redirecting, no one should go to api.locora.org
router.get("/", () => {
    return Response.redirect("https://locora.org", 302);
});

router.all("/v1/auth/*", handleAuth)
router.all("/v1/waitlist/*", handleWaitlist);

router.all("*", (req : Request) => Corsify(req,new Response("Not Found", { status: 404 })));

// middle man for api routes
export default {
    fetch : (request : Request, env : any, ctx : any) => {

        if (request.url == "/") {
            return Response.redirect("https://locora.org", 302);
        }

        if (!(OriginValidate(request.headers.get("Origin")!))) {
            return Corsify(request,new Response("Forbidden Access", { status: 403 }));
        }

        return router.handle(request, env, ctx);
    }
};
