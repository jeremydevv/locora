import { useEffect, useState } from "react"
import { GetBusinessInformation } from "../data/business/place/getBusinessInformation"

import TemplateThumbnail from "../assets/placeholder.png"

import BaseCDNUrl from "../utilities/BaseCDNUrl"
import BaseButton from "./button"
import { IsBusinessFavorited } from "../data/user/favorites/getFavorites"
import FilledBookmark from "../assets/FilledBookmark"
import { EmptyBookmark } from "../assets/EmptyBookmark"
import FilledStar from "../assets/FilledStar"
import usePageSwitch from "../hooks/usePageSwitch"
import { BusinessPayload, getBusinessData } from "../pages/BusinessPage/BusinessStore"
import { ChangePage } from "../App"

interface props {
    business_id: string
    SwitchPage: ChangePage
}

export default function FavoritedPlace({ business_id, SwitchPage }: props) {

    const [businessData, setBusinessData] = useState<BusinessPayload>()
    const [isBusinessFavorited, setBusinessFavoritedStatus] = useState<boolean>(false)

    useEffect(() => {

        async function GetBusinessInfo() {
            const businessInfo: BusinessPayload | null = await GetBusinessInformation(business_id)

            if (!businessInfo) {
                throw new Error("Issue when fetching the business data!")
            }

            setBusinessData(businessInfo)
        }

        async function GetBusinessFavoritedStatus() {

            const isFavorited = await IsBusinessFavorited(business_id)

            setBusinessFavoritedStatus(isFavorited == true ? true : false)

        }

        async function RunAll() {
            await Promise.all([GetBusinessInfo(), GetBusinessFavoritedStatus()])
        }

        RunAll()

    }, [business_id])

    async function ViewMoreDetails() {

        console.log(SwitchPage)

        const businessData = await GetBusinessInformation(business_id)

        if (!businessData) {
            return
        }

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
                        className="font-black text-xl text-white"
                    >
                        {businessData?.name || "No business data found!"}
                    </h1>

                    <h2
                        className="font-bold text-sm text-white/30"
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