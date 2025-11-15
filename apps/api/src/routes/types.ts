export interface Env {
    TURNSTILE_SECRET_KEY: string;
    SPREADSHEET_ID : string,
    LOGIN_SITE_TURNSTILE : string
    GOOGLE_SERVICE_ACCOUNT_JSON : string,
    FIREBASE_API_KEY : string,
    FIREBASE_PROJECT_ID : string
    WaitlistRatelimiter : any
}

export interface RequestWaitlistAdd {
    email: string;
    turnstile_token: string;
}

export default {};