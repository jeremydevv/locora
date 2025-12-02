import { Router } from "itty-router";
import Corsify from "../utils/Corsify";

const router = Router({ base: "/v1/maps/" });

router.options("*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }));
})

router.post("/positionSearch", (req) => {
    return 
})

router.post("/idSearch", (req) => {

})
