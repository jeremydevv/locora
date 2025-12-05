import { Map, Subscription } from "maplibre-gl";
import { onNewMap, onQueryChange } from "../../components/Mapview/MapStore";
import { GetIdToken } from "../../data/AuthStore";
import GetBusinessesList from "../../data/maps/search/QuerySearch";

let CurrentPayload: BusinessPayload | null = null;

interface BusinessPayload {
    placeId: string,
    rating: number
}

export type onBusinessDataChange = (businessData: BusinessPayload) => void

let OnChangeListeners: (onBusinessDataChange[]) = []

function ChangeBusinessData(businessData: BusinessPayload) {
    CurrentPayload = businessData
    OnChangeListeners.forEach((fn: onBusinessDataChange) => fn?.(businessData))
}

function OnBusinessDataChange(fn: onBusinessDataChange) {
    OnChangeListeners.push(fn)

    return () => {
        OnChangeListeners = OnChangeListeners.filter((val) => val !== fn)
    }
}

function getBusinessData(): BusinessPayload | null {
    return CurrentPayload
}

let connected = false; 
let onMapMoveConnection : Subscription | null = null;


onQueryChange(async (query: string) => {

    if(connected) return
    connected = true;

    const idToken = await GetIdToken()

    if (!idToken) {
        console.log("Attempting to search when not logged in")
        return
    }

    let CurrentMap : Map | null = null;

    onNewMap((map : Map) => {
        CurrentMap = map
    })

    if (!CurrentMap) {
        console.log("no map")
        return
    }

    const businessListData = await GetBusinessesList(idToken,query, {
        lat : (CurrentMap as Map).getCenter().lat,
        lon : (CurrentMap as Map).getCenter().lng,
        zoom : (CurrentMap as Map).getZoom()
    })

    if (onMapMoveConnection) {
        onMapMoveConnection.unsubscribe()
    }

    let panningTimeout : NodeJS.Timeout | null = null;

    onMapMoveConnection = (CurrentMap as Map).on("move", (ev) => {

        if (panningTimeout) {
            clearTimeout(panningTimeout)
        }

        panningTimeout = setTimeout(async () => {
            const businessListData = await GetBusinessesList(idToken,query, {
                lat : (CurrentMap as Map).getCenter().lat,
                lon : (CurrentMap as Map).getCenter().lng,
                zoom : (CurrentMap as Map).getZoom()
            })

            console.log(businessListData)
        }, 1000);

    })

    if (!businessListData) {
        console.log("Invalid business data was provided")
        return
    }

    console.log(businessListData)

    connected = false
})

export { OnBusinessDataChange, ChangeBusinessData, getBusinessData }