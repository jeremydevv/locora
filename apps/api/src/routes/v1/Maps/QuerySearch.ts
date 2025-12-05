import { Env } from "../../types";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";

export default async function QuerySearchEndpoint(req : Request, env : Env) {

    const reqURL = new URL(req.url)
    const query = reqURL.searchParams.get("q")

    if (!query || query == "") {
        return MalformedData(req,"No query was provided")
    }

    try {

    } catch(err) {

    }

    return JSONResponse(req, {
        success : true,
        message : "Hit the endpoint correctly"
    })

}