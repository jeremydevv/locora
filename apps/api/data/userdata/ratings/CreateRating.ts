import { Env, User_RatingInFolder } from "../../../src/routes/types"
import MalformedRequest from "../../../src/routes/utils/MalformedRequest"
import { GetFirebaseServiceAccount } from "../GetFirebaseServiceAccount"

export default async function CreateUserRating(
    req : Request,
    uid : string,
    business_id : string,
    ratingData : {
        header : string,
        text : string,
        rating : string
    },
    env : Env
) {

    const service_acc_jwt = await GetFirebaseServiceAccount(env)

    try {

        if (ratingData.header.length >= 100) {
            return MalformedRequest(req,"The header is too big!")
        }

        if (ratingData.text.length >= 100) {
            return MalformedRequest(req,"The header is too big!")
        }

        if (+ratingData.rating >= 6 || +ratingData.rating < 1) {
            return MalformedRequest(req,"The rating is a strange number!")
        }

        const Result = await fetch(`https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/locora-user-data/documents/users/${uid}/ratings/${business_id}`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${service_acc_jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fields: {
                        header : { stringValue : ratingData.header },
                        text : { stringValue : ratingData.text },
                        rating : { numberValue : ratingData.rating },
                        business_id: { stringValue: location },
                        timeCreated: { timestampValue: new Date().toISOString() }
                    }
                })
            })

        const Data: {
            error: object
        } = await Result.json()

        if (!Result.ok) {
            console.log("issue with adding business to ratings", Data.error)
            return null
        }

    } catch (err) {

    }

}