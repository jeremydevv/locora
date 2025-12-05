import { Env } from "../../types";
import InternalError from "../../utils/InternalError";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";

export default async function QuerySearchEndpoint(req: Request, env: Env) {

    const reqURL = new URL(req.url)

    const query = reqURL.searchParams.get("q")
    const lon = reqURL.searchParams.get("lon")
    const lat = reqURL.searchParams.get("lat")
    const zoom = reqURL.searchParams.get("zoom")

    let cleanedQuery = query?.trim()
        .toLowerCase()
        .replace("/\s+/g", " ")
        .replace("/[^w\s,.-]/g", "")
        .replace("/\(near me|close|far|around|find|search|to|places?)\b/g", "")

    if (!cleanedQuery || cleanedQuery == "" || cleanedQuery.length == 0) {
        return MalformedData(req, "No query was provided")
    }

    if (!lon || !lat || !zoom) {
        return MalformedData(req, "Missing positioning data")
    }

    const ZoomScaling : Record<number, number> = {
        20 : 350, 19 : 550, 18 : 750, 17 : 1100, 16 : 170150,
        15 : 2750, 14 : 3500, 13 : 5000, 12 : 7500, 11 : 11000,
        10 : 15500, 9 : 18000
    }

    try {

        const radius = 5000

        const Data = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?`
            + `text=${encodeURIComponent(cleanedQuery)}`
            + `&limit=20`
            + `&lang=en`
            + `&filter=circle:${lon},${lat},${ZoomScaling[Number(zoom)]}` 
            + `&bias=proximity:${lon},${lat}`
            + `&format=json`
            + `&apiKey=${env.GEO_API_KEY}`
        )

        const Result : {
            results : Array<unknown>,
            query : object
        } = await Data.json()

        if(!Data) {
            console.log(Result)
            return InternalError(req)
        }

        return JSONResponse(req, {
            success : true,
            businesses : Result.results
        },200)

    } catch (err) {
        console.log(err)
    }

    return JSONResponse(req, {
        success: true,
        message: "Hit the endpoint correctly"
    })

}