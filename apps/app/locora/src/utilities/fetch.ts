const ENVIRONMENT = import.meta.env.VITE_ENVIORNMENT;

function getApiBaseUrl() {

    if (ENVIRONMENT === "dev") {
        return "http://localhost:6767";
    } else {
        return "https://api.locora.org";
    }
}

async function request(path: string, options?: RequestInit) {
    const baseUrl = getApiBaseUrl();

    console.log(baseUrl + path)

    return fetch(`${baseUrl}${path}`, options);
}

export default request;
