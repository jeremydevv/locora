const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

function getApiBaseUrl() {
    const wholeUrl = window.location.hostname;

    console.log(wholeUrl);

    if (ENVIRONMENT === "dev") {
        return "http://127.0.0.1:8787";
    } else {

        if (wholeUrl === "locora.org") {
            return "https://api.locora.org";
        }

        const subDomain = wholeUrl.split(".")[0];
        return `https://${subDomain}-locora-api.jeremymathew100.workers.dev`;
    }
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = getApiBaseUrl();
    return fetch(`${baseUrl}${path}`, options);
}

export default request;
