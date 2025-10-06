import Embossed from "./embossed";

interface seacherProps {
    otherProps?: string;
}

export default function Seacher({otherProps}: seacherProps) {

    var BaseStyle = "bg-gray-300 border border-gray-300 text-white text-stroke-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  ";

    return (
        <>
            <div className={BaseStyle + otherProps + Embossed()}>
                <p>What's something Crazy?</p>
            </div>
        </> 
    );
}