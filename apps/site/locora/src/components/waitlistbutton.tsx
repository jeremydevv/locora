import BaseButton from "./button";
import list from "../assets/list.png";

export default function WaitlistButton() {
    return (
        <>
            <BaseButton otherProps={`flex m-1.5 gap-0.5 `} text="Join Waitlist" hasBackground={true} shape="circle" preChildren={
                <img src={list} alt="Check Box" className="h-6 m-0.5"/>
            }/>
        </>
    );
}
