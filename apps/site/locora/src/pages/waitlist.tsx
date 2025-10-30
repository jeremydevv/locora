import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"
import TopBar from "../components/topbar"
import { useEffect, useState } from "react"
import { isValidEmail, standardizePhoneNumber } from "../utilities/infoValidators"
import { isNumericalString } from "framer-motion"
import request from "../utilities/request"

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

async function RequestWaitlistAdd(widgetId?: string) {

    try {
        // @ts-ignore
        if (widgetId && window.turnstile) window.turnstile.reset()

        const CurrentEmailInput = document.getElementById("waitlist-email") as HTMLInputElement

        if (CurrentEmailInput.value === "") return { success: false, message: "Please enter an email or phone number." }

        const standardizedNum = standardizePhoneNumber(CurrentEmailInput.value)
        const validEmail = isValidEmail(CurrentEmailInput.value)

        if (!(validEmail) && !(standardizedNum)) {
            return { success: false, message: "Please enter a valid email or phone number." }
        }

        const token = await new Promise<string>((resolve, reject) => {
            // @ts-ignore
            window.turnstile.execute('#turnstile-container', {
                callback: (t: string) => resolve(t),
                'error-callback': () => reject(new Error('Turnstile execution failed')),
            });
        });

        const response = await request(`/v1/waitlist/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    info: CurrentEmailInput.value,
                    turnstile_token: token,
                }),
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        console.log(error)
        return false
    }
}

function WaitlistPage() {

    localStorage.clear()

    const [isProcessing , setIsProcessing] = useState(false)
    const [issueOccuring , setIssueOccuring] = useState(false)
    const [InfoInput , setInfoInput] = useState("")

    const [InputStatus , setInputStatus] = useState(true)

    const [feedback, setFeedback] = useState<string>("")

    const [widgetId, setWidgetId] = useState<string>("")

    // Cloudflare Verifications
    useEffect(() => {
        // @ts-ignore
        if (window.turnstile) {
            // @ts-ignore
            const id = window.turnstile.render('#turnstile-container', {
                sitekey: TURNSTILE_SITE_KEY,
                size: "compact",
            });

            setWidgetId(id)
        }
    }, []);

    function displayFeedback(feedback : string) {
        setIssueOccuring(true)
        setFeedback(feedback)
        setTimeout(() => {
            setIssueOccuring(false)
        }, 5000);
    }

    function InputLinter(value : string) {
        setInfoInput(value)

        if (isNumericalString(value.substring(0, 1))) {
            setInfoInput(standardizePhoneNumber(value)! || value)
        }

        if (value == "" || value == null || value == undefined) {
            setInputStatus(true)
            return
        }

        if (isValidEmail(value) || standardizePhoneNumber(value)) {
            setInputStatus(true)
        } else {
            setInputStatus(false)
        }
    }

    async function ProcessWaitlist() {

        setIsProcessing(true)

        if (localStorage.getItem("waitlist_joined") === "true") {
            setIsProcessing(false)
            displayFeedback("You have already joined the waitlist!")
            setInfoInput("")
            return;
        }

        try {
            const result = await RequestWaitlistAdd(widgetId)
            
            if (result && result.success) {
                displayFeedback("Info was added to waitlist!")
                localStorage.setItem("waitlist_joined", "true");
            } else if (result && !result.success) {
                displayFeedback(result.message)
                localStorage.setItem("waitlist_joined", "true");
            } else {
                displayFeedback("Something went wrong, please try again.")
            }
        } finally {
            setInfoInput("")
            setIsProcessing(false)
        }
    }

    return (
        <>

            <TopBar PageType="waitlist" />

            <img className="absolute w-screen animate-float z-0 xl:top-25 lg:top-20 md:top-15 sm:top-20" src={cloud} />

            <div
                className="flex min-h-screen items-center justify-center"
            >

                {/* main container */}
                <div
                    className="flex flex-col gap-20 p-5"
                >
                    <div
                        className="text-center flex flex-col gap-10 items-center justify-center"
                    >
                        <h1
                            className="font-black inline-block text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-bay-of-many-500 text-7xl"
                        >
                            Waitlist
                        </h1>
                        <p
                            className="text-center text-xl font-bold max-w-xl text-bay-of-many-800"
                        >
                            Get notifications on the development of the program and receive a reward for waitlisting early.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center">

                        <div className="flex flex-col gap-3 items-center justify-center">
                            <p
                                className="text-left"
                            >Email or Phone Number</p>
                            <BaseInput id="waitlist-email" borderType={InputStatus ? "Normal" : "Red"} OnChange={(e) => { InputLinter(e.target.value) }} input={InfoInput} placeholder="johndoe@gmail.com" inputType="email" />
                            <BaseButton CurrentlyYielding={isProcessing} text="Join Waitlist" onClick={() => {ProcessWaitlist()}} />
                            {issueOccuring && <p className="text-red-500 text-bold text-center z-3">{feedback}</p>}
                        </div>
                        
                        <div
                            id="turnstile-container"
                            className="hidden"
                            data-sitekey={TURNSTILE_SITE_KEY}
                            data-callback="onTurnstileSuccess"
                            data-size="invisible"
                        ></div>

                    </div>
                </div>

            </div>

            <Footer PageType="waitlist" />

        </>
    )
}

export default WaitlistPage