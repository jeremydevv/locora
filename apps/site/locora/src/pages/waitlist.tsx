import BaseInput from "../components/baseinput"
import Footer from "../components/footer"
import cloud from "../assets/Clouds3.png"

function WaitlistPage() {
    return (
        <>

            <img className="absolute min-w-screen xl:top-25 lg:top-20 md:top-15 sm:top-20" src={cloud} />
            
            <div 
                className="flex min-h-screen bg-bay-of-many-50 items-center justify-center"
            >

                {/* main container */}
                <div>
                    <h1
                        className="font-black font-black inline-block text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-bay-of-many-500 text-7xl"
                    >
                        Waitlist
                    </h1>
                    <p>
                        
                    </p>
                    <BaseInput placeholder="Email or Phone Number" />
                </div>

            </div>

            <Footer />

        </>
    )
}

export default WaitlistPage