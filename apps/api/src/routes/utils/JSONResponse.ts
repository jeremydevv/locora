import Corsify from "./Corsify";

export default function JSONResponse(req : Request, data : any, status : number = 200) {
    return Corsify(req, new Response(JSON.stringify(data),
        { status: status, headers: { "Content-Type": "application/json" } }
    )); 
}