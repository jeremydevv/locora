import { Env } from "../../../../types";

export default async function CreateBusinessDataEntry(id : string, data: string, env: Env) {
    await env.MapKV.put("business_" + id, data)
    return
}