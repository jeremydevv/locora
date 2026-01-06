import Template from "../assets/pfptemp.png"

interface BannerProps {
    OnProfilePageActivate: () => void,
    isExpanded: boolean
}

function ProfileExpansionBanner({ OnProfilePageActivate, isExpanded }: BannerProps) {

    return (
        <>
            <div
                className={`fixed flex bottom-6 flex-col left-[55vw] gap-2 bg-clip-padding backdrop-filter backdrop-blur-xl transform-all origin-bottom transition-transform duration-200 ease-in-out border-2 border-bay-of-many-600 z-0 h-22 w-12 p-1 items-center justify-center select-none rounded-full overflow-hidden mt-2`}
                style={{
                    scale: isExpanded ? "1" : "0",
                    background: `linear-gradient(to bottom,rgba(0, 66, 244, 0.7),rgba(43, 127, 255, 0.7),rgba(124, 134, 255, 0.7)`,
                }}
            >

                <div
                    className="flex transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"
                    onClick={OnProfilePageActivate}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>

                </div>

                <div
                    className="flex transform-all w-6 h-6 invert transition-transform duration-100 hover:scale-115 active:scale-85"
                >

                </div>

            </div>
        </>
    )
}

interface props {
    OnProfilePageActivate: () => void
    ToggleProfileExpansion?: () => void,
    IsProfileExpanded: boolean
}

export default function ProfileOpening({ IsProfileExpanded, ToggleProfileExpansion, OnProfilePageActivate }: props) {

    return (
        <div
            className="flex-row"
        >
            <ProfileExpansionBanner isExpanded={IsProfileExpanded} OnProfilePageActivate={OnProfilePageActivate} />

            <div
                className="fixed flex bottom-5 left-[55vw] z-5 hover:scale-105 active:scale-92 bg-clip-padding backdrop-filter backdrop-blur-xl transform-all transition-transform duration-50 select-none w-12 h-12 bg-bay-of-many-800 shadow-2xl border-2 border-bay-of-many-600 rounded-full items-center justify-center"
                style={{
                    background: `linear-gradient(to bottom,rgba(0, 66, 244, 0.7),rgba(43, 127, 255, 0.7),rgba(124, 134, 255, 0.7)`,
                }}
            >

                {/*this holds all of the section buttons */}

                <div
                    onClick={ToggleProfileExpansion}
                    className="flex z-25 items-center justify-center overflow-hidden w-10 h-10 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-8">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>

                </div>

            </div>
        </div>
    )

}