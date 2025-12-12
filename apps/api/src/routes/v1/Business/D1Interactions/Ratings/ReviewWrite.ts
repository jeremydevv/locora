import { Env, Locora_Business, User_Review } from "../../../../types";

export default async function WriteBusinessReview(uid : string , review : string, rating : number, businessId : string, env : Env) {

    const business : {data : string} | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    ).bind(businessId).first();

    if (!business) {
        throw new Error("Business not found at ID: " + businessId)
    }

    const CurrentBusinessData = JSON.parse(business.data) as Locora_Business

    if (!CurrentBusinessData.ratings) {
        CurrentBusinessData.ratings = {}
    }

    CurrentBusinessData.ratings[uid] = {
        uid: uid,
        rating: rating,
        reviewText: review,
    }

    await env.MapDB.prepare(
        `UPDATE businesses SET data = ? WHERE id = ?`
    ).bind(JSON.stringify(CurrentBusinessData), businessId).run()

    return CurrentBusinessData.ratings;

}