import JSONResponse from "../../../utils/JSONResponse";

export default function(req : Request) {

    return JSONResponse(req, {
        message : "Default"
    },200)

}