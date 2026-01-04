import { useEffect, useState } from "react"
import { GetBusinessInformation } from "../data/business/place/getBusinessInformation"
import TemplateThumbnail from "../assets/placeholder.png"
import BaseCDNUrl from "../utilities/BaseCDNUrl"
import { BusinessPayload } from "../pages/BusinessPage/BusinessStore"
import { ChangePage } from "../App"

interface props {
    business_id: string
    SwitchPage: ChangePage
}

export default function FavoritedPlace({ business_id, SwitchPage }: props) {

    const [businessData, setBusinessData] = useState<BusinessPayload>()

    useEffect(() => {

        async function GetBusinessInfo() {
            const businessInfo: BusinessPayload | null = await GetBusinessInformation(business_id)

            if (!businessInfo) {
                throw new Error("Issue when fetching the business data!")
            }

            setBusinessData(businessInfo)
        }

        async function RunAll() {
            await Promise.all([GetBusinessInfo()])
        }

        RunAll()

    }, [business_id])

    async function ViewMoreDetails() {

        const businessData = await GetBusinessInformation(business_id)

        if (!businessData) {
            return
        }

        console.log(businessData.thumbnail)

        SwitchPage(5, {
            data: businessData
        })

    }

    return (
        <>
            <div
                className="flex flex-col transition-transform active:scale-98 hover:scale-102 bg-linear-to-b justify-between p-5 min-h-[10vh] from-bay-of-many-600 to-bay-of-many-800 rounded-2xl"
                onClick={() => {
                    ViewMoreDetails()
                }}
            >

                <div>
                    <h1
                        className="font-bold text-xl text-white"
                    >
                        {businessData?.name || "No business data found!"}
                    </h1>

                    <h2
                        className="font-semibold text-sm text-white/30"
                    >
                        {businessData?.address}
                    </h2>
                </div>

                <img src={businessData?.thumbnail ? businessData.thumbnail.trim()
                    .replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : TemplateThumbnail} className="rounded-lg px-10 pt-3" />

                <div
                    className="flex flex-col items-center pt-5 gap-2 align-bottom"
                >
                    <p
                        className="text-xs text-white/50"
                    >
                        Click to see more details
                    </p>
                </div>

            </div>
        </>
    )

}