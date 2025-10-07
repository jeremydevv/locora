import React from "react";

interface dropdownProps {
    label : string,
    options : string[]
}

import arrowDown from "../assets/arrow-down.png"
import Embossed from "./embossed";

export default function Dropdown({label, options}: dropdownProps) {

    const [isOpen, setIsOpen] = React.useState(false);

    function hoveringDropdown() {
        setIsOpen(true);
    }  

    function notHoveringDropdown() {
        setIsOpen(false);
    }

    return (
        <>
            <div className={"inline-flex align-middle items-center bg-white rounded-md drop-shadow-lg z-50" + Embossed(true)} onMouseEnter={hoveringDropdown} onMouseLeave={notHoveringDropdown}>
                <span className="block px-5 py-2 text-sm text-bay-of-many-900 font-bold">{label}</span>
                <div className="py-1" style={
                    { display: isOpen ? 'block' : 'none' }
                    }>
                    {options.map((option) => (
                        <a key={option} href="#" className={"rounded-md block px-4 py-2 text-sm text-bay-of-many-800 hover:bg-gray-600" + Embossed(true)}>
                            {option}
                        </a>
                    ))}
                </div>
                <img src={arrowDown} alt="Arrow Down" className="w-3 h-3 m-2" />
            </div>  
        </>
    )
}