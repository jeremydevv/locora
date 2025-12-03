export interface Env {
    TURNSTILE_SECRET_KEY: string;
    SPREADSHEET_ID : string,
    LOGIN_SITE_TURNSTILE : string
    GOOGLE_SERVICE_ACCOUNT_JSON : string,
    FIREBASE_API_KEY : string,
    FIREBASE_PROJECT_ID : string
    GEO_API_KEY : string,
    WaitlistRatelimiter : RateLimit
    MapKV : KVNamespace
}

export interface RequestWaitlistAdd {
    email: string;
    turnstile_token: string;
}

export interface DataPayload {
    username : string;
    displayName : string;
    
    bio : string;
    profilePictureURL : string;
    bannerPictureURL : string;

    createdAt : string;
    coins : string;
}

export default {};