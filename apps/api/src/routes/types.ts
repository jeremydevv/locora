export interface Env {
    TURNSTILE_SECRET_KEY: string;
    SPREADSHEET_ID : string,
    LOGIN_SITE_TURNSTILE : string
    GOOGLE_SERVICE_ACCOUNT_JSON : string,
    FIREBASE_API_KEY : string,
    FIREBASE_PROJECT_ID : string,
    GITHUB_TOKEN : string,
    GEO_API_KEY : string,
<<<<<<< Updated upstream
    WaitlistRatelimiter : RateLimit,
    MapKV : KVNamespace,
=======

    // cf bindings
    WaitlistRatelimiter : RateLimit
    MapKV : KVNamespace
    CDN : R2Bucket
>>>>>>> Stashed changes
}

export interface CDN_Directory {
    releases : Record<string, unknown>;
    business_images : Record<string, unknown>;
}
export interface RequestWaitlistAdd {
    email: string;
    turnstile_token: string;
}

// BUSINESS API STRUCTS

export interface GeoAPI_QueryResponse {
    name : string,
    place_id : string,
    latitude : number,
    longitude : number,
    address_line2 : string,
    category : string,
}

// USER DATA STRUCTS
export interface User_DataPayload {
    username : string;
    displayName : string;
    
    bio : string;
    profilePictureURL : string;
    bannerPictureURL : string;

    createdAt : string;
    coins : string;
}

export interface User_Review {
    uid : string,
    rating : number,
    reviewText : string,
}

export interface Locora_Business {
    id : string;
    name : string;
    description? : string;
    category : string;
    latitude : number;
    longitude : number;
    address : string;

    phoneNumber? : string;
    website? : string;

    openingHours? : string;

    rating? : {

        1 : number,
        2 : number,
        3 : number,
        4 : number,
        5 : number,

        average : number;
    };

    ratings? : Record<string, User_Review>
}

export default {};