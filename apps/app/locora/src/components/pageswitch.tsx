import Imagebutton from "./imagebutton"

import Bookmark from "../assets/Bookmark.png"
import Compass from "../assets/Compass.png"
import HomeIcon from "../assets/Home.png"

interface props {
    OnHomeActivate ?: () => void,
    OnExploreActivate ?: () => void,
    OnBookmarkActivate ?: () => void,
}

export default function PageSwitch({OnHomeActivate , OnExploreActivate, OnBookmarkActivate} : props) {

    return (
        <>
            <div
                className="fixed flex w-35 h-12 z-25 bottom-5 p-1 bg-clip-padding backdrop-filter backdrop-blur-xl drop-shadow-2xl border-2 border-bay-of-many-600 rounded-full items-center justify-center"
                style={{
                    background : `linear-gradient(to bottom,rgba(0, 66, 244, 0.5),rgba(43, 127, 255, 0.5),rgba(124, 134, 255, 0.5)`,
                }}
            >

                {/*this holds all of the section buttons */}

                <div
                    className="flex items-center justify-between p-2 gap-2"
                >

                    <Imagebutton image={HomeIcon} OnActivated={OnHomeActivate} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                    <Imagebutton image={Compass} OnActivated={OnExploreActivate} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                    <Imagebutton image={Bookmark} OnActivated={OnBookmarkActivate} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                
                </div>

            </div>
        </>
    )

}