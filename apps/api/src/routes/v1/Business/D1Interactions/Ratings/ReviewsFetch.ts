import { Env, Locora_Business, User_Review } from "../../../../types";

export default async function GetBusinessReviews(id: string, env: Env): Promise<Record<string,User_Review> | null> {

    const query: { data: string } | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    ).bind(id).first();

    if (!query) {
        return null;
    }

    const businessData: Locora_Business = JSON.parse(query.data);

    if (!businessData.ratings) {
        return null;
    }

    return businessData.ratings ;
}   