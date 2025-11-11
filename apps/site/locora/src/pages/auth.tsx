import { Helmet } from "react-helmet-async"

import Clouds from "../assets/Clouds3.png"
import BaseInput from "../components/baseinput"
import BaseButton from "../components/button"

import Google from "../assets/Google.png"
import Microsoft from "../assets/Microsoft.png"
import LocaraIcon from "../assets/BorderedLocora.png"
import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { isValidEmail, standardizePhoneNumber } from "../utilities/infoValidators"
import { isNumericalString } from "framer-motion"
import request from "../utilities/request"
import { input } from "framer-motion/client"

const TURNSTILE_SITE_KEY = import.meta.env.VITE_LOGIN_SITE_TURNSTILE

function AuthenticationPage() {

    const [feedback, setFeedback] = useState("")

    const [inputStatus, setInputStatus] = useState<boolean | null>(null)

    const [info, setInfo] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const [widgetId, setWidgetId] = useState<string | null>(null)

    const RenderedCloudflare = useRef<boolean>(false)

    async function getTurnstileToken() {
        const token = await new Promise<string>((resolve, reject) => {
            // @ts-ignore
            window.turnstile.execute('#turnstile-container', {
                callback: (t: string) => resolve(t),
                'error-callback': () => reject(new Error('Turnstile execution failed')),
            })
        });
        return token
    }

    function DisplayFeedback(message: string) {
        setFeedback(message)
        setTimeout(() => {
            setFeedback("")
        }, 3000);
    }

    function InputLinter(value: string) {
        let NewValue = value
        if (isNumericalString(value.substring(0, 1))) {
            setInfo(standardizePhoneNumber(value)! || value)
        }

        setInfo(NewValue)

        if (!NewValue) {
            setInputStatus(true)
            return
        }

        const IsValid = isValidEmail(value) || !!standardizePhoneNumber(value)
        setInputStatus(IsValid)
    }

    async function LoginViaPasswordEmail() {
        if (info === "" || passwordInput === "") {
            DisplayFeedback("Please fill out all fields.")
            return
        }

        if (!inputStatus) {
            DisplayFeedback("Please enter a valid email or phone number.")
        }

        const tokenPromise = await getTurnstileToken()

        DisplayFeedback("Logging in...")
    }

    async function LoginViaSocialConnector(connector: "google" | "microsoft") {

        const Data = request(`/v1/auth/${connector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const Parsed = (await Data).json

        console.log(Parsed)

    }

    useEffect(() => {
        const attemptTurnstileLoad = () => {
            if (RenderedCloudflare.current) {
                return
            }

            RenderedCloudflare.current = true

            // @ts-ignore
            if (window.turnstile) {
                console.log("Turnstile loaded")
                // @ts-ignore
                const id = window.turnstile.render('#turnstile-container', {
                    sitekey: TURNSTILE_SITE_KEY,
                    size: "flexible",
                    theme: "dark",
                });
                setWidgetId(id)
            } else {
                setTimeout(attemptTurnstileLoad, 500)
            }
        };
        attemptTurnstileLoad()
    }, []);

    return (
        <>
            <Helmet>
                <title>Locora | Login or Signup</title>
                <meta name="description" content="Discover local businesses and get coupons and deals for your favorite cuisines. FBLA 2026" />
                <meta property="og:title" content="Locora | Signup or Login" />
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
                    className="w-screen h-screen flex-col bg-bay-of-many-500 flex items-center justify-center"
                >

                    <img src={Clouds} className="absolute xl:bottom-5 lg:bottom-5 animate-float invert opacity-8 w-full bottom-10" />

                    <div
                        className="border-2 border-bay-of-many-400 bg-clip-padding backdrop-filter backdrop-blur-xl flex-col drop-shadow-2xl rounded-2xl p-10 flex gap-5 items-center justify-center"
                        style={{
                            background: `linear-gradient(to bottom,
                            rgba(0, 50, 230, 0.3),
                            rgba(43, 127, 255, 0.6),
                            rgba(124, 134, 255, 0.2))`
                        }}
                    >

                        <div
                            className="flex flex-col gap-4 px-5 mt-2"
                        >
                            <h1
                                className="text-white text-center font-bold text-2xl"
                            >
                                Log in or Sign up
                            </h1>

                            <div
                                className="flex p-2 gap-4"
                            >
                                <div
                                    className="flex flex-col gap-3"
                                >
                                    <BaseButton
                                        otherProps="w-full gap-2"
                                        type="white" onClick={() => { LoginViaSocialConnector("google") }}
                                    >
                                        <img src={Google} className="h-5 w-5" />
                                        <p className="text-black font-semibold">Continue with Google</p>
                                    </BaseButton>

                                    <BaseButton
                                        otherProps="w-full gap-2"
                                        type="white" onClick={() => { LoginViaSocialConnector("microsoft") }}
                                    >
                                        <img src={Microsoft} className="h-5 w-5" />
                                        <p className="text-black font-semibold">Continue with Microsoft</p>
                                    </BaseButton>

                                </div>

                            </div>

                        </div>

                        <div
                            className="w-64 h-px rounded-xl bg-white/70 m-2"
                        >
                            {/* divider */}
                        </div>

                        <div
                            className="flex flex-col gap-3 mb-2"
                        >
                            <div>
                                <p className="text-white text-lg sm:text-base">
                                    Email or Phone Number
                                </p>
                                <BaseInput id="email" borderType={inputStatus === true ? "Normal" : "Red"} input={info} placeholder="johndoe@gmail.com" inputType="email" OnChange={(msg) => (InputLinter(msg.target.value))} />
                            </div>

                            <div>
                                <p className="text-white">
                                    Password
                                </p>
                                <BaseInput id="password" input={passwordInput} placeholder="Password" inputType="password" OnChange={(msg) => { setPasswordInput(msg.target.value) }} />
                            </div>

                            <p
                                className="text-center font-semibold text-balance text-red-600 text-sm mb-[-8px]"
                                style={{
                                    display: feedback === "" ? "none" : "block"
                                }}
                            >
                                {feedback}
                            </p>

                        </div>

                        <div
                            className="flex flex-col gap-2"
                        >
                            <div
                                id="turnstile-container"
                                className="w-full"
                            ></div>

                            <BaseButton text="Continue" type="default" otherProps="flex gap-2" onClick={LoginViaPasswordEmail}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </BaseButton>
                            <a href="/reset-password" className="text-sm text-white underline hover:text-gray-200 self-start">Forgot password?</a>
                        </div>

                    </div>

                    <div
                        className="flex flex-col items-center mt-4"
                    >
                        <img src={LocaraIcon} className="h-5 w-5" />
                        <p className="text-xs text-white mt-2">By continuing, you agree to Locora's Terms of Service and Privacy Policy.</p>
                    </div>

                </div>
            </main>

        </>
    )
}

export default AuthenticationPage