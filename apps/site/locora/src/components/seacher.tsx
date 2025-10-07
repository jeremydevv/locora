import Embossed from "./embossed";

import searchIcon from "../assets/search-tool.png";
import BaseButton from "./button";

interface seacherProps {
    otherProps?: string;
}

export default function Seacher({otherProps}: seacherProps) {

    var BaseStyle = "flex items-center gap-2 bg-gray-200 drop-shadow-xl border-2 border-gray-300 text-black text-stroke-black text-sm rounded-lg block w-full p-3.5 ";

    return (
        <div>
            <div className={BaseStyle + otherProps + Embossed(false)}>
                <button>
                    <img src={searchIcon} alt="Search Icon" className="m-2 h-5 gap-1 mr-2 inline" />
                </button>
                <p className="text-white text-stroke-black font-bold">What's something <b>CRAZY?</b></p>
            </div>
        </div>
    );
}