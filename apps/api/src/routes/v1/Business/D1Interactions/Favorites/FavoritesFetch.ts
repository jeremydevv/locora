import { Env } from "../../../../types";

export default async function FetchFavorites(id : string, env : Env) {
    
    const query : {data : string} | null = await env.MapDB.prepare(
        "SELECT data FROM businesses where id = ?"
    ).bind(id).first()

    if (!query || !query.data) {
        throw new Error("The business at id " + id + " does not exist!")
    }

    

}