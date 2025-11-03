/*

    This is going to be the map and the search bar

*/

import MapView from "../components/Mapview/MapView";

export default function Home() {

    return (
        <>
            <div
                className="w-full h-full"
            >
                <div className="absolute w-full h-screen overflow-hidden">
                    <MapView />
                </div>
            </div>
        </>
    )

}