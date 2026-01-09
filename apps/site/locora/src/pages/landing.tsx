// comps
import TopBar from '../components/topbar'
import Seacher from '../components/seacher'
import BaseButton from '../components/button';

// effects
import TypeWriter from "../effects/Typewriter";
import GoToSection from "../effects/GoToSection";

// assets
import clouds from "../assets/Clouds3.png";
import BlueStarImage from "../assets/BlueStar.png";
import DownArrow from "../assets/angle-down.svg"
import Footer from '../components/footer';

import { Helmet } from 'react-helmet-async';

function LandingPage() {

    return (
        <>
            <Helmet>
                <title>Locora | Local is Life</title>
                <meta name="description" content="Discover local businesses and get coupons and deals for your favorite cuisines. FBLA 2026" />
                <meta property="og:title" content="Locora" />
                <meta property="og:description" content="Discover and support nearby businesses." />
                <meta property="og:image" content="https://locora.org/LocoraBranding.png" />
                <meta property="og:url" content="https://locora.org" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://locora.org/" />
            </Helmet>

            <main>
                <TopBar PageType="landing" />

                {/* Section 1 */}
                <section
                    id="landing"
                    className="flex flex-col items-center justify-center min-h-screen bg-transparent"
                >
                    <div className="w-full relative z-1 flex flex-col items-center justify-center">
                        <h2 className="z-1 text-2xl text-bay-of-many-800 font-black">
                            {
                                <TypeWriter />
                            }
                        </h2>

                        {/* Searcher Component (bottom) */}
                        <div className="z-1 px-5">
                            <Seacher otherProps="max-w-lg mt-20 " />
                        </div>
                    </div>

                    <img
                        src={clouds}
                        alt="Clouds"
                        className="absolute w-full top-150 sm:top-150 md:top-100 lg:top-10 xl:top-0 overflow-x-hidden z-0 left-0 animate-float"
                    />
                </section>

                {/*Information*/}
                <section
                    id="info"
                    className="flex flex-col items-center px-8 sm:px-16 md:px-32 lg:px-48 xl:px-60 gap-5 justify-center min-h-[60vh] bg-transparent"
                >
                    <div className='w-full'>
                        <h1
                            id="info-title"
                            className="font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-bay-of-many-500 text-5xl lg:text-6xl xl:text-7xl"
                        >
                            What is Locora?
                        </h1>

                        <p className="px-2 xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-xl sm:px-8 md:px-12 lg:px-16 xl:px-16 text-center font-bold text-bay-of-many-900">
                            Locora is a <a href="https://www.fbla.org/"><u>FBLA Project</u></a><sup>1</sup> that supports local businesses by providing
                            an interface for consumers to find and review local businesses.
                            Other features such as bookmarking businesses and providing services
                            such as deals and coupons is also present in the requirements from FBLA
                        </p>

                        <p
                            className="flex animate-bounce justify-center text-center p-2 pt-5 gap-3 m-1 items-center text-2xl font-light"
                            onClick={() => GoToSection("features-1")}
                        >
                            <u>Keep scrolling to learn more</u>
                            {
                                <img src={DownArrow} className="h-6 w-6" />
                            }
                        </p>
                    </div>
                </section>

                <section
                    className="flex flex-col items-center px-8 sm:px-16 md:px-32 lg:px-48 xl:px-60 gap-5 justify-center min-h-[60vh] bg-transparent"
                >
                    <div
                        className='w-full'
                    >
                        <div
                            className='flex flex-row gap-5 items-center'
                        >
                            <div
                                className='flex flex-col gap-2'
                            >
                                <h1
                                    className="font-black text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-bay-of-many-500 text-5xl lg:text-6xl xl:text-5xl"
                                >Download and install the application!</h1>
                                <p
                                    className="flex text-left p-1 gap-3 m-1 items-center text-2xl font-semibold"
                                >
                                    Get the appropriate file for your device and get ready!<br></br>
                                    Go to the download page via the download button below and get the app.
                                </p>
                            </div>
                            <div>
                                <img src={BlueStarImage} alt="Blue Star Example" className="w-96 h-auto rounded-lg shadow-lg border-4 border-bay-of-many-300" />
                            </div>
                        </div>

                        <BaseButton
                            type="black"
                            text="Download Now!"
                            onClick={() => {
                                window.location.href = "/download";
                            }}
                        />

                        <p
                            className="flex animate-bounce justify-center text-center p-2 pt-2 gap-3 m-1 items-center text-2xl font-light"
                            onClick={() => GoToSection("features-1")}
                        >
                            <u>Keep scrolling to learn more</u>
                            {
                                <img src={DownArrow} className="h-6 w-6" />
                            }
                        </p>
                    </div>
                </section>

                <section
                    className="flex flex-col items-center px-8 sm:px-16 md:px-32 lg:px-48 xl:px-60 gap-5 justify-center min-h-[60vh] bg-transparent"
                >
                    <div
                        className='w-full'
                    >
                        <div
                            className='flex flex-row-reverse gap-5 items-center'
                        >
                            <div
                                className='flex flex-col gap-2'
                            >
                                <h1
                                    className="font-black text-right text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-bay-of-many-500 text-5xl lg:text-6xl xl:text-5xl"
                                >Log in or Register!</h1>
                                <p
                                    className="flex text-right p-1 gap-3 m-1 items-center text-2xl font-semibold"
                                >
                                    Use your email to create an account with us to save your favorites and ratings!<br></br>
                                    Without doing so, you will not be able to use our features.
                                </p>
                            </div>
                            <div>
                                <img src={BlueStarImage} alt="Blue Star Example" className="w-96 h-auto rounded-lg shadow-lg border-4 border-bay-of-many-300" />
                            </div>
                        </div>

                        <p
                            className="flex animate-bounce justify-center text-center p-2 pt-2 gap-3 m-1 items-center text-2xl font-light"
                            onClick={() => GoToSection("features-1")}
                        >
                            <u>Keep scrolling to learn more</u>
                            {
                                <img src={DownArrow} className="h-6 w-6" />
                            }
                        </p>
                    </div>
                </section>

                <section
                    className="flex flex-col items-center px-8 sm:px-16 md:px-32 lg:px-48 xl:px-60 gap-5 justify-center min-h-[60vh] bg-transparent"
                >
                    <div
                        className='w-full'
                    >
                        <div
                            className='flex flex-row gap-5 items-center'
                        >
                            <div
                                className='flex flex-col gap-2'
                            >
                                <h1
                                    className="font-black text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-bay-of-many-500 text-5xl lg:text-6xl xl:text-5xl"
                                >Use our features!</h1>
                                <p
                                    className="flex text-left p-1 gap-3 m-1 items-center text-2xl font-semibold"
                                >
                                    Go to the home page and query a sentence to find a local business! Try something like... <br></br>
                                    <i className='italic'>"Best pizza near me"</i> or <i className='italic'>"Coffee shops in San Francisco"</i>
                                </p>
                            </div>
                            <div>
                                <img src={BlueStarImage} alt="Blue Star Example" className="w-96 h-auto rounded-lg shadow-lg border-4 border-bay-of-many-300" />
                            </div>
                        </div>

                    </div>
                </section>

                <Footer PageType="landing" />
            </main>
        </>
    );
}

export default LandingPage;
