import JSONResponse from "./JSONResponse";

export default function InternalError(req : Request) {
    return JSONResponse(req, {
        success: false,
        message: "Issue with internal token updates"
    }, 500)
}