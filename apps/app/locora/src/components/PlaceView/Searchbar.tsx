import { LngLat, Map, MapTouchEvent } from "maplibre-gl"
import { useEffect } from "react"
import * as maplibregl from "maplibre-gl"
import { onNewMap, setCurrentSearchQuery } from "../Mapview/MapStore"
import { BusinessPayload, OnSelectedBusinessChange } from "../../pages/BusinessPage/BusinessStore";
import { ChangePage } from "../../App";

interface props {
    changePage? : ChangePage
    rawQueryChange : (q : string) => void
}

export default function PlaceSearchBar({changePage, rawQueryChange} : props) {

    let QuerySubmitTimeout : NodeJS.Timeout | null = null;

    OnSelectedBusinessChange((businessData : BusinessPayload | null) => {
        console.log("Selected business changed in SearchResults component")
        if(businessData && changePage) {
            changePage(5, {
                data : businessData
            })
        }
    })

    function placeMapMarker(map: Map, location: LngLat) {
        new maplibregl.Marker({
            color : "#ff0000",
        })
            .setLngLat(location)
            .addTo(map)
        console.log("Placed a marker at " + location)
    }

    function OnMapClick(map: Map, lngLat: LngLat) {
        placeMapMarker(map, lngLat)
    }

    function QueryChange(newQuery : string) {

        rawQueryChange(newQuery)
        
        if (QuerySubmitTimeout) clearTimeout(QuerySubmitTimeout)

        QuerySubmitTimeout = setTimeout(() => {
            setCurrentSearchQuery(newQuery)
        }, 500);
    }

    useEffect(() => {
        const Unsubscribe = onNewMap((map: Map) => {

            function clickHandler(event: MapTouchEvent) {
                const location = event.lngLat
                console.log(event.lngLat)
                OnMapClick(map, location)
            }

            map.on("click", clickHandler)

            return () => {
                map.off("click", clickHandler)
            }
        })

        return () => {
            Unsubscribe?.()
        }
    }, [])

    return (
        <>
            <div
                className="flex flex-row gap-2"
            >

                {/* search bar text input */}
                <div
                    className="bg-linear-to-b p-1.5 from-bay-of-many-600 to-bay-of-many-800/80 rounded-full w-[20vw] shadow-white/30 shadow-2xl"
                >
                    <input
                        onChange={(e) => {
                            QueryChange(e.target.value)
                        }}
                        className="p-2 pl-4 bg-bay-of-many-950 w-full h-full rounded-full text-white min-w-0"
                        placeholder="wheres the nearest cafe?"
                    />
                </div>

                {/* search button image */}
                <div
                    className="bg-linear-to-b p-2.5 aspect-square from-bay-of-many-600 to-bay-of-many-800 rounded-full hover:scale-105 active:scale-95 transform transition-all duration-100 shadow-white/30 shadow-2xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth={1} className="size-10 p-1.5">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
        </>
    )
}