import { Env, Locora_Business, User_Review } from "../../../../types";

export default async function GetBusinessReviews(id : string , env : Env) : Promise<Record<string,User_Review> | null> {
    
    const businessData = await env.MapKV.get("business_" + id)

    if (!businessData) {
        return null
    }

    const parsedData : Locora_Business = JSON.parse(businessData)

    return parsedData.ratings ? parsedData.ratings : null

}