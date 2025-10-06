import BaseButton from "./button";
import list from "../assets/add.png";

export default function WaitlistButton() {
    return (
        <>
            <BaseButton size="medium" text="Join Waitlist" hasBackground={true} shape="circle" preChildren={
                <img src={list} alt="Check Box" className="h-4.5 p-0 m-0.5"/>
            }/>
        </>
    );
}
