import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"
import TopBar from "../components/topbar"
import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function RequestWaitlistAdd() {
    try {
        
        // @ts-ignore
        window.turnstile.reset();

        const CurrentEmailInput = document.getElementById("waitlist-email") as HTMLInputElement

        if (CurrentEmailInput.value === "") return { success: false, message: "Please enter an email." }
        if (!(isValidEmail(CurrentEmailInput.value))) return { success: false, message: "Please enter a valid email." }

        const token = await new Promise<string>((resolve, reject) => {
            // @ts-ignore
            window.turnstile.execute('#turnstile-container', {
                callback: (t: string) => resolve(t),
                'error-callback': () => reject(new Error('Turnstile execution failed')),
            });
        });

        const response = await fetch(`${API_URL}/v1/waitlist/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": CurrentEmailInput.value,
                "turnstile_token": token
            }),
        })

        const data = await response.json()

        return data

    } catch (error) {
        console.log(error)
        return false
    }
}

function WaitlistPage() {

    const [isProcessing , setIsProcessing] = useState(false)
    const [issueOccuring , setIssueOccuring] = useState(false)
    const [EmailInput , setEmailInput] = useState("")

    const [feedback, setFeedback] = useState<string>("")

    // Cloudflare Verifications
    useEffect(() => {
        // @ts-ignore
        if (window.turnstile) {
            // @ts-ignore
            window.turnstile.render('#turnstile-container', {
                sitekey: TURNSTILE_SITE_KEY,
                size: "compact",
            });
        }
    }, []);

    function displayFeedback(feedback : string) {
        setIssueOccuring(true)
        setFeedback(feedback)
        setTimeout(() => {
            setIssueOccuring(false)
        }, 3000);
    }

    async function ProcessWaitlist() {

        console.log(localStorage.getItem("waitlist_joined"))

        setIsProcessing(true)

        if (localStorage.getItem("waitlist_joined") === "true") {
            setIsProcessing(false)
            displayFeedback("You have already joined the waitlist!")
            setEmailInput("")
            return;
        }

        try {
            const result = await RequestWaitlistAdd()
            
            if (result && result.success) {
                displayFeedback("Email was added to waitlist!")
                const email = document.getElementById("waitlist-email") as HTMLInputElement
                localStorage.setItem("waitlist_email", email.value.toLowerCase());
                localStorage.setItem("waitlist_joined", "true");
            } else if (result && !result.success) {
                displayFeedback(result.message)
                localStorage.setItem("waitlist_joined", "true");
            } else {
                displayFeedback("Something went wrong, please try again.")
            }
        } finally {
            setEmailInput("")
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
                            <BaseInput id="waitlist-email" OnChange={(e) => { setEmailInput(e.target.value) }} input={EmailInput} placeholder="johndoe@gmail.com" inputType="email" />
                            <BaseButton CurrentlyYielding={isProcessing} text="Join Waitlist" onClick={() => {ProcessWaitlist()}} />
                            {issueOccuring && <p className="text-red-500 text-bold text-center z-3">{feedback}</p>}
                        </div>
                        
                        <div
                            id="turnstile-container"
                            className="hidden"
                            data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
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