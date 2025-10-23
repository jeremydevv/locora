import { Router } from "itty-router";
import { google } from "googleapis";

import Corsify from "../utils/Corsify";

const router = Router({ base: "/v1/waitlist" });

router.options("*", () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
});

router.post("/add", Add_To_Waitlist);

async function Add_To_Waitlist(req : Request) {
    const body : { email: string } = await req.json();
    const Email = body.email;

    return Corsify(
        new Response(JSON.stringify({ "email": Email }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    );
}

export const handleWaitlist = router.handle;
