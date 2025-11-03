import PageSwitch from "./pageswitch";
import ProfileOpening from "./profileopening";

export default function BottomBar() {

    return (
        <>
            <div
                className="absolute flex w-full h-12 z-25 bottom-5 p-1 gap-2 items-center justify-center"
            >
                <PageSwitch />
                <ProfileOpening />
            </div>
        </>
    )

}