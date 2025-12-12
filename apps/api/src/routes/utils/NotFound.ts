import JSONResponse from "./JSONResponse";

export function NotFound(req : Request) {
    return JSONResponse(req, {
        success : false,
        message : "The endpoint " + req.url + " was not found!"
    },404)
}