import { Map } from "maplibre-gl";
import { list } from "postcss";
import { useState } from "react";

let currMap : Map | null = null;
let listeners : ((map : Map) => void)[] = []

export function setMap(newMap : Map) {
    currMap = newMap
    listeners.forEach((fn) => {
        fn(currMap as Map)
    })
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