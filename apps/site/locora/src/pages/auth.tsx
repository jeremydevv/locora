import { Helmet } from "react-helmet-async"

import Clouds from "../assets/Clouds3.png"
import BaseButton from "../components/button"

import LocoraIcon from "../assets/BorderedLocora.png"
import { useEffect, useRef, useState } from "react"
import { isValidEmail, standardizePhoneNumber } from "../utilities/infoValidators"
import { isNumericalString } from "framer-motion"
import request from "../utilities/request"
import Divider from "../components/divider"
import SocialConnectors from "../components/socialconnections"
import InputField from "../components/inputfield"
import TranslateErrorCode from "../utilities/ErrorCodeTranslation"

const TURNSTILE_SITE_KEY = import.meta.env.VITE_LOGIN_SITE_TURNSTILE

function AuthenticationPage() {

    const [currentPage, setPage] = useState<string>("Login")

    const [feedback, setFeedback] = useState("")

    const [inputStatus, setInputStatus] = useState<boolean | null>(null)

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")

    const [info, setInfo] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const [widgetId, setWidgetId] = useState<string | null>(null)

    const RenderedCloudflare = useRef<boolean>(false)

    function ChangePage(newPage: "Login" | "Register") {
        setPage(newPage)
    }

    async function getTurnstileToken() {
        const token = await new Promise<string>((resolve, reject) => {
            if (widgetId) {
                // @ts-ignore
                window.turnstile.reset()
            }
            // @ts-ignore
            const id = window.turnstile.execute('#turnstile-container', {
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

    /*
        return cases:
            social connector? :
                redirects user to oAuth -> 
                    redirects back to locora.org/auth?=xxxxxx
                    tells us that they dont have an account w/ that email
            default method? :
                    returns the data of the user
                    tells us that they dont have an account w/ that email
    */
    async function LoginViaPasswordEmail() {

        if (info === "" || passwordInput === "") {
            DisplayFeedback("Please fill out all fields.")
            return
        }

        if (!inputStatus) {
            DisplayFeedback("Please enter a valid email or phone number.")
        }

        const tokenPromise = await getTurnstileToken()

        try {
            const Body = JSON.stringify({
                TurnstileToken: tokenPromise,
                Info: info,
                Password: passwordInput
            })

            const data = await request(`/v1/auth/default/login`, {
                method: "POST",
                body: Body,
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const Results: { success: boolean, message: string, userdata: Record<string, string> } = await data.json()

            console.log(Results)

            if (!Results.success || !Results.userdata || !Results.userdata.idToken) {
                DisplayFeedback(TranslateErrorCode(Results.message) || "An issue occurred...")
            } else {
                DisplayFeedback("You have successfully logged in!")
            }

            window.location.href = `locora://authenticated?idToken=${Results.userdata.idToken}&uid=${Results.userdata.localId}&refreshToken=${Results.userdata.refreshToken}&expiresIn=${Results.userdata.expiresIn}`
        } catch (err) {
            DisplayFeedback("An issue occurred...")
            console.log(err)
        }

    }

    /*
        return cases:
            social connector? :
                goes to oAuth and attempts to sign up
                tells us that the account has already been registered w/ that email
            default? :
                returns the data of the new account
                tells us that the account has already been registered w/ that email
    */
    async function RegisterViaEmailAndPassword() {

        if (info === "" || passwordInput === "" || username == "" || name == "") {
            DisplayFeedback("Please fill out all fields.")
            return
        }

        if (!inputStatus) {
            DisplayFeedback("Please enter a valid email or phone number.")
        }

        const tokenPromise = await getTurnstileToken()

        try {
            const Body = JSON.stringify({
                TurnstileToken: tokenPromise,
                Username: username,
                Name: name,
                Info: info,
                Password: passwordInput
            })

            const data = await request(`/v1/auth/default/register`, {
                method: "POST",
                body: Body,
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const Results: { success: boolean, message: string, userdata: Record<string, string> } = await data.json()

            console.log(Results)

            if (!Results.success || !Results.userdata || !Results.userdata.idToken) {
                DisplayFeedback(TranslateErrorCode(Results.message) || "An issue occurred...")
            } else {
                DisplayFeedback("You have successfully signed up!")
            }  

            window.location.href = `locora://authenticated?idToken=${Results.userdata.idToken}&uid=${Results.userdata.localId}&refreshToken=${Results.userdata.refreshToken}&expiresIn=${Results.userdata.expiresIn}`

        } catch (err) {
            DisplayFeedback("An issue occurred...")
            console.log(err)
        }

    }

    async function RegisterViaSocialConnector(connector: "google" | "microsoft") {

        const Data = request(`/v1/auth/${connector}/register`, {
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
                RenderedCloudflare.current = true
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
                {/* this page should not be indexable */}
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <main>
                <div
                    className="w-screen h-screen flex-col bg-bay-of-many-500 flex items-center justify-center"
                >

                    <img src={Clouds} className="absolute xl:bottom-10 lg:bottom-8 animate-float invert opacity-8 w-full bottom-10" />

                    <div
                        className="border-2 border-bay-of-many-400 bg-clip-padding backdrop-filter backdrop-blur-xl flex-col drop-shadow-2xl rounded-2xl p-10 flex gap-5 items-center justify-center"
                        style={{
                            background: `linear-gradient(to bottom,
                            rgba(0, 50, 230, 0.3),
                            rgba(43, 127, 255, 0.6),
                            rgba(124, 134, 255, 0.2))`
                        }}
                    >
                        {
                            currentPage === "Login" ? (
                                <>
                                    <div
                                        className="flex flex-col gap-4 px-5 mt-2"
                                    >
                                        <h1
                                            className="text-white text-center font-bold text-2xl"
                                        >
                                            Log in
                                        </h1>

                                    </div>

                                    <Divider />

                                    <InputField id="email" fieldLabel="Email" value={info} placeholder="johndoe@gmail.com" inputType="email" middleware={InputLinter} />

                                    <InputField id="password" fieldLabel="Password" value={passwordInput} placeholder="Password" inputType="password" middleware={setPasswordInput} />

                                    <p
                                        className="text-center font-semibold text-balance text-red-600 text-sm mb-[-8px]"
                                        style={{
                                            display: feedback === "" ? "none" : "block"
                                        }}
                                    >
                                        {feedback}
                                    </p>

                                    <div
                                        className="flex flex-col gap-2"
                                    >

                                        <BaseButton text="Continue" type="default" otherProps="flex gap-2" onClick={LoginViaPasswordEmail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </BaseButton>

                                        <div
                                            className="flex p-1 gap-3 justify-between"
                                        >
                                            <a onClick={() => { ChangePage("Register") }} className="text-sm text-white underline hover:text-gray-200 self-start">New? Register now.</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <div
                                        className="flex flex-col gap-4 px-5 mt-2"
                                    >

                                        <h1
                                            className="text-white text-center font-bold text-2xl"
                                        >
                                            Sign up
                                        </h1>

                                        <SocialConnectors
                                            GoogleConnector={() => { RegisterViaSocialConnector("google") }}
                                            MicrosoftConnector={() => { RegisterViaSocialConnector("microsoft") }}
                                        />

                                    </div>

                                    <Divider />

                                    <InputField
                                        id="name"
                                        fieldLabel="Name"
                                        value={name}
                                        placeholder="John Doe"
                                        middleware={setName}
                                    />

                                    <InputField
                                        id="username"
                                        fieldLabel="Username"
                                        value={username}
                                        placeholder="slimeysnufs"
                                        middleware={setUsername}
                                    />

                                    <InputField
                                        id="newAccountEmail"
                                        fieldLabel="Email"
                                        value={info}
                                        placeholder="johndoe@gmail.com"
                                        inputType="email"
                                        middleware={InputLinter}
                                    />

                                    <InputField
                                        id="newAccountPassword"
                                        fieldLabel="Password"
                                        value={passwordInput}
                                        placeholder="Password"
                                        inputType="password"
                                        middleware={setPasswordInput}
                                    />

                                    <p
                                        className="text-center mt-2 font-semibold text-balance text-red-600 text-sm mb-[-8px]"
                                        style={{
                                            display: feedback === "" ? "none" : "block"
                                        }}
                                    >
                                        {feedback}
                                    </p>

                                    <div
                                        className="flex flex-col mt-5"
                                    >
                                        <BaseButton text="Register" type="default" otherProps="flex gap-2" onClick={RegisterViaEmailAndPassword}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clipRule="evenodd" />
                                            </svg>
                                        </BaseButton>

                                        <div
                                            className="mt-2"
                                        >
                                            <a onClick={() => { ChangePage("Login") }} className="text-sm text-white underline hover:text-gray-200 self-start">Already Registered? Log in.</a>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {/* turnstile div, dont delete please */}
                        <div id="turnstile-container" className="w-full" />
                    </div>

                    <div
                        className="flex flex-col items-center mt-4"
                    >
                        <img src={LocoraIcon} className="h-5 w-5" />
                        <p className="text-xs text-white mt-2">By continuing, you agree to Locora's Terms of Service and Privacy Policy.</p>
                    </div>

                </div>
            </main >

        </>
    )
}

export default AuthenticationPage