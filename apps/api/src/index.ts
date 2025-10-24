// libs
import { Router } from "itty-router";

// services
import {handleAuth} from "./routes/v1/auth";
import {handleWaitlist} from "./routes/v1/waitlist";
import Corsify from "./routes/utils/Corsify";
import SourceValidation from "./routes/utils/SourceValidation";

const router = Router();

// auto redirecting, no one should go to api.locora.org
router.get("/", () => {
    return Response.redirect("https://locora.org", 302);
});

router.all("/v1/auth/*", (req) => {
    return handleAuth(req);
});

router.all("/v1/waitlist", handleWaitlist);
router.all("/v1/waitlist/:rest*", handleWaitlist);

router.all("/v1/*", () => Corsify(new Response("Not Found", { status: 404 })));
router.all("*", () => Corsify(new Response("Not Found", { status: 404 })));

// middle man for api routes
export default {
    fetch : (request : Request, env : any, ctx : any) => {

        if (!(SourceValidation(request))) {
            return Corsify(new Response("Forbidden", { status: 403 }));
        }

        return router.handle(request, env, ctx);
    }
};
