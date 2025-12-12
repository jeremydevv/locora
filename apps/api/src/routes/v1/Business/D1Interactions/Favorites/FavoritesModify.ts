import { error } from "itty-router";
import { Env, Locora_Business } from "../../../../types";

export default async function ModifyFavorites(id : string, action : "remove" | "add", env : Env) {
    
    const query: { data: string } | null = await env.MapDB.prepare(
        `SELECT data FROM businesses WHERE id = ?`
    ).bind(id).first();

    if (!query || !query.data) {
        throw new Error("The business at the id " + id + "does not exist!")
    }

    const BusinessData : Locora_Business = JSON.parse(query.data)

    if (!BusinessData.favorites) {
        BusinessData.favorites = 0
    }

    BusinessData.favorites = (action == "add") ? BusinessData.favorites + 1 : BusinessData.favorites - 1

    await env.MapDB.prepare(
        "UPDATE businesses SET data = ? WHERE id = ?"
    ).bind(JSON.stringify(BusinessData),id)

    return BusinessData.favorites
}   