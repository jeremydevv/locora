interface Env {
    API: {
        fetch(request: Request): Promise<Response>;
    };
}

export const onRequest = async (context: { request: Request; env: Env; params: { path: string } }) => {
    const { request, env, params } = context;

    const apiPath = '/' + (params.path ?? '');

    if (!apiPath.startsWith('/v1/')) {
        return new Response('Invalid API path', { status: 404 });
    }
    
    const newRequest = new Request(apiPath, {
        method: request.method,
        headers: request.headers,
        body: request.body
    });

    return env.API.fetch(newRequest);;
};
