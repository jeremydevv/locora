import { Env } from "../../types";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";
import { PlaceDetails } from "./SharedMap";

export default async function idSearch(request : Request, env : Env) {
    
    const Body : {
        placeId : string
    } = await request.json()

    if (!Body.placeId) {
        return MalformedData(request, "No place_id provided by request")
    }

    try {
        const geoApiInfo = await PlaceDetails(Body.placeId,env)
        return JSONResponse(request,geoApiInfo,200)
    } catch(err) {
        console.log(err)
    }

    return JSONResponse(request,{
        message : "hit endpoint correctly!"
    },200)

}