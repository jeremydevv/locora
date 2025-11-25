import JSONResponse from "./JSONResponse";

export default function Unauthorized(req : Request) {
    return JSONResponse(req, {
        success : false,
        message : "Unauthorized, Invalid Auth Header"
    },401)
}