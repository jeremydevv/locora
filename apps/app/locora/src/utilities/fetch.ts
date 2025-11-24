const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

function getApiBaseUrl() {

    if (ENVIRONMENT === "dev") {
        return "http://localhost:6767";
    } else {
        return "https://api.locora.org";
    }
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = getApiBaseUrl();
    return fetch(`${baseUrl}${path}`, options);
}

export default request;
