// Assets
import Locora from "../assets/BorderedLocora.png";

// Comps
import BaseButton from "./button";
import WaitlistButton from "./waitlistbutton";
import Dropdown from "./dropdown";

import GoToSection from "../effects/GoToSection";

export default function TopBar() {

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-20 bg-bay-of-many-400 border-b-3 shadow-xl border-bay-of-many-600 drop-shadow-xl">
                <div className="mx-auto flex max-w-5xl items-center px-5 md:px-8 py-2">
                    {/* Left Logo */}
                    <div className="flex items-center gap-3">
                        <BaseButton hasBackground={false} otherProps="gap-5" shape="circle" onClick={() => {GoToSection("landing")}}>
                            <img src={Locora} alt="Locora Logo" className="h-8" />
                            <h1 className="text-white text-xl font-bold drop-shadow-2xl">Locora</h1>
                        </BaseButton>
                    </div>

                    {/* Middle dropdown */}
                    <div className="flex-1 gap-2 flex justify-center">
                        <Dropdown label="Info" options={["What is this?", "How does it work?", "FAQ"]} />
                        <Dropdown label="Features" options={["AI Search", "Game-Based Experience", "Review Businesses", "Community", "Deals & Discounts"]} />
                    </div>

                    {/* Right waitlist */}
                    <div className="flex items-center gap-3">
                        <WaitlistButton />
                    </div>
                </div>

            </header>


        </>
    );
}
