import { Helmet } from "react-helmet-async";
import TopBar from "../components/topbar";

import cloud from "../assets/Clouds3.png"
import BaseButton from "../components/button";

import AppleIcon from "../assets/appleicon.svg"
import MicrosoftIcon from "../assets/Microsoft.png"
import baseAPIUrl from "../utilities/BaseURL";
import { useState } from "react";

export default function DownloadPage() {

    const [isDownloading , setDownloading] = useState<boolean>(false)

    async function onDownload(os : string) {

        try {

            if (isDownloading) {
                return
            }

            setDownloading(true)

            const DownloadResult = await fetch(`${baseAPIUrl()}/v1/download?os=${os}`, {
                method : "GET"
            })
            
            if(!DownloadResult.ok) {
                console.log(DownloadResult)
                return
            }

            const blob = await DownloadResult.blob()
            const blobURL = URL.createObjectURL(blob)

            setDownloading(false)

            const x = document.createElement("a")
            x.href = blobURL

            x.download = os === "win" ? "locora-setup.exe" : "locora-mac.dmg"

            document.body.appendChild(x)

            x.click()
            x.remove()

            URL.revokeObjectURL(blobURL)

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <>
            <Helmet>
                <title>Locora | Download</title>
                <meta name="description" content="Download the locora application which will recieve updates." />
                <meta property="og:title" content="Locora" />
                <meta property="og:description" content="Discover and support nearby businesses." />
                <meta property="og:image" content="https://locora.org/LocoraBranding.png" />
                <meta property="og:url" content="https://locora.org" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://locora.org/download" />
            </Helmet>

            <main>
                <TopBar PageType="download" />

                <img className="absolute w-screen animate-float z-0 xl:top-25 lg:top-20 md:top-15 sm:top-20" src={cloud} />

                <div
                    className="flex min-h-screen items-center justify-center"
                >

                    <div
                        className="flex flex-col items-center justify-center px-[18vw] gap-2"
                    >
                        <h1
                            className="bg-clip-text bg-gradient-to-b inline-block text-transparent from-bay-of-many-950 via-blue-800 to-bay-of-many-700 font-black text-8xl text-left justify-end"
                        >Download now.</h1>
                        <p
                            className="text-bay-of-many-800 font-bold text-2xl text-center pb-5"
                        >
                            This application is currently available for Windows and Mac based devices. Please click the corresponding button to recieve the application or installer file.
                        </p>

                        <div
                            className="flex flex-row gap-3"
                        >
                            <BaseButton
                                otherProps="flex gap-2"
                                text="Download for Mac"
                                type="black"
                                CurrentlyYielding={isDownloading}
                                onClick={() => {onDownload("mac")}}
                                preChildren={
                                    <img src={AppleIcon} className="w-5.5 h-6 aspect-square invert p-1" />
                                }
                            />

                            <BaseButton
                                otherProps="flex gap-2 text-black "
                                CurrentlyYielding={isDownloading}
                                text="Download for Microsoft"
                                type="white"
                                onClick={() => {onDownload("win")}}
                                preChildren={
                                    <img src={MicrosoftIcon} className="w-6 h-6 aspect-square p-0.5" />
                                }
                            />

                        </div>

                    </div>

                </div>

            </main>
        </>
    )

}