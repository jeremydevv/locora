import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"

const API_URL = import.meta.env.VITE_API_URL

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function RequestWaitlistAdd() {
    try {

        const CurrentEmailInput = document.getElementById("waitlist-email") as HTMLInputElement

        if (CurrentEmailInput.value === "") {
            return
        }

        if (!(isValidEmail(CurrentEmailInput.value))) {
            return
        }

        const response = await fetch(`${API_URL}/v1/waitlist/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": CurrentEmailInput.value
            }),
        })

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

function WaitlistPage() {
    return (
        <>

            <img className="absolute min-w-screen animate-float xl:top-25 lg:top-20 md:top-15 sm:top-20" src={cloud} />

            <div
                className="flex min-h-screen bg-bay-of-many-50 items-center justify-center"
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
                            <BaseInput id="waitlist-email" placeholder="johndoe@gmail.com" inputType="email"/>
                        </div>

                        <BaseButton text="Join Waitlist" onClick={RequestWaitlistAdd} />
                    </div>
                </div>

            </div>

            <Footer />

        </>
    )
}

export default WaitlistPage