const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

async function request(path: string, options?: RequestInit) {
    if (ENVIRONMENT === "dev") {
        return fetch(`http://127.0.0.1:8787${path}`, { ...options });
    }

    return fetch(path, { ...options });
}


export default request
