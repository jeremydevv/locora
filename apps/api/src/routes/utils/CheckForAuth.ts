import { VerifyIdToken } from "../../../data/firebaseAuth";
import { Env } from "../types";

export async function checkForValidAuthorization(request : Request, env : Env) {
    const AuthHeader = request.headers.get("Authorization") || ""

    if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
        return false
    }

    const IsIdTokenValid = await VerifyIdToken(AuthHeader.replace("Bearer ",""),env)

    if (!IsIdTokenValid) {
        false
    }

    return true
}