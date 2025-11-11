import Template from "../assets/pfptemp.png"
import BaseButton from "../components/button";

import Clouds from "../assets/Clouds3.png"

function ProfileElement() {
    return (
        <div
            className="relative flex flex-col bg-bay-of-many-500 gap-3 pb-5 items-center w-[135vh] min-h-screen h-fit"
        >

            {/* top side with banner + profile picture */}
            <div
                className="flex flex-col gap-4 items-center z-10 pr-[38vw] pt-[30vh] justify-center w-full h-[25vh] bg-bay-of-many-600/40"
            >

                <div
                    className="flex w-[35vh] h-[35vh] rounded-full p-1 bg-white/30 border-2 border-white/50"
                >
                    <img src={Template} className="w-full h-full rounded-full" />
                </div>

            </div>

            {/* under pictures, user info (name + handle + social media + bio) */}
            <div
                className="flex flex-col ml-[23vw] z-10 gap-4 p-10 text-white"
            >

                <div
                    className="flex flex-row gap-2 justify-end"
                >
                    <BaseButton
                        type="white"
                        otherProps="flex aspect-square"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-5">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </BaseButton>

                    <BaseButton
                        type="white"
                        otherProps="flex aspect-square"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
                        </svg>
                    </BaseButton>

                </div>

                <div
                    className="flex flex-col z-10 gap-2"
                >
                    <h1
                        className="text-6xl font-bold"
                    >
                        Jeremy Mathew
                    </h1>

                    <h2
                        className="text-2xl font-semibold text-white/70"
                    >
                        @jeremymathew
                    </h2>

                    <p
                        className="text-white/70"
                    >
                        Bio: Software developer. Music lover. Tech enthusiast. Always exploring new horizons and pushing boundaries.
                    </p>
                </div>

            </div>

            <div
                className="flex p-3 gap-3 bg-bay-of-many-600 z-1 rounded-xl"
            >
                <BaseButton
                    text="Reviews"
                    preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 pr-2">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                        </svg>
                    }
                />

                <BaseButton
                    text="Favorites"
                    type="black"
                    preChildren={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 pr-2">
                            <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                        </svg>

                    }
                />
            </div>

            <div
                className="flex flex-col bg-bay-of-many-400 w-[95%] rounded-3xl px-5 pt-5 min-h-[120vh]"
            >

            </div>

        </div>
    )
}

function NotLoggedInElement() {

    function OpenAuthPopup() {
        window.electronAPI?.openAuthenticationWindow()
    }

    return (
        <div
            className="h-full w-full px-[30vw] py-[30vh]"
        >
            <div
                className="flex flex-col bg-bay-of-many-500 justify-between gap-5 p-15 drop-shadow-2xl rounded-3xl w-full h-full z-2"
            >
                <div
                    className="flex gap-3"
                >
                    <h1
                        className="text-white text-5xl font-bold"
                    >
                        You are currently not logged in.
                    </h1>
                    <p
                        className="text-white text-xl font-semibold"
                    >
                        To use the features such as marking favorites, reviewing, gaining currency, and other personalized features, you must log in with locora.org. 
                    </p>

                </div>

                <ruby
                    className="text-white text-xs text-center align-bottom"
                >
                        By pressing the continue with locora button, you will log in with your existing account or register.
                </ruby>

                <BaseButton text="Continue with Locora" type="black" otherProps="flex gap-3" onClick={OpenAuthPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" />
                    </svg>

                </BaseButton>
            </div>
        </div>
    )
}

export default function Profile() {

    const UserToken = window.electronAPI?.fetchSessionToken("currentUser");

    console.log("opened profile")

    console.log(UserToken)

    return (
        <>
            <div
                className="w-full min-h-screen flex justify-center overflow-x-hidden"
            >

                <img src={Clouds} className="absolute top-0 left-0 opacity-5 w-full z-0 animate-float select:none" />

                {UserToken !== null ? <NotLoggedInElement /> : <ProfileElement />}

            </div>
        </>
    )

}