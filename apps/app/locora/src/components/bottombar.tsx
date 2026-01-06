import { useCallback, useState } from "react";
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

    const ProfileActivated = useCallback(() => {
        toggleExpansion(false)
        profileActivate?.()
    },[toggleExpansion,profileActivate])

    const HomeActivated = useCallback(() => {
        toggleExpansion(false)
        homeActivated?.()
    },[toggleExpansion,homeActivated])

    const BookmarkActivated = useCallback(() => {
        toggleExpansion(false)
        bookmarkActivate?.()
    },[toggleExpansion,bookmarkActivate])

    const ExploreActivated = useCallback(() => {
        toggleExpansion(false)
        exploreActivate?.()
    },[toggleExpansion,exploreActivate])


    const ToggleProfileVisibility = useCallback(() => {
        toggleExpansion(!expanded)
    },[toggleExpansion])

    return (
        <>
            <div
                className="flex flex-row w-full h-12 z-25 p-1 gap-2 items-center justify-center"
            >
                <PageSwitch OnHomeActivate={HomeActivated} OnBookmarkActivate={BookmarkActivated} OnExploreActivate={ExploreActivated}/>
                <ProfileOpening IsProfileExpanded={expanded} ToggleProfileExpansion={ToggleProfileVisibility} OnProfilePageActivate={ProfileActivated} />
            </div>
        </>
    )

}