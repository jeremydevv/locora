import PageSwitch from "./pageswitch";
import ProfileOpening from "./profileopening";

interface props {
    homeActivated ?: () => void,
    exploreActivate ?: () => void,
    bookmarkActivate ?: () => void,
}

export default function BottomBar({homeActivated, exploreActivate, bookmarkActivate} : props) {

    return (
        <>
            <div
                className="absolute flex w-full h-12 z-25 bottom-5 p-1 gap-2 items-center justify-center"
            >
                <PageSwitch OnHomeActivate={homeActivated} OnBookmarkActivate={bookmarkActivate} OnExploreActivate={exploreActivate}/>
                <ProfileOpening />
            </div>
        </>
    )

}