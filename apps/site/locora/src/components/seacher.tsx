import Embossed from "./embossed";

import searchIcon from "../assets/search-tool.png";

import WaitlistButton from "./waitlistbutton";
import BaseButton from "./button";

interface seacherProps {
    otherProps?: string;
}

export default function Seacher({otherProps}: seacherProps) {

    var BaseStyle : string = "flex items-center bg-bay-of-many-50 drop-shadow-xl border-2 border-bay-of-many-600 text-black text-stroke-black text-sm rounded-lg block w-full p-3.5 ";

    return (
        <div>
            <div className={BaseStyle + otherProps + Embossed(false)}>
                <input type="text" placeholder="Where is the closest place with labubus?" className="bg-transparent focus:outline-none w-full " />
                <button>
                    <img src={searchIcon} alt="Search Icon" className="drop-shadow-lg/35 m-2 h-5 gap-1 mr-2 inline " />
                </button>
            </div>
            <div className="flex gap-15 justify-between max-w-lg ml-2 mr-2 mt-2">
                <BaseButton text="Learn more" type="black"/>
                <WaitlistButton size="small" />
            </div>
        </div>
    );
}