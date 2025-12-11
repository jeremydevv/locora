import RatingBar from "../ratingbar";
import TemplateThumbnail from "../../assets/placeholder.png"
import { useState } from "react";
import { BusinessPayload } from "../../pages/BusinessPage/BusinessStore";
import BaseCDNUrl from "../../utilities/BaseCDNUrl";

interface props {
    data: string
}

export default function SearchResultBox({ data }: props) {

    const businessData: BusinessPayload = JSON.parse(data)

    const imageDir = businessData.thumbnail ? businessData.thumbnail.trim()
        .replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : TemplateThumbnail

    return (
        <>
            <div
                className="flex flex-row shadow-amber-50/5 shadow-lg bg-bay-of-many-700 gap-3 w-full p-2 rounded-xl active:scale-97 hover:scale-103 transform transition-all"
            >
                <div className="flex flex-col flex-1 min-w-0">

                    <div
                        className="max-w-[20vw]"
                    >
                        <div
                            className="flex flex-col gap-1"
                        >
                            <p
                                className="text-white font-bold font-md"
                            >
                                {businessData.name}
                            </p>
                            <p
                                className="text-white/80 font-semibold text-sm"
                            >
                                {businessData.address}
                            </p>
                        </div>

                        <div
                            className="flex flex-row gap-2 pt-4"
                        >
                            <RatingBar style="white" rating={businessData.rating.average} />
                            <p
                                className="text-white font-semibold"
                            >
                                ({businessData.rating.average.toFixed(1)}/5)
                            </p>
                        </div>
                        <p
                            className="text-white/80 text-xs pt-2"
                        >
                            Click to view more details
                        </p>
                    </div>

                </div>

                <img src={imageDir} className="w-[10vw] h-[10vw] rounded-xl object-cover" />
            </div>
        </>
    )
}