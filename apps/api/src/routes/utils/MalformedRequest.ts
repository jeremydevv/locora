import JSONResponse from "./JSONResponse";

export default function MalformedData(req : Request, info : string) {
    return JSONResponse(req,{
        success : false,
        message : "Malformed request data",
        info : info
    },400)
}