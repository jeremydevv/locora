import { Router } from "itty-router";
import { google } from "googleapis";

import Corsify from "../utils/Corsify";
import JSONResponse from "../utils/JSONResponse";
import isValidEmail from "../utils/isValidEmail";
import { Env } from "../types";

const router = Router();

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

router.all("*", () => {
    return Corsify(new Response("Not Found", { status: 404 }));
})

async function checkForValidEmail(email: string) {
    if (email == "") {
        return JSONResponse(
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!email) {
        return JSONResponse(
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!isValidEmail(email)) {
        return JSONResponse(
            {
                status: "error",
                message: "Invalid email address.",
            },
            400
        );
    }

    return true;
}

async function VerifyTurnstileToken(token: string, env : Env, ip?: string,) {
    if (!token) {
        return JSONResponse(
            {
                status: "error",
                message: "Turnstile token is required.",
            },
            400
        );
    }

    if (token == "") {
        return JSONResponse(
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
}

async function Add_To_Waitlist(req: Request, env: Env) {
    const body: { email: string; turnstile_token: string } = await req.json();
    const Email = body.email;

    const IP: string = req.headers.get("CF-Connecting-IP")!;

    const EmailValid = await checkForValidEmail(Email);
    if (!(EmailValid)) {
        return EmailValid;
    }

    // passed email testing

    const TurnstileValid = await VerifyTurnstileToken(body.turnstile_token, env, IP);
    if (!(TurnstileValid)) {
        return TurnstileValid;
    }

    // passed turnstile token

    return Corsify(
        JSONResponse({
            status: "success",
            message: "You have been added to the waitlist.",
        })
    );
}

export const handleWaitlist = (req: Request, env: Env) => router.handle(req, env);
