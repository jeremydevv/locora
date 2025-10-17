import { title } from "framer-motion/client";

interface InfoboxProps {
    children? : React.ReactNode,
    title : string,
    info : string,
    demonstration : string,
}
export default function Infobox({children, title, info, demonstration} : InfoboxProps) {
    return (
        <>
            <div
                className={"bg-bay-of-many-50 aspect-square drop-shadow-xl border-2 border-bay-of-many-300 rounded-lg block p-3.5 "}
            >
                <h2
                    className="text-2xl font-bold"
                >
                    {title}
                </h2>
                <p
                    className="break-words whitespace-pre-line"
                >
                    {info}
                </p>
            </div>
        </>
    )
}