import { Map, Subscription } from "maplibre-gl";
import { onNewMap, onQueryChange } from "../../components/Mapview/MapStore";
import { GetIdToken } from "../../data/AuthStore";
import GetBusinessesList from "../../data/maps/search/QuerySearch";

let CurrentPayload: BusinessPayload | BusinessPayload[] | null = null;

export interface BusinessPayload {
    address : string,
    category : string,
    contact : {
        email : string,
        phone : string
    }

    id: string,
    latitude : number,
    longitude : number,

    name : string,
    website? : string,

    rating : Business_Ratings
    ratings : Record<string, User_Review>

    thumbnail? : string;
    description? : string,

}

export interface Business_Ratings {
    1 : number,
    2 : number,
    3 : number,
    4 : number,
    5 : number,
    
    average : number;
}

export interface User_Review {
    uid : string,
    rating : number,
    reviewText : string,
}

export interface BusinessDataResponse {
    success : boolean,
    businesses : BusinessPayload[] | null
}

export type onBusinessDataChange = (businessData: BusinessPayload[]) => void

let OnChangeListeners: (onBusinessDataChange[]) = []

function ChangeBusinessData(businessData: BusinessDataResponse) {
    CurrentPayload = businessData.businesses
    OnChangeListeners.forEach((fn: onBusinessDataChange) => fn?.(CurrentPayload as BusinessPayload[]))
}

function OnBusinessDataChange(fn: onBusinessDataChange) {
    OnChangeListeners.push(fn)

    return () => {
        OnChangeListeners = OnChangeListeners.filter((val) => val !== fn)
    }
}

function getBusinessData(): BusinessPayload | null {
    return CurrentPayload as BusinessPayload
}

let connected = false;
let onMapMoveConnection: Subscription | null = null;


onQueryChange(async (query: string) => {

    if (connected) return
    connected = true;

    const idToken = await GetIdToken()

    if (!idToken) {
        console.log("Attempting to search when not logged in")
        return
    }

    let CurrentMap: Map | null = null;

    onNewMap((map: Map) => {
        CurrentMap = map
    })

    if (!CurrentMap) {
        console.log("no map")
        return
    }

    const businessListData = await GetBusinessesList(idToken, query, {
        lat: (CurrentMap as Map).getCenter().lat,
        lon: (CurrentMap as Map).getCenter().lng,
        zoom: (CurrentMap as Map).getZoom()
    })

    ChangeBusinessData(businessListData as BusinessDataResponse);

    if (onMapMoveConnection) {
        onMapMoveConnection.unsubscribe()
    }

    let panningTimeout: NodeJS.Timeout | null = null;

    onMapMoveConnection = (CurrentMap as Map).on("move", () => {

        if (panningTimeout) {
            clearTimeout(panningTimeout)
        }

        panningTimeout = setTimeout(async () => {
            const currentZoom = (CurrentMap as Map).getZoom()

            if (currentZoom == undefined || Math.floor(currentZoom) <= 8 ) {
                console.log("zoomed out too much")
                return
            }

            const businessListData = await GetBusinessesList(idToken, query, {
                lat: (CurrentMap as Map).getCenter().lat,
                lon: (CurrentMap as Map).getCenter().lng,
                zoom: (CurrentMap as Map).getZoom()
            })

            ChangeBusinessData(businessListData as BusinessDataResponse);

        }, 1000);

    })

    if (!businessListData) {
        console.log("Invalid business data was provided")
        return
    }

    connected = false
})

export { OnBusinessDataChange, ChangeBusinessData, getBusinessData }