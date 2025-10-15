//comps
import BaseButton from "./button";

// assets
import mail from "../assets/envelope.svg"

interface waitlistbuttonProps {
    size?: "xs" | "small" | "medium" | "large" | "extra-large" | undefined
}

import { Link } from "react-router-dom";

export default function WaitlistButton({ size = "medium" }: waitlistbuttonProps) {
    return (
        <>
            <Link to="/waitlist">
                <BaseButton
                    size={size}
                    text="Join Waitlist"
                    hasBackground={true}
                    otherProps="gap-1"
                    shape="circle"
                    preChildren={
                        <img
                            src={mail}
                            alt="Mail Icon"
                            className="invert brightness-0 saturate-100 h-4.5 p-0 m-0.5"
                        />
                    }
                />
            </Link>
        </>
    );
}
