export interface Env {
    TURNSTILE_SECRET_KEY: string;
    SPREADSHEET_ID : string,
    LOGIN_SITE_TURNSTILE : string
    GOOGLE_SERVICE_ACCOUNT_JSON : string,
    FIREBASE_API_KEY : string,
    FIREBASE_PROJECT_ID : string,
    GITHUB_TOKEN : string,
    GEO_API_KEY : string, 
    GOOGLE_MAPS_API_KEY : string,
    // cf bindings
    WaitlistRatelimiter : RateLimit
    MapKV : KVNamespace
    CDN : R2Bucket
    MapDB : D1Database
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

export interface GeoAPI_PlaceDetailsFeatures {
    place_id: string;
    name: string;
    formatted_address?: string;
    types?: string[];
    formatted_phone_number?: string;
    website?: string;
    opening_hours?: {
        weekday_text?: string[];
    };
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    photos?: {
        photo_reference: string;
    }[];
}

export interface GeoAPI_PlaceDetailsResponse {
    result : GeoAPI_PlaceDetailsFeatures
    type : string | "FeatureCollection"
}

export interface GeoAPI_StoreFrontPhotoResponse {
    html_attributions: string[];
    result : {
        name : string,
        formatted_address : string,
        photos : Array<{
            height : number,
            width : number,
            photo_reference : string,
            html_attributions : string[]
        }>
    },
    status : string;
}

export interface GeoAPI_QueryResults {
    place_id: string;
    name: string;
    formatted_address?: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    types?: string[];
}

export interface GeoAPI_QueryResponse {
    results : Array<GeoAPI_QueryResults>;
    status : string;
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

    contact : {
        phone : string;
        email : string;
    };

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

    thumbnail? : string;

    timestamp : string;
    ttl : number;
}

export default {};