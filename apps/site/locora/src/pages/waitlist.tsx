import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"

const API_URL = import.meta.env.VITE_API_URL

async function TestAPI() {
    const data = await fetch(`${API_URL}/test`)
    const body = await data.json()
    console.log(body.message)
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
                            <BaseInput placeholder="johndoe@gmail.com" />
                        </div>

                        <BaseButton text="Join Waitlist" onClick={TestAPI} />
                    </div>
                </div>

            </div>

            <Footer />

        </>
    )
}

export default WaitlistPage