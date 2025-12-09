import { Env } from "../../../../types";

export default async function WriteBusinessReview(uid : string , review : string, rating : number, businessId : string, env : Env) {
    
    const businessData = await env.MapKV.get("business_" + businessId)

    if (!businessData) {
        throw new Error("Business not found at ID: " + businessId)
    }

    const parsedData = JSON.parse(businessData)

    if (!parsedData.ratings) {
        parsedData.ratings = {}
    }

    parsedData.ratings[uid] = {
        uid : uid,
        rating : rating,
        reviewText : review,
    }

    await env.MapKV.put("business_" + businessId, JSON.stringify(parsedData))

    return

}