interface cloudProps {
    otherProps? : string,
    image? : string
}

import CloudBubble from "../assets/Bubble.png"

export default function cloud({otherProps , image} : cloudProps) {
    return (
        <>
            <img src={CloudBubble} alt="Clouds" className={otherProps + "select-none"}></img>
            <img src={image} alt="Company branding" className={"select-none"}></img>
        </>
    )
}