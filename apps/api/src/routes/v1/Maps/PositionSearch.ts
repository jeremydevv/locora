import { Env } from "../../types";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";
import { ReverseGeoCode } from "./SharedMap";

export default async function positionSearch(request : Request, env : Env) {

    const Body : {
        lat : string
        lon : string
    } = await request.json()

    if (!Body.lat || !Body.lon) {
        return MalformedData(request, "No lat or no lon provided")
    }

    try {
        
        const geoApiInfo = await ReverseGeoCode({
            lat : Body.lat,
            lon : Body.lon
        },env)
        console.log(geoApiInfo)

    } catch(err) {
        console.log(err)
    }
    
    return JSONResponse(request,{
        message : "hit endpoint correctly!"
    },200)

}