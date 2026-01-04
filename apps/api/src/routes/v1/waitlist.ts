import { Router } from "itty-router";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import { Env } from "../types";
import { addToEmails, isInSheet } from "./Waitlist/Spreadsheet";
import { checkForValidEmail, checkForValidPhone } from "./Waitlist/inputValidation";
import InternalError from "../utils/InternalError";

const router = Router({ base: "/v1/waitlist/" });

router.post("add", async (req : Request, env : Env) => {
    const WaitlistResults = await Add_To_Waitlist(req, env);
    return WaitlistResults
});

router.options("*", (req : Request) => {
    return Corsify(req, new Response(null, {
        status : 200
    }));
});

async function VerifyTurnstileToken(req : Request ,token: string, env : Env, ip?: string,) {
    if (!token) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Bad request.",
            },
            400
        );
    }

    if (token == "") {
        return JSONResponse(req,
            {
                status: "error",
                message: "Bad request.",
            },
            400
        );
    }

    const formData = new URLSearchParams();
    formData.append("secret", env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
        }
    );

    const data : { success: boolean } = await res.json();
    if (data.success) {
        return true;
    }

    return JSONResponse(req,
        {
            status: "error",
            message: "Bad request.",
        },
        400
    );
}

async function Add_To_Waitlist(req: Request, env: Env) {

    const { success } = await env.WaitlistRatelimiter.limit({ key: req.headers.get("CF-Connecting-IP") || "" });

    if (!success) {
        return JSONResponse(req, {status: "error",message: "Too many requests.",}, 429);
    }

    const body: { info : string; turnstile_token: string } = await req.json();
    const userInfo = body.info;

    const IP: string = req.headers.get("CF-Connecting-IP")!;

    const EmailValid = await checkForValidEmail(req,userInfo);

    // tests input against both info types, if neither, send it back
    if ((EmailValid !== true)) {
        return JSONResponse(req, {status: "error",message: "Invalid email.",}, 400);
    }

    const InputType : "email" | "phone" = EmailValid === true ? "email" : "phone";

    // cloudflare verifications
    const TurnstileValid = await VerifyTurnstileToken(req,body.turnstile_token, env, IP);
    if (!(TurnstileValid)) {
        return TurnstileValid;
    }

    // check both columns if the info is already added
    const AlreadyAdded = await isInSheet(req,userInfo);
    
    if (AlreadyAdded) {
        return JSONResponse(req, {status: "error",message: "Info already added to waitlist.",}, 400);
    }

    // adding to waitlist, check for info type and add to respective column
    let InfoAdded;
    
    if (InputType == "email") {
        InfoAdded = await addToEmails(req,userInfo);
    } else {
        return InternalError(req)
    }

    if (!(InfoAdded)) {
        return JSONResponse(req,
            {status: "error",message: "Error adding info to waitlist.",},
            500
        );
    }

    return InfoAdded
}

export const handleWaitlist = (req: Request, env: Env) => router.handle(req, env);
