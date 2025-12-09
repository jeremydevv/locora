import { Env, Locora_Business } from "../../../../types";

export default async function getBusinessData(id : string , env : Env) : Promise<Locora_Business | null> {
    const BusinessData = await env.MapKV.get("business_" + id)

    if (!BusinessData) {
        return null
    }

    return BusinessData ? JSON.parse(BusinessData) as Locora_Business : null
}