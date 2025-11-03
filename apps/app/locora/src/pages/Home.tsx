/*

    This is going to be the map and the search bar

*/

import MapView from "../components/Mapview/MapView";

export default function Home() {

    return (
        <>
            <div
                className="absolute w-full h-full overflow-y-hidden overflow-hidden"
            >
                <div className="absolute w-full h-full overflow-hidden">
                    <MapView />
                </div>
            </div>
        </>
    )

}