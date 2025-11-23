// default methods

import { Env } from "../src/routes/types"
import JSONResponse from "../src/routes/utils/JSONResponse"
import { CreateUserRecord } from "./firebaseUserData"

async function LogInWithEmailAndPassword(req: Request, email: string, password: string, env: Env) {

    // parse email first

    try {
        const Data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password,
                returnSecureToken: true
            })
        })

        const Body: {
            error: {
                code: number,
                message: string
            }

            email: string,
            idToken: string,
            refreshToken: string
            localId: string
        } = await Data.json()

        if (!Data.ok) {

            const Issue = Body.error?.message

            const IssueDict: Record<string, number> = {
                EMAIL_NOT_FOUND: 404,
                INVALID_PASSWORD: 401
            }

            return JSONResponse(req, {
                success: false,
                message: Issue
            }, IssueDict[Issue] || 400)
        }

        return JSONResponse(req, {
            success: true,
            message: "Logged in Success",
            userdata: {
                email: Body.email,
                idToken: Body.idToken,
                refreshToken: Body.refreshToken,
                localId: Body.localId,
            }
        }, 200)
    } catch (error) {
        return JSONResponse(req, {
            success : false,
            message: error
        },500)
    }

}

async function SignUpWithEmailAndPassword(req : Request, email : string, password : string, username : string, env : Env) {
    try {
        const Data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password,
                returnSecureToken: true
            })
        })

        const Body: {
            error: {
                code: number,
                message: string
            }

            email: string,
            idToken: string,
            refreshToken: string
            localId: string
            expiresIn : string
        } = await Data.json()

        if (!Data.ok) {
            const Issue = Body.error?.message

            const IssueDict: Record<string, number> = {
                EMAIL_EXISTS : 409,
                INVALID_PASSWORD: 401
            }

            return JSONResponse(req, {
                success: false,
                message: Issue
            }, IssueDict[Issue] || 400)
        }

        const RecordRes = await CreateUserRecord(Body.localId,Body.idToken,{
            email : Body.email,
            username : username,
        },env)

        if (!RecordRes) {
            return JSONResponse(req,{
                success: false,
                message : "Issue with datastores."
            },500)
        }

        console.log(Body)

        return JSONResponse(req, {
            success: true,
            message: "Signed up successfully",
            userdata: {
                email: Body.email,
                idToken: Body.idToken,
                refreshToken: Body.refreshToken,
                localId: Body.localId,
            }
        }, 200)

    } catch (error) {
        return JSONResponse(req, {
            success : false,
            message: error
        },500)
    }
}

// google methods

function LogInWithGoogle() {

}

// microsoft methods

function LogInWithMicrosoft() {

}

export {SignUpWithEmailAndPassword, LogInWithEmailAndPassword, LogInWithGoogle, LogInWithMicrosoft}