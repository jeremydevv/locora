import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"
import TopBar from "../components/topbar"
import { useEffect } from "react"
import { tr } from "framer-motion/client"

const API_URL = import.meta.env.VITE_API_URL
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

let IsProcessingRequest = false
async function RequestWaitlistAdd() {
    try {

        IsProcessingRequest = true

        const CurrentEmailInput = document.getElementById("waitlist-email") as HTMLInputElement

        if (CurrentEmailInput.value === "") return
        if (!(isValidEmail(CurrentEmailInput.value))) return

        const token = await new Promise<string>((resolve, reject) => {
            // @ts-ignore
            window.turnstile.reset();
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
        console.log(data)

        IsProcessingRequest = false
    } catch (error) {
        console.log(error)
    }
}

function WaitlistPage() {

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

    return (
        <>

            <TopBar PageType="waitlist" />

            <img className="absolute min-w-screen animate-float z-0 xl:top-25 lg:top-20 md:top-15 sm:top-20" src={cloud} />

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

                        <div>
                            <p
                                className="text-left"
                            >Email or Phone Number</p>
                            <BaseInput id="waitlist-email" placeholder="johndoe@gmail.com" inputType="email" />
                        </div>

                        <BaseButton CurrentlyYielding={IsProcessingRequest} text="Join Waitlist" onClick={RequestWaitlistAdd} />
                        
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