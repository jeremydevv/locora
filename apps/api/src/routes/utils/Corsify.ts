import OriginValidate from "./OriginValidate";

export default function (req : Request, res : Response) {
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", OriginValidate(req.headers.get("Origin")!) && (req.headers.get("Origin")) || "https://locora.org");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, {
        headers,
        status: res.status,
    });
}