const ENVIRONMENT = import.meta.env.VITE_ENVIORNMENT;

export default function baseAPIUrl() {
    if (ENVIRONMENT === "dev") {
        return "http://localhost:6767";
    } else {
        return "https://api.locora.org";
    }
}
