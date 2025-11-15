import { Env } from "../src/routes/types";

async function CreateUserRecord(uid : string, auth : string, info : {email : string, username : string}, env : Env) {

    const projectID = env.FIREBASE_PROJECT_ID

    const body = {
        fields: {
            email: { stringValue: info.email },
            username: { stringValue: info.username },
            createdAt: { timestampValue: new Date().toISOString() },
            coins: { integerValue: "0" },
        }
    }

    const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${projectID}` + `/databases/locora-user-data/documents/users?documentId=${uid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        },
        body: JSON.stringify(body)
    });

    if (!Result.ok) {
        
        const data : {error : object} = await Result.json()
        console.log(data.error)

        return false
    }

    return true

}

function FetchUserRecord(username : string) {
    
}

export {CreateUserRecord, FetchUserRecord}