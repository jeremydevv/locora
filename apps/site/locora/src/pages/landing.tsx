// comps
import TopBar from "../components/topbar";
import Seacher from "../components/seacher";
import Cloud from "../components/cloud";
import BaseButton from "../components/button";

// effects
import TypeWriter from "../effects/Typewriter";
import GoToSection from "../effects/GoToSection";

// assets
import clouds from "../assets/Clouds3.png";
import WaitlistButton from "../components/waitlistbutton";

function LandingPage() {
    return (
        <>
            <TopBar />

            {/* Section 1 */}
            <section
                id="landing"
                className="flex relative flex-col items-center justify-center h-screen bg-transparent"
            >
                <div className="relative z-1 flex flex-col items-center justify-center">
                    <h2 className="z-1 text-2xl text-bay-of-many-800 font-black">
                        {
                            <TypeWriter>
                                <p className="animate-blink text-bay-of-many-800">|</p>
                            </TypeWriter>
                        }
                    </h2>

                    {/* Searcher Component (bottom) */}
                    <div className="z-1">
                        <Seacher otherProps="max-w-lg mt-20 " />
                    </div>
                </div>

                <div className="z-1">
                    <Cloud otherProps="absolute w-32 h-32 z-0 left-0" image="" />
                </div>

                <img
                    src={clouds}
                    alt="Clouds"
                    className="absolute z-0 top-45 left-0 animate-float"
                />
            </section>

            {/* Section 2 */}
            <section
                id="features-1"
                className="flex flex-col items-center justify-center h-screen bg-transparent"
            >
                {/*informational (left side)*/}
                <div className="flex m-5">
                    <div className="flex-col gap-4">
                        <h1 className="font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-bay-of-many-500 text-5xl whitespace-nowrap">
                            AI Powered Searchs
                        </h1>
                        <p className="font-bold text-5xl">
                            Our system uses AI to power your search to create<br></br>
                            an intelligent query to our data to find what you<br></br>
                            truely want using keywords and customer feedback.
                        </p>
                    </div>

                </div>
                
                <div className="inline-flex gap-2">
                    <BaseButton text="Learn more" size = "extra-large" type="black" onClick={() => GoToSection("features-2")} />
                    <WaitlistButton size="extra-large" />
                </div>

            </section>

            <section id="features-2" className="flex flex-col items-center justify-center h-screen bg-transparent">
            
            </section>
        </>
    );
}

export default LandingPage;
