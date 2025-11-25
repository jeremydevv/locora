import Template from "../assets/pfptemp.png"

interface BannerProps {
    OnProfilePageActivate: () => void,
    isExpanded: boolean
}

function ProfileExpansionBanner({ OnProfilePageActivate, isExpanded }: BannerProps) {

    return (
        <>
            <div
                className={`fixed flex bottom-6 flex-col left-[55vw] gap-2 bg-clip-padding backdrop-filter backdrop-blur-xl transform-all origin-bottom transition-transform duration-200 ease-in-out border-2 border-bay-of-many-600 z-0 h-38 w-12 p-1 items-center justify-center select-none rounded-full overflow-hidden mt-2`}
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
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>

                </div>

                <div
                    className="flex transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
                    </svg>

                </div>

                <div
                    className="flex transform-all invert transition-transform duration-100 hover:scale-115 active:scale-85"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
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
    OnProfilePageActivate : () => void
    ToggleProfileExpansion?: () => void,
    IsProfileExpanded : boolean
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
                    className="flex z-25 items-center justify-between overflow-hidden w-10 h-10 rounded-full"
                >
                    <img src={Template} className="w-full h-full" />
                </div>

            </div>
        </div>
    )

}