import { Router } from "itty-router";

const router = Router({ base: "/auth" });

router.get("/test", () => new Response("Auth route works ✅"));

router.post("/login", async (req) => {
    const body = await req.json().catch(() => ({}));
    console.log("Login request:", body);
    return new Response("Login placeholder", { status: 200 });
});

router.post("/register", async (req) => {
    const body = await req.json().catch(() => ({}));
    console.log("Register request:", body);
    return new Response("Register placeholder", { status: 200 });
});

export const handleAuth = router.handle;
