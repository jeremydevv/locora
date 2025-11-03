import { useState } from "react"
import Imagebutton from "./imagebutton"

import LocoraImage from "../assets/BorderedLocora.png"

interface props {

}

export default function PageSwitch({} : props) {

    return (
        <>
            <div
                className="absolute flex w-35 h-12 z-25 bottom-5 p-1 bg-bay-of-many-800 shadow-2xl border-2 border-bay-of-many-600 rounded-full items-center justify-center"
            >

                {/*this holds all of the section buttons */}

                <div
                    className="flex items-center justify-between p-2 gap-2"
                >

                    <Imagebutton image={LocoraImage} Effects="transform-all transition-transform duration-50 hover:scale-115 active:scale-85" />
                    <Imagebutton image={LocoraImage} Effects="transform-all transition-transform duration-50 hover:scale-115 active:scale-85" />
                    <Imagebutton image={LocoraImage} Effects="transform-all transition-transform duration-50 hover:scale-115 active:scale-85" />
                
                </div>

            </div>
        </>
    )

}