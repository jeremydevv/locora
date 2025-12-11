import { Env } from "../../../../types";

export default async function CreateBusinessDataEntry(id : string, data: string, env: Env) {
    
    const business = await env.MapDB.prepare(
        `SELECT * FROM businesses WHERE id = ?`
    ).bind(id).first();

    if (business) {
        throw new Error("Business already exists at ID: " + id)
    }

    await env.MapDB.prepare(
        `INSERT INTO businesses (id, data) VALUES (?, ?)`
    ).bind(id, data).run();

    return JSON.parse(data);
}   