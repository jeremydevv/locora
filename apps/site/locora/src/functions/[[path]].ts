import ValidateOrigin from "../utilities/ValidateOrigin";

interface Env {
    API: {
        fetch(request: Request): Promise<Response>;
    };
}

export const onRequest = async (context: { request: Request; env: Env; params: { path: string } }) => {
    const { request, env, params } = context;

    if (request.method === 'OPTIONS') {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': ValidateOrigin(request.headers.get('Origin')!) && (request.headers.get('Origin')) || 'https://locora.org',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
    });
}

    const apiPath = '/' + (params.path ?? '');

    if (!apiPath.startsWith('/v1/')) {
        return new Response('Invalid API path', { status: 404 });
    }

    const headers = new Headers(request.headers);
    headers.set('Access-Control-Allow-Origin', ValidateOrigin(request.headers.get('Origin')!) && (request.headers.get('Origin')) || 'https://locora.org');
    headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    const newRequest = new Request(apiPath, {
        method: request.method,
        headers: headers,
        body: request.body
    });



    return env.API.fetch(newRequest);;
};
