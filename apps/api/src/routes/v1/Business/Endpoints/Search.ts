import { Env, Locora_Business } from "../../../types";
import GetLintedCategory from "../../../utils/GetLintedCategory";
import InternalError from "../../../utils/InternalError";
import JSONResponse from "../../../utils/JSONResponse";
import MalformedData from "../../../utils/MalformedRequest";

function parseStoreTypeFromCategory(categoryFromData: string): "Food" | "Retail" {
    return GetLintedCategory(categoryFromData)
}

function normalizeText(value: string) {
    return value
        .toLowerCase()
        .replace(/['’`"\s-]/g, "")
        .trim();
}

export default async function BusinessSearch(
    req : Request,
    env : Env
) {
    
    const reqURL = new URL(req.url)
    const searchParams = reqURL.searchParams

    const text : string | null | undefined = searchParams.get("text")?.trim()
    const filter = searchParams.get("filterType") as ("Default" | "Top Rated" | null)
    const store  = searchParams.get("storeType") as ("Food" | "Retail" | "Default" | null)

    if (!text || text.length === 0 || !filter || !store) {
        return MalformedData(req,"Missing filters or text entry")
    }

    const normalizedSearch = normalizeText(text);
    const likeSearch = `%${normalizedSearch}%`;
    const startsWithSearch = `${normalizedSearch}%`;

    const orderClause = filter === "Top Rated"
        ? "CAST(json_extract(data, '$.rating.average') AS REAL) DESC"
        : "CAST(json_extract(data, '$.timestamp') AS INTEGER) DESC";

    const normalizedNameExpr = `REPLACE(REPLACE(REPLACE(REPLACE(LOWER(json_extract(data, '$.name')), '''', ''), '’', ''), ' ', ''), '-', '')`;
    const normalizedDescExpr = `REPLACE(REPLACE(REPLACE(REPLACE(LOWER(json_extract(data, '$.description')), '''', ''), '’', ''), ' ', ''), '-', '')`;

    try {
        const query = `
            SELECT data
            FROM businesses
            WHERE ${normalizedNameExpr} LIKE ?
            OR ${normalizedDescExpr} LIKE ?
            ORDER BY
                CASE
                    WHEN ${normalizedNameExpr} LIKE ? THEN 3
                    WHEN ${normalizedDescExpr} LIKE ? THEN 2
                    ELSE 1
                END DESC,
                ${orderClause},
                json_extract(data, '$.id') ASC
            LIMIT 25;
        `;

        const results = await env.MapDB.prepare(query)
            .bind(likeSearch, likeSearch, startsWithSearch, likeSearch)
            .all();

        const rows = (results.results || []) as Array<{ data: string }>;
        const parsedResults: Array<Locora_Business> = rows.map((row) => JSON.parse(row.data) as Locora_Business);

        const filteredResults = parsedResults.filter((business) => {
            if (store === "Default") {
                return true;
            }

            return parseStoreTypeFromCategory(business.category) === store;
        });

        return JSONResponse(req,{
            success : true,
            message : "Got the businesses based off query!",
            data : filteredResults.slice(0, 50)
        })
    } catch (err) {
        console.log("Issue while running business search", err);
        return InternalError(req)
    }

}
