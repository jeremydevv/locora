interface cloudProps {
    otherProps? : string,
    image? : string
}

import CloudBubble from "../assets/Bubble.png"

export default function cloud({otherProps , image} : cloudProps) {
    return (
        <>
            <img src={CloudBubble} alt="Clouds" className={otherProps + "select-none"}></img>
            <img src={image || "https://tse4.mm.bing.net/th/id/OIP.E3pXibRjZn-9oPIHzFUiIAHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"} alt="Company branding" className={"select-none w-32 h-32"}></img>
        </>
    )
}