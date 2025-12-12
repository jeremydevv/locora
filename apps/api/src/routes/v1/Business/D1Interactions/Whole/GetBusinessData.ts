import { Env, Locora_Business } from "../../../../types";

export default async function getBusinessData(id : string , env : Env) : Promise<Locora_Business | null> {
    
    const business : {data : string} | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    ).bind(id).first();

    if (!business) {
        return null;
    }

    const businessData = JSON.parse(business.data) as Locora_Business

    return businessData;

}