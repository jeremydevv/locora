export interface Env {
    TURNSTILE_SECRET_KEY: string;
}

export interface RequestWaitlistAdd {
    email: string;
    turnstile_token: string;
}

export default {};