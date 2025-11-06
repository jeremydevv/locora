import { Helmet } from "react-helmet-async"

import Clouds from "../assets/Clouds3.png"
import BaseInput from "../components/baseinput"
import BaseButton from "../components/button"

import Google from "../assets/Google.png"
import Microsoft from "../assets/Microsoft.png"

function AuthenticationPage() {
    return (
        <>
            <Helmet>
                <title>Locora | Login or Signup</title>
                <meta name="description" content="Discover local businesses and get coupons and deals for your favorite cuisines. FBLA 2026" />
                <meta property="og:title" content="Locora" />
                <meta property="og:description" content="Discover and support nearby businesses." />
                <meta property="og:image" content="https://locora.org/LocoraBranding.png" />
                <meta property="og:url" content="https://locora.org" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://locora.org/auth" />
                {/* this page shouldnt be indexable */}
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <main>
                <div
                    className="w-full h-screen bg-bay-of-many-500 flex items-center justify-center"
                >

                    <img src={Clouds} className="absolute w-full h-full" />

                    <div
                        className="border-2 border-bay-of-many-400 bg-clip-padding backdrop-filter backdrop-blur-xl flex-row backdrop-blur-md drop-shadow-2xl rounded-2xl p-10 flex gap-5 items-center justify-center"
                        style={{
                            background: `linear-gradient(to bottom,
                            rgba(0, 50, 230, 0.3),
                            rgba(43, 127, 255, 0.5),
                            rgba(124, 134, 255, 0.5))`
                        }}
                    >

                        <div
                            className="flex flex-col gap-4 mt-2"
                        >
                            <h1
                                className="text-white font-bold text-2xl"
                            >
                                Log in or Sign up
                            </h1>

                            <div
                                className="flex flex-col gap-3 mb-2"
                            >
                                <BaseInput id="email" placeholder="Email or Phone Number" inputType="email" OnChange={() => { }} />
                                <BaseInput
                                    id="password" placeholder="Password" inputType="password" OnChange={() => { }}
                                >
                                    <BaseButton
                                        otherProps="flex items-right"
                                    >
                                        <img src={Microsoft} className="w-3 h-3" />
                                    </BaseButton>
                                </BaseInput>

                            </div>

                            <div
                                className="flex flex-col gap-2"
                            >
                                <BaseButton text="Continue" type="default" otherProps="flex gap-2" onClick={() => { }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </BaseButton>
                                <a href="/reset-password" className="text-sm text-white underline hover:text-gray-200 self-start">Forgot password?</a>
                            </div>

                        </div>

                        <div
                            className="h-64 w-px rounded-xl bg-white/70 m-2"
                        >
                            {/* divider */}
                        </div>

                        <div
                            className="flex p-2 gap-4"
                        >
                            <div
                                className="flex flex-col gap-3"
                            >
                                <BaseButton
                                    otherProps="w-full gap-2"
                                    type="white" onClick={() => { }}
                                >
                                    <img src={Google} className="h-5 w-5" />
                                    <p className="text-black font-semibold">Continue with Google</p>
                                </BaseButton>

                                <BaseButton
                                    otherProps="w-full gap-2"
                                    type="white" onClick={() => { }}
                                >
                                    <img src={Microsoft} className="h-5 w-5" />
                                    <p className="text-black font-semibold">Continue with Microsoft</p>
                                </BaseButton>
                            </div>
                        </div>

                    </div>

                </div>
            </main>

        </>
    )
}

export default AuthenticationPage