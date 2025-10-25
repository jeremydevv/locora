import { Router } from "itty-router";
import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";

const router = Router({ base: "/v1/auth" });

router.post("/test", (req : Request) => {
    return JSONResponse(req,{
        "test": "test",
    });
});

export const handleAuth = router.handle;
