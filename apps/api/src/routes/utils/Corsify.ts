import OriginValidate from "./OriginValidate";

export default function (req : Request, res : Response) {
    const origin = req.headers.get("Origin");
    const IsAllowedOrigin = OriginValidate(origin || "");

    console.log(origin)

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", IsAllowedOrigin && origin ? origin : "https://locora.org");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, {
        headers,
        status: res.status,
    });
}