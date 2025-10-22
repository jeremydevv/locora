// libs
import { Router } from "itty-router";

// services
import {handleAuth} from "./routes/auth";

const router = Router();

function CORSify(res : Response) {
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, {
        headers,
        status: res.status,
    });
}

// auto redirecting, no one should go to api.locora.org
router.get("/", () => {
    return Response.redirect("https://locora.org", 302);
});

router.get("/test", () => {

    try {

        const Data = {
            "message": "API route works ✅",
            "time" : Date.now()
        }
        return CORSify(new Response(JSON.stringify(Data), { status: 200 }));

    } catch(err : any) {
        return CORSify(new Response(err.message, { status: 500 }));
    }

});

router.all("*", () => CORSify(new Response("Not Found", { status: 404 })));

// middle man for api routes
export default {
    fetch : (request : Request, env : any, ctx : any) => {
        return router.handle(request, env, ctx);
    }
};
