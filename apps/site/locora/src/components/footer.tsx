import GoToSection from "../effects/GoToSection"

import Locora from "../assets/BorderedLocora.png"

interface props {
    PageType : "landing" | "waitlist"
}

export default function Footer({PageType} : props) {

    function RedirectToMain() {
        // opens back main site
        window.location.href = "/"
    }

    function InfoHeader({ txt }: { txt: string }) {
        return (
            <div>
                <h2
                    className="text-xl text-white lg:text-2xl xl:text-5xl text-center font-bold leading-tight tracking-tight dark:text-white"
                >
                    {txt}
                </h2>
            </div>
        )
    }

    function WrappedLink({ txt, link }: { txt: string, link: string }) {
        return (
            <a
                onClick={() => {PageType === "landing" ? GoToSection(link) : RedirectToMain()} }
                className="text-md text-white lg:text-lg xl:text-2xl text-center underline font-semibold leading-tight tracking-tigh dark:text-white"
            >
                {txt}
            </a>
        )
    }

    return (
        <>
            <footer
                className='flex overflow-x-hidden bg-clip-padding backdrop-filter backdrop-blur-xl w-full flex-col h-[40vh] bg-gradient-to-t border-t-5 border-bay-of-many-300 items-center justify-center gap-5'
                style={{
                    background: `linear-gradient(to bottom,
                        rgba(43, 127, 255, ${0.45}),
                        rgba(124, 134, 255, ${0.45})),
                        rgba(0, 66, 244, ${0.45})`,
                }}
            >
                <div className="grid w-full justify-between grid-cols-3 gap-4">
                    <div className="flex flex-col p-2">
                        {<InfoHeader txt="Information" />}
                        {<WrappedLink txt="About Us" link="info" />}
                        {<WrappedLink txt="Waitlist" link="ending" />}
                    </div>

                    <div className="flex flex-col px-2 sm:px-4 md:px-6">
                        {<InfoHeader txt="Features" />}
                        {<WrappedLink txt="AI Search" link="features-1" />}
                        {<WrappedLink txt="Game-Based Experience" link="features-2" />}
                    </div>

                    <div>
                        {<InfoHeader txt="Contact" />}
                        <p className="xl:text-2xl text-white text-lg text-center font-semibold leading-tight tracking-tight dark:text-white">
                            Contact us at {
                                <a
                                    href="mailto:contact@locora.org"
                                    className="xl:text-2xl text-white text-lg text-center underline font-semibold leading-tight tracking-tight dark:text-white"
                                >
                                    contact@locora.org
                                </a>
                            }
                        </p>
                    </div>
                </div>

                <div className="flex p-2 gap-10 items-center">
                    <img src={Locora} alt="Locora Logo" className="h-8 w-8" />
                    <p className="text-md text-white text-center font-semibold leading-tight tracking-tight dark:text-white">
                        © 2025 Locora. All rights aren't reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}