import { useState } from "react";
import PageSwitch from "./pageswitch";
import ProfileOpening from "./profileopening";

interface props {
    homeActivated ?: () => void,
    exploreActivate ?: () => void,
    bookmarkActivate ?: () => void,
    profileActivate ?: () => void,
}

export default function BottomBar({homeActivated, exploreActivate, bookmarkActivate, profileActivate} : props) {

    const [expanded, toggleExpansion] = useState<boolean>(false)

    const ProfileActivated = () => {
        toggleExpansion(false)
        profileActivate?.()
    }

    const HomeActivated = () => {
        toggleExpansion(false)
        homeActivated?.()
    }

    const BookmarkActivated = () => {
        toggleExpansion(false)
        bookmarkActivate?.()
    }

    const ExploreActivated = () => {
        toggleExpansion(false)
        exploreActivate?.()
    }


    const ToggleProfileVisibility = () => {
        toggleExpansion(!expanded)
    }

    return (
        <>
            <div
                className="absolute flex flex-col w-full h-12 z-25 bottom-5 p-1 gap-2 items-center justify-center"
            >
                <PageSwitch OnHomeActivate={HomeActivated} OnBookmarkActivate={BookmarkActivated} OnExploreActivate={ExploreActivated}/>
                <ProfileOpening IsProfileExpanded={expanded} ToggleProfileExpansion={ToggleProfileVisibility} OnProfilePageActivate={ProfileActivated} />
            </div>
        </>
    )

}