const ENVIRONMENT = import.meta.env.VITE_ENVIORNMENT;

export default function baseAPIUrl() {
    if (ENVIRONMENT === "dev") {
        return "http://localhost:6767";
    } else if (ENVIRONMENT == "main") {
        return "https://api.locora.org";
    } else {
        return `https://${ENVIRONMENT}-locora-api.jeremymathew100.workers.dev`
    }
}
