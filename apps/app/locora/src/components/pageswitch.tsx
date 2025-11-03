import { useState } from "react"
import Imagebutton from "./imagebutton"

import LocoraImage from "../assets/BorderedLocora.png"

import Bookmark from "../assets/Bookmark.png"
import Compass from "../assets/Compass.png"
import HomeIcon from "../assets/Home.png"

interface props {

}

export default function PageSwitch({} : props) {

    return (
        <>
            <div
                className="flex w-35 h-12 z-25 bottom-5 p-1 bg-bay-of-many-800 shadow-2xl border-2 border-bay-of-many-600 rounded-full items-center justify-center"
            >

                {/*this holds all of the section buttons */}

                <div
                    className="flex items-center justify-between p-2 gap-2"
                >

                    <Imagebutton image={HomeIcon} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                    <Imagebutton image={Compass} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                    <Imagebutton image={Bookmark} Effects="transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85" />
                
                </div>

            </div>
        </>
    )

}