import BaseButton from "./button"
import Google from "../assets/Google.png"
import Microsoft from "../assets/Microsoft.png"

interface props {
    GoogleConnector : () => void
    MicrosoftConnector : () => void
}

export default function SocialConnectors({GoogleConnector, MicrosoftConnector} : props) {
    return (
        <>
            <div
                className="flex p-2 gap-4"
            >
                <div
                    className="flex flex-col gap-3"
                >
                    <BaseButton
                        otherProps="w-full gap-2"
                        type="white" onClick={() => { GoogleConnector }}
                    >
                        <img src={Google} className="h-5 w-5" />
                        <p className="text-black font-semibold">Continue with Google</p>
                    </BaseButton>

                    <BaseButton
                        otherProps="w-full gap-2"
                        type="white" onClick={() => { MicrosoftConnector }}
                    >
                        <img src={Microsoft} className="h-5 w-5" />
                        <p className="text-black font-semibold">Continue with Microsoft</p>
                    </BaseButton>

                </div>

            </div>
        </>
    )
}