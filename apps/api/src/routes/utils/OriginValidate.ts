const ValidOrigins = ["https://locora.org", "https://api.locora.org", "http://localhost:5173", "https://waitlist-dev.locora.pages.dev", "https://development.locora.pages.dev", "http://localhost:3067", "http://localhost:3068"];
export default function OriginValidate(origin : string) {

    if (!origin) return false;
    if (origin?.startsWith("http://localhost") || origin?.startsWith("https://localhost")) return true;
    if (ValidOrigins.includes(origin)) return true;

    return false

}