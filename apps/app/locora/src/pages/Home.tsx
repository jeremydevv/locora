/*

    This is going to be the map and the search bar

*/

import MapView from "../components/Mapview/MapView";
import PlaceView from "../components/PlaceView/Main";
import PlaceSearchBar from "../components/PlaceView/Searchbar";
import SearchResults from "../components/PlaceView/SearchResults";
import { BusinessPayload } from "./BusinessPage/BusinessStore";

interface props {
    ChangePage : (newSection : number, data? : BusinessPayload) => void
}

export default function Home({ChangePage} : props) {

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
                    <PlaceSearchBar changePage={ChangePage} />
                </div>

                <div
                    className="fixed flex left-[2.25vw] top-[17vh]"
                >   
                    <SearchResults />
                </div>
            </div>
        </>
    )

}