// default methods

import { Env } from "../src/routes/types"
import InternalError from "../src/routes/utils/InternalError"
import JSONResponse from "../src/routes/utils/JSONResponse"
import MalformedData from "../src/routes/utils/MalformedRequest"
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
            expiresIn : string
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
                expiresIn : Body.expiresIn
            }
        }, 200)
    } catch (error) {
        return JSONResponse(req, {
            success : false,
            message: error
        },500)
    }

}

async function SignUpWithEmailAndPassword(req : Request, email : string, password : string, username : string, name : string, env : Env) {
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
            name : name
        },env)

        if (!RecordRes) {
            return JSONResponse(req,{
                success: false,
                message : "Issue with datastores."
            },500)
        }

        return JSONResponse(req, {
            success: true,
            message: "Signed up successfully",
            userdata: {
                email: Body.email,
                idToken: Body.idToken,
                refreshToken: Body.refreshToken,
                localId: Body.localId,
                expiresIn : Body.expiresIn
            }
        }, 200)

    } catch (error) {
        return JSONResponse(req, {
            success : false,
            message: error
        },500)
    }
}

async function VerifyIdToken(idToken : string, env : Env) {
    try {
        const Data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken
            })
        })

        const Parsed : {
            users : Array<Record<string,string>>
        } = await Data.json()

        if (!Data.ok) {
            return false
        }

        if (!Parsed.users || Parsed.users.length === 0) {
            return false
        }

        return true

    } catch (error) {
        return false
    }
}

async function RefreshIdToken(req : Request, env : Env) {

    const Body : {
        RefreshToken? : string
    } = await req.json()

    if (!Body || !Body.RefreshToken) {
        return MalformedData(req)
    }

    const RefreshToken = Body.RefreshToken

    try {

        const Data = await fetch(`https://securetoken.googleapis.com/v1/token?key=${env.FIREBASE_API_KEY}`, {
            method : "POST",
            body : `grant_type=refresh_token&refresh_token=${RefreshToken}`,
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })

        const Results : {
            error? : object
            id_token : string,
            refresh_token : string,
            expires_in : string
            local_id : string
        } = await Data.json()

        if (!Data.ok) {
            console.log(Results, Results.error)
            return InternalError(req)
        }

        return JSONResponse(req,{
            success : true,
            message : "Token was updated correctly.",
            idToken : Results.id_token,
            uid : Results.local_id,
            expiresIn : Results.expires_in,
            refreshToken : Results.refresh_token
        },200)

    } catch(err) {
        console.log(err)
        return InternalError(req)
    }

}

// google methods

function LogInWithGoogle() {

}

// microsoft methods

function LogInWithMicrosoft() {

}

export {SignUpWithEmailAndPassword, LogInWithEmailAndPassword, LogInWithGoogle, LogInWithMicrosoft, VerifyIdToken, RefreshIdToken}