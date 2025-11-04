import { useState } from "react"
import Template from "../assets/pfptemp.png"

import Bookmark from "../assets/Bookmark.png"
import Compass from "../assets/Compass.png"
import HomeIcon from "../assets/Home.png"
import Imagebutton from "./imagebutton"

interface BannerProps {
    isExpanded : boolean
}

function ProfileExpansionBanner({isExpanded} : BannerProps) {
    return (
        <>
            <div
                className={`relative bottom-18 flex bg-clip-padding backdrop-filter backdrop-blur-xl transform-all origin-bottom transition-transform duration-200 ease-in-out border-2 border-bay-of-many-600 flex-col z-0 h-30 w-12 p-1 items-center justify-center select-none rounded-full overflow-hidden mt-2`}
                style={{
                    scale : isExpanded ? "1" : "0",
                    background : `linear-gradient(to bottom,rgba(0, 66, 244, 0.7),rgba(43, 127, 255, 0.7),rgba(124, 134, 255, 0.7)`,
                }}
            >
                
                <Imagebutton image={Bookmark} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"/>
                <Imagebutton image={Bookmark} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"/>
                <Imagebutton image={Bookmark} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"/>

            </div>
        </>
    )
}

export default function ProfileOpening() {

    const [expanded , toggleExpansion] = useState<boolean>(false)

    return (
        <div
            className="flex-row"
        >
            <ProfileExpansionBanner isExpanded={expanded} />

            <div
                className="flex relative bottom-16 z-5 hover:scale-105 active:scale-92 bg-clip-padding backdrop-filter backdrop-blur-xl transform-all transition-transform duration-50 select-none w-12 h-12 p-1 bg-bay-of-many-800 shadow-2xl border-2 border-bay-of-many-600 rounded-full items-center justify-center"
                style={{
                    background : `linear-gradient(to bottom,rgba(0, 66, 244, 0.7),rgba(43, 127, 255, 0.7),rgba(124, 134, 255, 0.7)`,
                }}
            >

                {/*this holds all of the section buttons */}

                <div
                    onClick={() => {toggleExpansion(!expanded)}}
                    className="flex z-25 items-center justify-between overflow-hidden w-10 h-10 rounded-full"
                >
                    <img src={Template} className="w-full h-full"/>
                </div>

            </div>
        </div>
    )

}