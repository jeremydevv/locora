import { Business_Rating, Env, Locora_Business } from "../../../types";

export default async function ViewBusinessRatings(
    business_id: string,
    env: Env
): Promise<Record<string, Business_Rating> | null> {

    if (!business_id) {
        throw new Error("Missing business ID needed to view ratings");
    }

    const business: { data: string } | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    )
        .bind(business_id)
        .first();

    if (!business) {
        return null;
    }

    const businessData: Locora_Business = JSON.parse(business.data);

    if (!businessData.ratings) {
        return null;
    }

    return businessData.ratings;
}
