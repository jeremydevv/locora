import { Env } from "../src/routes/types";

async function CreateUserRecord(uid: string, auth: string, info: { email: string, username: string, name: string }, env: Env) {

    const projectID = env.FIREBASE_PROJECT_ID

    const body = {
        fields: {
            email: { stringValue: info.email },

            displayName: { stringValue: info.name },
            username: { stringValue: info.username },

            bio: { stringValue: "" },

            profilePictureURL: { stringValue: "" },
            bannerPictureURL: { stringValue: "" },

            favorites : { 
                mapValue : {
                    fields : {}
                }
            },

            createdAt: { timestampValue: new Date().toISOString() },
            coins: { integerValue: "0" },
        }
    }

    try {
        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${projectID}` + `/databases/locora-user-data/documents/users?documentId=${uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            },
            body: JSON.stringify(body)
        });

        if (!Result.ok) {

            const data: { error: object } = await Result.json()
            console.log(data.error)

            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }

    return true

}

async function FetchUserRecord(uid : string, idToken : string, env: Env) : Promise<Record<string,object> | null> {

    const ProjectID = env.FIREBASE_PROJECT_ID

    try {
        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${ProjectID}/databases/locora-user-data/documents/users/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            }
        });

        if (!Result.ok) {
            const data: { error: object } = await Result.json()
            console.log(data.error)
            return null
        }

        const ResultData : {fields : Record<string,object>} = await Result.json()

        return ResultData.fields
    } catch (error) {
        console.log(error)
        return null
    }
    
}

export { CreateUserRecord, FetchUserRecord }