// Assets
import Locora from "../assets/BorderedLocora.png";

// Comps
import BaseButton from "./button";
import WaitlistButton from "./waitlistbutton";

export default function TopBar() {

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-bay-of-many-400 to drop-shadow-xl`}>
                <div className="mx-auto flex max-w-3xl items-center justify-between px-5 md:px-8 py-2">
                    <div className="flex items-center gap-3">
                        <BaseButton hasBackground={false} shape="circle">
                            <img src={Locora} alt="Locora Logo" className="h-8" />
                        </BaseButton>
                        <h1 className=" text-white stroke-1 stroke-black text-xl font-bold">Locora</h1>
                    </div>

                    <div className="ml-auto">
                        <WaitlistButton />
                    </div>
                </div>
            </header>

        </>
    );
}
