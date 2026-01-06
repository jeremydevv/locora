import { useCallback, useEffect, useState } from "react"
import { BusinessPayload } from "../pages/BusinessPage/BusinessStore"
import { GetBusinessInformation } from "../data/business/place/getBusinessInformation"
import BaseCDNUrl from "../utilities/BaseCDNUrl"
import { ChangePage } from "../App"
import { PushRecentlyViewed } from "../pages/BusinessPage/ViewStore"
import RatingBar from "./ratingbar"

export default function BusinessEmbed({business_id, ShowRating, SwitchPage} : {business_id : string, ShowRating? : boolean, SwitchPage : ChangePage}) {

    const [businessData, setBusinessData] = useState<BusinessPayload | null>(null)

    useEffect(() => {

        async function GetBizInfo() {

            const businessData = await GetBusinessInformation(business_id)

            if (!businessData) {
                throw new Error("Could not get business data!")
            }

            setBusinessData(businessData)

        }

        async function DoAll() {
            await Promise.all([
                GetBizInfo()
            ])
        }

        DoAll()

    },[business_id])

    const GetThumbnailURL = useCallback(() => {
        
        if (!businessData || !businessData?.thumbnail) {
            return
        }

        return businessData?.thumbnail ? businessData.thumbnail.trim().replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : ""

    },[businessData?.thumbnail])

    const ViewMoreDetails = useCallback(async () => {

        const businessData = await GetBusinessInformation(business_id)

        if (!businessData) {
            return
        }

        PushRecentlyViewed(business_id)

        SwitchPage(5, {
            data: businessData
        })
        
    },[business_id,businessData])

    const thumbnailUrl = GetThumbnailURL()

    return (
        <div
            className="w-80 min-w-80 max-w-80 aspect-[4/3] rounded-3xl overflow-hidden bg-bay-of-many-950 bg-cover bg-center active:scale-97 hover:scale-103 transition-transform flex-shrink-0"
            style={thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined}
            aria-label={businessData?.name ? `${businessData.name} thumbnail` : "Business thumbnail"}
            onClick={() => {
                ViewMoreDetails()
            }}
        >
            
            <div
                className="w-full h-full bg-linear-to-t from-bay-of-many-950 via-bay-of-many-950/5 to-bay-of-many-950/1 translate-y-5 flex flex-col p-3"
            >
                <h1
                    className="text-lg font-bold text-white pt-38"
                >
                    {businessData?.name}
                </h1>
                {
                    ShowRating === true ? (
                        <RatingBar style={"white"} rating={businessData?.rating?.average as number} />
                    ) : (
                        <>
                        </>
                    )

                }
                <h1
                    className="text-xs font-bold text-white/50"
                >
                    {businessData?.address}
                </h1>
            </div>

        </div>
    )

}
