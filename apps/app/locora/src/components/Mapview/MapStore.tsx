import { Map } from "maplibre-gl";

let currMap : Map | null = null;
let listeners : ((map : Map) => void)[] = []

export function setMap(newMap : Map) {
    currMap = newMap
    console.log("map was set")
    listeners.forEach((fn) => {
        console.log("gives map in listeners")
        fn(currMap as Map)
    })
}

export function onNewMap(fn : (map : Map) => void) {
    if (currMap) {
        console.log("gives map")
        fn(currMap)
    }
    listeners.push(fn)

    return () => {
        listeners = listeners.filter((x) => x !== fn)
    }
}