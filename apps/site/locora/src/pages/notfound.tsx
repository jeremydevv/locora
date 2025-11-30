import Cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button"

export default function NotFound() {
    return (
        <div
            className="flex flex-col bg-bay-of-many-500 items-center justify-center w-full h-screen overflow-hidden"
        >
            <img src={Cloud} alt="Cloud" className="w-full h-full absolute invert opacity-10 animate-float" />

            <h1
                className="text-7xl font-black text-white mb-4"
            >404 - Not Found</h1>
            <p className="text-lg text-white">The page you are looking for does not exist.</p>

            <BaseButton
                otherProps="m-5 "
                onClick={() => {
                    // redirect to locora.org
                    window.location.href = "/";
                }}
            >Go to Homepage</BaseButton>
        </div>
    )
}