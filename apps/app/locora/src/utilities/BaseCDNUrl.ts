const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

export default function BaseCDNUrl() {
    if (ENVIRONMENT === "dev") {
        return "https://pub-d1a65e4208134e1aa5e535fb72bd246b.r2.dev";
    } else if (ENVIRONMENT == "main") {
        return "https://cdn.locora.org";
    } else {
        return `https://pub-d1a65e4208134e1aa5e535fb72bd246b.r2.dev`
    }
}
