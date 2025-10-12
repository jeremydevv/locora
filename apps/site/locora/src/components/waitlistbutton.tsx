import BaseButton from "./button";
import list from "../assets/add.png";

interface waitlistbuttonProps {
    size?: "xs" | "small" | "medium" | "large" | "extra-large" | undefined
}

export default function WaitlistButton({size = "medium"}: waitlistbuttonProps) {
    return (
        <>
            <BaseButton size={size} text="Join Waitlist" hasBackground={true} shape="circle" preChildren={
                <img src={list} alt="Check Box" className="h-4.5 p-0 m-0.5"/>
            }/>
        </>
    );
}
