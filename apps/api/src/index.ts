import { Router } from "itty-router";

const router = Router();

// services
import {handleAuth} from "./routes/auth";

router.get("/", () => new Response("Locora API is running! 🚀", { status: 200 }));

router.all("/auth/*", handleAuth);
router.all("*", () => new Response("Not Found", { status: 404 }));

export default {
    fetch: (req: Request, env: any, ctx: ExecutionContext) => router.handle(req, env, ctx),
};
