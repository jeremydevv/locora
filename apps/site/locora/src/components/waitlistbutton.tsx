import BaseButton from "./button";
import CheckBox from "../assets/check.png";

export default function WaitlistButton() {
    return (
        <BaseButton otherProps={`flex m-1`} text="Join Waitlist" hasBackground={true} shape="circle" children={
            <img src={CheckBox} alt="Check Box" className="h-6 m-0.5"/>
        }/>
    );
}
