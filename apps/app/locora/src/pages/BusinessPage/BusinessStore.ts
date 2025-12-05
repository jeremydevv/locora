import { onQueryChange } from "../../components/Mapview/MapStore";
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

onQueryChange(async (query: string) => {

    if(connected) return
    connected = true;

    const idToken = await GetIdToken()

    console.log(idToken)

    if (!idToken) {
        console.log("Attempting to search when not logged in")
        return
    }

    const businessListData = await GetBusinessesList(idToken,query)

    if (!businessListData) {
        console.log("Invalid business data was provided")
        return
    }

    console.log(businessListData)
})

export { OnBusinessDataChange, ChangeBusinessData, getBusinessData }