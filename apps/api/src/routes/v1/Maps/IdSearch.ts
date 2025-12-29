import { Env } from "../../types";
import InternalError from "../../utils/InternalError";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";

export default async function idSearch(request : Request, env : Env) {
    
    const url = new URL(request.url)
    const placeId = url.searchParams.get("placeId")

    if (!placeId) {
        return MalformedData(request, "No place_id provided by request")
    }

    try {
        const business = await env.MapDB.prepare(
            `SELECT * FROM businesses WHERE id = ?`
        ).bind(placeId).first();

        if (!business) {
            return MalformedData(request,"The place_id does not have data linked to it")
        }

        console.log(business)

        return JSONResponse(request,{
            success : true,
            data : business,
            message : "Data was fetched successfully!"
        },200)
    } catch(err) {
        console.log(err)
        return InternalError(request)
    }

}