import React from "react";

interface dropdownProps {
    label: string,
    options: string[]
}

import arrowDown from "../assets/arrow-down.png"
import Embossed from "./embossed";

export default function Dropdown({ label, options }: dropdownProps) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);    

    function toggleDropdown() {
        if (isOpen) {
            setIsOpen(isOpen)
            setToggled(!toggled);
        } else {
            setIsOpen(true)
            setToggled(false);
        }
    }

    function hoveringDropdown() {
        if (toggled) return;
        setIsOpen(true);
    }

    function notHoveringDropdown() {
        if (toggled) return;
        setIsOpen(false);
    }

    return (
        <>
            <div className = "items-center inline-block relative" onClick={toggleDropdown} onMouseEnter={hoveringDropdown} onMouseLeave={notHoveringDropdown}>
                <div className={"inline-flex align-middle bg-white rounded-md drop-shadow-lg z-50" + Embossed(true)}>
                    <span className="block px-5 py-2 text-sm text-bay-of-many-900 font-bold">{label}</span>
                    <img src={arrowDown} alt="Arrow Down Icon" className={`transition-all duration-150 rotate-${isOpen ? "0" : "180"} h-4 w-4 m-2 inline`} />
                </div>

                <div
                    className={`mt-2 absolute bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out origin-top 
                        ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`
                    }
                >
                    {options.map((option) => (
                        <a
                            key={option}
                            href="#"
                            className={"block px-4 py-2 rounded-md text-sm text-bay-of-many-800 hover:bg-gray-100" + Embossed(true)}
                        >
                            {option}
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}