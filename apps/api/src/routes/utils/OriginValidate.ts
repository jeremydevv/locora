const ValidOrigins = ["https://locora.org", "https://api.locora.org", "http://localhost:5173", "https://waitlist-dev.locora.pages.dev", "https://development.locora.pages.dev'"];
export default function OriginValidate(origin : string) {

    if (!origin) return false;
    if (origin?.startsWith("http://localhost")) return true;
    if (ValidOrigins.includes(origin)) return true;

    return false

}