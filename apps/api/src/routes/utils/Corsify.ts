const AllowedOrigins = "https://locora.org, https://api.locora.org, http://localhost:5173";

export default function (res : Response) {
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new Response(res.body, {
        headers,
        status: res.status,
    });
}