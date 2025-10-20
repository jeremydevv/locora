// comps
import TopBar from '../components/topbar'
import Seacher from '../components/seacher'
import Checkbox from '../components/checkbox'
import BaseButton from '../components/button';
import Infobox from '../components/Infobox';

// effects
import TypeWriter from "../effects/Typewriter";
import GoToSection from "../effects/GoToSection";

// assets
import clouds from "../assets/Clouds3.png";
import BlueStarImage from "../assets/BlueStar.png";
import DownArrow from "../assets/angle-down.svg"
import WaitlistButton from '../components/waitlistbutton';
import Footer from '../components/footer';
import BlueStar from '../assets/bluestar';

// libs
import { useEffect, useState } from 'react';

function LandingPage() {

    const [currentBox, setCurrentBox] = useState(0);
    const [infoBoxData, setInfoBoxData] = useState<{ [key: string]: number }>({
        Box1: 350,
        Box2: 350,
        Box3: 350,
        Box4: 350
    });

    const InfoBoxesData = [
        {
            id: 1,
            Title: "Users gain currency",
            Info: "People collect coins to exchange for deals and other benefits.",
            Emoji: "🪙"
        },
        {
            id: 2,
            Title: "Customize a Profile",
            Info: "Users can create a customized profile to demonstrate their creativity and display their favorites.",
            Emoji: "🎨"
        },
        {
            id: 3,
            Title: "Purchase Deals & Coupons",
            Info: "Local businesses can sell deals and coupons for coins so users purchase at their stores, in exchange, businesses can use those coins to advertise on the app.",
            Emoji: "🛒"
        },
        {
            id: 4,
            Title: "Local Business Perks",
            Info: "Businesses can use coins to advertise on the app and get more exposure to their customers. They can also receive discounts and other perks.",
            Emoji: "🎁"
        }
    ]


    useEffect(() => {
        setInfoBoxData({
            Box1: 350,
            Box2: 350,
            Box3: 350,
            Box4: 350,
            [`Box${currentBox}`]: 300
        })
    }, [currentBox]);

    return (
        <>
            <TopBar />

            {/* Section 1 */}
            <section
                id="landing"
                className="flex relative flex-col items-center justify-center min-h-screen bg-transparent"
            >
                <div className="relative z-1 flex flex-col items-center justify-center">
                    <h2 className="z-1 text-2xl text-bay-of-many-800 font-black">
                        {
                            <TypeWriter />
                        }
                    </h2>

                    {/* Searcher Component (bottom) */}
                    <div className="z-1">
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
                className="flex flex-col items-center px-8 sm:px-16 md:px-32 lg:px-48 xl:px-60 m-2 gap-5 justify-center min-h-[60vh] bg-transparent"
            >
                <h1
                    id="info-title"
                    className="font-black inline-block text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-bay-of-many-500 text-7xl"
                >
                    What is Locora?
                </h1>
                <p className="px-2 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg sm:px-8 md:px-12 lg:px-16 xl:px-16 text-center font-bold text-bay-of-many-900">
                    Locora is a <a href="https://www.fbla.org/"><u>FBLA Project</u></a><sup>1</sup> that supports local businesses by providing
                    an interface for consumers to find and review local businesses.
                    Other features such as bookmarking businesses and providing services
                    such as deals and coupons is also present in the requirements from FBLA
                </p>

                <div
                    className="flex flex-col gap-5"
                >
                    <h2
                        className="font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500  via-indigo-500 to-bay-of-many-500 text-4xl text-center"
                    >
                        Thats cool but.. what else can YOU do?
                    </h2>

                    <div
                        className="flex-col flex m-3 p-3 rounded-lg gap-3 max-w-3xl w-full self-center"
                    >
                        <Checkbox header="AI Searching" text="Our AI search feature helps the user find the best possible results" />
                        <Checkbox header="Corporate Development" text="Local businesses can create deals and coupons that users may use to gain tokens and advertise!" />
                        <Checkbox header="Game-Designed Experience" text="Users may collect coins to unlock deals at their favorite business and write reviews. In return, businesses may get coins from claimed deals to put forth to advertisement. Win win!" />
                        <Checkbox header="Can it drive me to the businesses?" alternate={true} text="Haha! Sorry but we don't have that feature yet! (yet)" />
                    </div>
                </div>

                <p
                    className="flex animate-bounce p-2 gap-3 m-1 items-center text-2xl font-light"
                    onClick={() => GoToSection("features-1")}
                >
                    <u>Keep scrolling to learn more</u>
                    {
                        <img src={DownArrow} className="h-6 w-6" />
                    }
                </p>
            </section>

            {/* Section 3 */}
            <section
                id="features-1"
                className="flex flex-col items-center justify-center min-h-screen bg-transparent"
            >
                {/*informational (left side)*/}
                <div className="flex w-full">
                    <div className="gap-4 z-1">
                        <div className="flex items-center justify-center gap-2 z-1 p-3">
                            <BlueStar />
                            <h1 className="font-black z-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-bay-of-many-500 text-7xl md:text-6xl sm:text-3xl">
                                AI Powered Searches
                            </h1>
                        </div>

                        <img src={BlueStarImage} alt="Blue Star" className="absolute hidden xl:block w-92 h-92 rotate-5 left-20 z-0" />
                        <img src={BlueStarImage} alt="Blue Star" className="absolute hidden xl:block w-92 h-92 rotate-[-6deg] right-20 z-0" />

                        <div className='flex flex-col justify-center items-center gap-3'>
                            <p className="font-bold sm:px-12 md:px-24 lg:px-40 xl:px-80 flex-1 text-center z-1 text-bay-of-many-950 text-4xl">
                                Our system uses <u>AI</u> to power your search to create
                                an intelligent query to our data to find what you
                                truly want using <u>keywords</u> and <u>customer feedback.</u>
                            </p>

                            <WaitlistButton />
                            <BaseButton text="Learn more" type="black" onClick={() => GoToSection("features-2")} />
                        </div>

                    </div>

                </div>

            </section>

            <section id="features-2" className="flex flex-col items-center min-h-screen bg-transparent">
                <h1
                    className='font-black z-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-700 to-indigo-300 text-6xl xl:text-7xl md:text-6xl sm:text-4xl text-center leading-20'
                >
                    Gameify your users' experience
                </h1>
                <div className='flex-col items-center flex gap-3 m-2 p-2'>
                    <p className="font-bold items-center text-center flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-56 text-bay-of-many-950 text-3xl">
                        Our team has an experience with working with video games
                        Making an experience fun can increase user retention
                        and engagement, increasing chances of conversion to become a paying user.
                    </p>
                    <p className="font-bold items-center text-center flex-1 text-bay-of-many-950 opacity-50 text-xl">
                        Hover on us!
                    </p>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-10 m-2 sm:m-4 md:m-8 lg:m-[60px] p-2'>
                    {
                        InfoBoxesData.map((box) => {
                            return (
                                <Infobox
                                    title={box.Title}
                                    info={box.Info}
                                    size={infoBoxData["Box" + box.id]}
                                    emoji={box.Emoji}

                                    onActive={() => { setCurrentBox(box.id) }}
                                    onInactive={() => { setCurrentBox(0) }}
                                />
                            )
                        })
                    }
                </div>
                <div className='flex gap-5'>
                    <BaseButton text="Learn more" type="black" onClick={() => GoToSection("ending")} />
                    <WaitlistButton />
                </div>
            </section>

            {/* Summary Section
                -this will include the downloads and the summary
            */}
            <section id="ending" className='flex flex-col items-center justify-center min-h-[50vh] m-2 sm:m-4 md:m-8 bg-transparent'>
                <div
                    className='flex md:flex-col gap-5 p-5'
                >
                    <h1
                        className={`text-5xl text-right text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-400 to-indigo-300 font-black`}
                    >
                        Sadly, we are still in development... BUT! Waitlist now for coins.
                    </h1>
                    <p
                        className={`text-2xl text-bay-of-many-900 p-5 font-bold`}
                    >
                        Waitlist to be ready for our release!<br></br>
                        You will receive a bonus for joining now.<br></br>
                        Inviting friends to waitlist will also give you more coins on initial release.<br></br>
                    </p>
                </div>
                <div className='flex p-4 gap-5'>
                    <WaitlistButton size='extra-large' />
                </div>
            </section>

            <Footer />
        </>
    );
}

export default LandingPage;
