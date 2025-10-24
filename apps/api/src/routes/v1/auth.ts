import { Router } from "itty-router";
import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";

const router = Router({ base: "/v1/auth" });

router.get("/test", () => {
    JSONResponse({
        "test": "test",
    });
});

export const handleAuth = router.handle;
