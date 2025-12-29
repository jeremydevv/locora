import { Map } from "maplibre-gl";

let currMap : Map | null = null;
let searchQuery : string | null = null;

let listeners : ((map : Map) => void)[] = []
let queryListeners : ((query : string) => void)[] = []

export function setMap(newMap : Map) {
    currMap = newMap
    listeners.forEach((fn) => {
        fn(currMap as Map)
    })
}

export function setCurrentSearchQuery(query : string) {

    searchQuery = query
    queryListeners.forEach((fn : (query : string) => void) => {
        fn?.(searchQuery as string)
    })

}

export function onQueryChange(fn : (query : string) => void) {
    queryListeners.push(fn)
    return () => {
        queryListeners = queryListeners.filter((x) => x !== fn)
    }
}

export function onNewMap(fn : (map : Map) => void) {
    if (currMap) {
        fn(currMap)
    }
    listeners.push(fn)
    return () => {
        listeners = listeners.filter((x) => x !== fn)
    }
}

