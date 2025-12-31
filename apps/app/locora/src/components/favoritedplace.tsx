import { useEffect, useState } from "react"
import { Business_InformationData, GetBusinessInformation } from "../data/business/place/getBusinessInformation"

import TemplateThumbnail from "../assets/placeholder.png"

import BaseCDNUrl from "../utilities/BaseCDNUrl"
import BaseButton from "./button"
import { IsBusinessFavorited } from "../data/user/favorites/getFavorites"
import FilledBookmark from "../assets/FilledBookmark"
import { EmptyBookmark } from "../assets/EmptyBookmark"
import FilledStar from "../assets/FilledStar"

interface props {
    business_id: string
}

export default function FavoritedPlace({ business_id }: props) {

    const [businessData, setBusinessData] = useState<Business_InformationData>()
    const [isBusinessFavorited, setBusinessFavoritedStatus] = useState<boolean>(false)

    useEffect(() => {

        async function GetBusinessInfo() {
            const businessInfo: Business_InformationData | null = await GetBusinessInformation(business_id)

            if (!businessInfo) {
                throw new Error("Issue when fetching the business data!")
            }

            setBusinessData(businessInfo)
        }

        async function GetBusinessFavoritedStatus() {

            const isFavorited = await IsBusinessFavorited(business_id)

            console.log(isFavorited+"is the status of the place with id " + business_id)

            setBusinessFavoritedStatus(isFavorited == true ? true : false)

        }

        async function RunAll() {
            await Promise.all([GetBusinessInfo(), GetBusinessFavoritedStatus()])
        }

        RunAll()

    }, [business_id])

    return (
        <>
            <div
                className="flex flex-col bg-gradient-to-b p-5 min-h-[10vh] from-bay-of-many-600 to-bay-of-many-800 rounded-2xl"
            >

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

                <img src={businessData?.thumbnail ? businessData.thumbnail.trim()
                    .replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : TemplateThumbnail} className="rounded-lg px-10 pt-3" />

                <div
                    className="flex flex-col items-center pt-5 gap-2 align-bottom"
                >
                    <div
                        className="flex flex-row gap-2"
                    >
                        <BaseButton>
                            {
                                isBusinessFavorited === true ? (
                                    <FilledBookmark />
                                ) : (
                                    <EmptyBookmark />
                                )
                            }
                        </BaseButton>

                        <BaseButton>
                            {
                                <FilledStar color={"white"} />
                            }
                        </BaseButton>
                    </div>

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