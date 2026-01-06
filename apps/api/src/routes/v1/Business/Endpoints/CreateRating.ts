import { Business_Rating, Env, Locora_Business } from "../../../types";

export default async function CreateBusinessRating(
    business_id : string,
    uid : string,
    header : string,
    text : string,
    rating : string,
    username : string,
    env : Env
) {

    if (business_id === undefined || uid === undefined ||rating === undefined) {
        throw new Error("Missing data needed to create business rating.");
    }

    const business: { data: string } | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    ).bind(business_id).first();

    if (!business) {
        throw new Error("Business not found at ID: " + business_id);
    }

    const businessData: Locora_Business = JSON.parse(business.data);

    if (!businessData.ratings) {
        businessData.ratings = {};
    }

    const ratingValue = Math.min(5, Math.max(1, Number(rating)));

    const ratingEntry: Business_Rating = {
        uid: uid,
        username : username,
        business_id: business_id,
        header: header || "",
        text: text || "",
        rating: ratingValue.toString()
    };

    if (businessData.ratings[uid]) {
        return false 
    } 

    businessData.ratings[uid] = ratingEntry;

    const ratingCounts: Record<1 | 2 | 3 | 4 | 5, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };

    let total = 0;
    let count = 0;

    for (const entry of Object.values(businessData.ratings)) {
        const value = Number(entry.rating);

        if (value >= 1 && value <= 5) {
            ratingCounts[value as 1 | 2 | 3 | 4 | 5] += 1;
            total += value;
            count += 1;
        }
    }

    businessData.rating = {
        1: ratingCounts[1],
        2: ratingCounts[2],
        3: ratingCounts[3],
        4: ratingCounts[4],
        5: ratingCounts[5],
        average: count ? total / count : 0
    };

    await env.MapDB.prepare(
        `UPDATE businesses SET data = ? WHERE id = ?`
    ).bind(JSON.stringify(businessData), business_id).run();

    return businessData;

}
