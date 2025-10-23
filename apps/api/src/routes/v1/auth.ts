import { Router } from "itty-router";
import Corsify from "../utils/Corsify";

const router = Router({ base: "/v1/auth" });

router.get("/test", () => {
    const data = {
        "message": "Test route is working"
    }

    return Corsify(new Response(JSON.stringify(data), { status: 200 }));
});

export const handleAuth = router.handle;
