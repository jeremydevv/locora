/*

    This is going to be the map and the search bar

*/

import MapView from "../components/Mapview/MapView";
import PlaceView from "../components/PlaceView/Main";
import PlaceSearchBar from "../components/PlaceView/Searchbar";

export default function Home() {

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
                    <PlaceSearchBar />
                </div>

                <div
                    className="fixed flex left-[2.25vw] top-[20vh]"
                >
                    <PlaceView />
                </div>
            </div>
        </>
    )

}