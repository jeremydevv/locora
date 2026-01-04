/*

    This is going to be the map and the search bar

*/

import { useEffect, useState } from "react";
import BaseButton from "../components/button";
import MapView from "../components/Mapview/MapView";
import PlaceSearchBar from "../components/PlaceView/Searchbar";
import SearchResults from "../components/PlaceView/SearchResults";
import { onNewMap, onQueryChange } from "../components/Mapview/MapStore";
import { Map } from "maplibre-gl";
import { ChangePage } from "../App";

interface props {
    ChangePage: ChangePage
}

export type RawQueryChanged = (q : string) => void

export default function Home({ ChangePage }: props) {

    const [map, setMap] = useState<Map | null>(null);
    const [currentQuery , setCurrentQuery] = useState<string>("")

    let onRawQueryChangedListeners : Array<RawQueryChanged> = []

    useEffect(() => {
        const conn1 = onNewMap((map) => {
            setMap(map);
        })
        const conn2 = onQueryChange((newQuery : string) => {
            setCurrentQuery(newQuery)
        })

        return () => {
            conn1?.()
            conn2?.()
        }
    }, [])

    function ZoomIn() {
        if (map) {
            map.setZoom(map.getZoom() + 1);
        }
    }

    function ZoomOut() {
        if (map) {
            map.setZoom(map.getZoom() - 1);
        }
    }

    function OnRawQueryChanged(callback : (q : string) => void) {
        onRawQueryChangedListeners.push(callback)
    }

    function RawQueryChangedFire(newRawQuery : string) {
        onRawQueryChangedListeners.forEach((callback) => {
            callback?.(newRawQuery)
        })
    }

    return (
        <>
            <div
                className="absolute w-full h-full overflow-y-hidden overflow-hidden"
            >
                <div className="absolute w-full h-full overflow-hidden">
                    <MapView />
                </div>

                <div
                    className="fixed flex left-[2.25vw] top-[10vh]"
                >
                    <PlaceSearchBar changePage={ChangePage} rawQueryChange={RawQueryChangedFire} />
                </div>

                <div
                    className="fixed flex left-[2.25vw] top-[17vh]"
                >
                    {
                        currentQuery !== "" && currentQuery !== null ? (
                            <SearchResults rawQueryChanged={OnRawQueryChanged} />
                        ) : (
                            <></>
                        )
                    }
                </div>

                <div
                    className="fixed flex flex-col justify-end left-[95vw] top-[9vh] pr-[3vw] gap-3"
                >
                    <BaseButton onClick={ZoomIn} preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>

                    } otherProps="aspect-square" />
                    <BaseButton onClick={ZoomOut} preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>

                    } otherProps="aspect-square" />
                </div>
            </div>
        </>
    )

}