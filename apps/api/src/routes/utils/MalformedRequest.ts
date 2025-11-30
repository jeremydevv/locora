import JSONResponse from "./JSONResponse";

export default function MalformedData(req : Request) {
    return JSONResponse(req,{
        success : false,
        message : "Malformed request data"
    },400)
}