import Corsify from "./Corsify";

export default function JSONResponse(data : any, status : number = 200) {
    return Corsify(new Response(JSON.stringify(data),
        { status: status, headers: { "Content-Type": "application/json" } }
    )); 
}