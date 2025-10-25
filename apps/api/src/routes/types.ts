export interface Env {
    TURNSTILE_SECRET_KEY: string;
    SPREADSHEET_ID : string,
    GOOGLE_SERVICE_ACCOUNT_JSON : string,
}

export interface RequestWaitlistAdd {
    email: string;
    turnstile_token: string;
}

export default {};