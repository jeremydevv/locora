import { ChangePage } from "../App"
import { GetBusinessInformation } from "../data/business/place/getBusinessInformation"
import { UserRating } from "../data/user/ratings/getUserRatings"
import BaseCDNUrl from "../utilities/BaseCDNUrl"
import RatingBar from "./ratingbar"

interface props {
    data: UserRating
    SwitchPage : ChangePage
}

export default function RatedPlace({ data, SwitchPage }: props) {

    const baseThumbnailURL = `https://cdn.locora.org/business_images/business_images/storefront_${data.fields.business_id.stringValue}.jpg`

    async function ViewMoreDetails() {

        const businessData = await GetBusinessInformation(data.fields.business_id.stringValue)

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
                className="flex flex-col transition-transform active:scale-98 hover:scale-102 bg-linear-to-b p-5 min-h-[8vh] from-bay-of-many-600 to-bay-of-many-800 rounded-2xl text-center items-center"
                onClick={() => {
                    ViewMoreDetails()
                }}
            >

                <img src={baseThumbnailURL.replace("https://cdn.locora.org/business_images", BaseCDNUrl())} className="rounded-lg px-10 pt-3" />

                {
                    data.fields.header.stringValue !== "" ? (
                        <h1
                            className="text-2xl text-white text-bold"
                        >
                            {data.fields.header.stringValue}
                        </h1>
                    ) : (
                        <h1
                            className="text-2xl text-white text-bold"
                        >
                            No header provided!
                        </h1>
                    )
                }

                {
                    data.fields.text.stringValue !== "" ? (
                        <h1
                            className="text-2xl text-white text-bold"
                        >
                            {data.fields.text.stringValue}
                        </h1>
                    ) : (
                        <h1
                            className="text-xl text-white text-bold"
                        >
                            No text provided!
                        </h1>
                    )
                }

                <div
                    className="flex flex-row gap-2 p-2"
                >
                    <p
                        className="text-white font-extrabold"
                    >
                        {data.fields.rating.integerValue}/5
                    </p>
                    <RatingBar style={"white"} rating={+data.fields.rating.integerValue} />
                </div>

                <p
                    className="text-white/50 text-xs pt-5"
                >
                    Click to view more!
                </p>

            </div>
        </>
    )
}