import { Env } from "../../../types";

interface Props {
    req : Request,
    token : string,
    env : Env,
    ip : string
}

export default async function VerifyTurnstileToken(req : Request, token : string, env : Env, ip? : string) {

    const formData = new URLSearchParams();
    formData.append("secret", env.LOGIN_SITE_TURNSTILE);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    console.log(env.LOGIN_SITE_TURNSTILE,ip,token)

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

    return false;

}