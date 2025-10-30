const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

function getApiBaseUrl() {
    if (ENVIRONMENT === "dev") {
        return "http://127.0.0.1:8787";
    } else {
        const wholeUrl = window.location.hostname;
        const subDomain = wholeUrl.split(".")[0];
        return `https://${subDomain}-locora-api.jeremymathew100.workers.dev`;
    }
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = getApiBaseUrl();
    return fetch(`${baseUrl}${path}`, options);
}

export default request;
