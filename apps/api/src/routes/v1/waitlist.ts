import { Router } from "itty-router";
import { google } from "googleapis";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import isValidEmail from "../utils/isValidEmail";
import { Env } from "../types";
import OriginValidate from "../utils/OriginValidate";
import { addToEmails, isInSheet } from "./Waitlist/Spreadsheet";

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

async function checkForValidEmail(req : Request,email: string) {

    if (email == "") {
        return JSONResponse(req,
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!email) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!isValidEmail(email)) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Invalid email address.",
            },
            400
        );
    }

    return true;
}

async function VerifyTurnstileToken(req : Request ,token: string, env : Env, ip?: string,) {
    if (!token) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Turnstile token is required.",
            },
            400
        );
    }

    if (token == "") {
        return JSONResponse(req,
            {
                status: "error",
                message: "Turnstile token is required.",
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
            message: "Turnstile token is invalid.",
        },
        400
    );
}
async function Add_To_Waitlist(req: Request, env: Env) {

    const body: { email: string; turnstile_token: string } = await req.json();
    const Email = body.email;

    const IP: string = req.headers.get("CF-Connecting-IP")!;

    const EmailValid = await checkForValidEmail(req,Email);
    if (!(EmailValid)) {
        return EmailValid;
    }

    // passed email testing

    const TurnstileValid = await VerifyTurnstileToken(req,body.turnstile_token, env, IP);
    if (!(TurnstileValid)) {
        return TurnstileValid;
    }

    const AlreadyAdded = await isInSheet(req,Email);
    
    if (AlreadyAdded) {
        return JSONResponse(req, {status: "error",message: "Email already added to waitlist.",}, 400);
    }

    const EmailAdded = await addToEmails(req,Email);

    if (!(EmailAdded)) {
        return JSONResponse(req,
            {status: "error",message: "Error adding email to waitlist.",},
            500
        );
    }

    return EmailAdded
}

export const handleWaitlist = (req: Request, env: Env) => router.handle(req, env);
