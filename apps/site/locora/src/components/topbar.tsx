// Assets
import Locora from "../assets/BorderedLocora.png";

// Comps
import BaseButton from "./button";
import WaitlistButton from "./waitlistbutton";
import Dropdown from "./dropdown";

// externals
import { useMotionValueEvent, useScroll } from "framer-motion";

import GoToSection from "../effects/GoToSection";
import { useState } from "react";
import clamp from "../utilities/clamp";

interface dropdownProps {
    PageType: "landing" | "waitlist"
}

export default function TopBar({ PageType }: dropdownProps) {

    const { scrollY } = useScroll();
    const [CurrentAlpha, setCurrentAlpha] = useState(0.9);

    useMotionValueEvent(scrollY, "change", (_) => {
        const alpha = clamp((0.9 - (scrollY.get() / 2750)), 0.6, 0.9);
        setCurrentAlpha(alpha);
    })

    function RedirectToMainPage() {
        // opens back main site
        window.location.href = "/";
    }

    return (
        <>
            <header
                className={`fixed bg-clip-padding backdrop-filter backdrop-blur-xl top-0 left-0 min-w-full z-20 border-b-3 shadow-xl border-bay-of-many-300 drop-shadow-xl`}
                style={{
                    background: `linear-gradient(to bottom,
                        rgba(0, 66, 244, ${CurrentAlpha}),
                        rgba(43, 127, 255, ${CurrentAlpha}),
                        rgba(124, 134, 255, ${CurrentAlpha}))`,
                }}
            >
                <div className="flex justify-center items-center  px-5 md:px-8 py-2">
                    {/* Left Logo */}
                    <div className="flex items-center gap-3">
                        <BaseButton hasBackground={false} otherProps="gap-5" shape="circle" onClick={() => { PageType === "landing" ? GoToSection("landing") : RedirectToMainPage()}}>
                            <img src={Locora} alt="Locora Logo" className="h-8" />
                            <h1 className="text-white text-xl font-bold drop-shadow-2xl">Locora</h1>
                        </BaseButton>
                    </div>

                    {/* Middle dropdown */}
                    <div className="flex-1 md:visible lg:flex xl:flex hidden justify-center items-center gap-2">
                        <Dropdown label="Info" options={["What is this?", "Waitlist Now!"]} />
                        <Dropdown label="Features" options={["AI Search", "Game-Based Experience"]} />
                    </div>

                    {/* Right waitlist */}
                    {
                        PageType === "landing" &&
                        <div className="flex items-center gap-3">
                            <WaitlistButton otherProps="align-right" />
                        </div>
                    }
                </div>
            </header>


        </>
    );
}
