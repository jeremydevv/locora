const ENVIRONMENT = import.meta.env.ENVIRONMENT
async function request(path: string, options?: RequestInit) {

    if (ENVIRONMENT === "dev") {
        // Local development uses wrangler
        return fetch(`http://127.0.0.1:8787${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
        });
    }

    // @ts-ignore - injected at runtime by Cloudflare Pages
    return API.fetch(path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
    });
}

export default request
