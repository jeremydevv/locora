import { BusinessPayload } from "./BusinessStore"
import TemplateThumbnail from "../../assets/placeholder.png"
import BaseCDNUrl from "../../utilities/BaseCDNUrl"
import RatingBar from "../../components/ratingbar"
import BaseButton from "../../components/button"
import FavoriteImage from "../../assets/Bookmark.png"
import { useState } from "react"
import FilledStar from "../../assets/FilledStar"
import request from "../../utilities/fetch"
import { GetIdToken } from "../../data/AuthStore"

interface props {
    businessData: BusinessPayload | null
}

let locallyFavorited : Record<string, boolean> = {}

export default function BusinessPage({ businessData }: props) {

    if (!businessData) {
        return (
            <>
                <div
                    className="flex flex-col items-center justify-center w-full h-full"
                >
                    <h1
                        className="font-bold text-white text-2xl"
                    >
                        No business data found.
                    </h1>
                    <h2>
                        Please select a business from the home page.
                    </h2>
                </div>
            </>
        )
    }

    const [isRatingOpened, setRatingOpened] = useState<boolean>(false)

    async function HandleFavorite() {
        if(!businessData) {
            return
        }

        if(!businessData.id) {
            return
        }

        if(locallyFavorited[businessData.id]) {
            delete locallyFavorited[businessData.id]
        } else {
            locallyFavorited[businessData.id] = true
        }

        try {

            const Results = await request(`/v1/users/favorites/modifyfavorite?id=${businessData.id}`, {
                headers: {
                    "Authorization" : await GetIdToken() || ""
                },
                method : "POST"
            })

            const data = await Results.json()

            console.log(data)

        } catch(err) {
            console.error(err)
        }
    }

    const imageDir = businessData.thumbnail ? businessData.thumbnail.trim()
        .replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : TemplateThumbnail

    return (
        <>
            <div
                className="flex flex-col items-center justify-center w-screen h-full overflow-x-hidden"
            >
                <div
                    className="flex flex-col gap-10 w-full min-h-full p-[15vw] overflow-x-hidden"
                >

                    <div
                        className="flex flex-row gap-2"
                    >
                        <div
                            className="flex flex-row bg-bay-of-many-700 p-5 rounded-2xl justify-between"
                        >
                            <div
                                className="flex flex-col justify-between gap-2"
                            >
                                <div
                                    className="flex flex-col"
                                >
                                    <h1
                                        className="text-3xl text-white font-bold text-left"
                                    >
                                        {businessData.name}
                                    </h1>
                                    <h2
                                        className="text-xl text-white/80 font-bold text-left"
                                    >
                                        {businessData.address}
                                    </h2>
                                    <div
                                        className="flex flex-row gap-2"
                                    >
                                        <RatingBar style="white" rating={businessData.rating.average} />

                                        <p
                                            className="font-bold text-white"
                                        >
                                            {businessData.rating.average}/5
                                        </p>
                                    </div>

                                    <a 
                                        href={businessData.website || "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="pt-[10vh]"
                                    >
                                        <p
                                            className="text-white/80"
                                        >
                                            {businessData.name}'s website
                                        </p>
                                    </a>

                                    <p
                                        className="text-white"
                                    >
                                        Contact Number: {businessData.contact.phone}
                                    </p>

                                </div>

                                {/*action bar*/}
                                <div
                                    className="flex flex-row gap-2 justify-center items-center"
                                >
                                    <BaseButton onClick={() => {
                                        setRatingOpened(!isRatingOpened)
                                    }} preChildren={
                                        <FilledStar color={"white"}/>
                                    } />
                                    <BaseButton onClick={() => {
                                        HandleFavorite()
                                    }} preChildren={
                                        <img src={FavoriteImage} className="w-6 invert p-0.5" />
                                    } />
                                </div>
                            </div>

                            <img className="p-2 w-[35vw] rounded-2xl" src={imageDir} />

                        </div>

                    </div>

                    <div
                        className="flex flex-col gap-2 p-[15w] p-5 rounded-2xl min-h-1/2 bg-bay-of-many-700"
                    >
                        <div
                            className="flex flex-row items-center"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-12">
                                    <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            <h1
                                className="font-bold text-white text-5xl pb-10"
                            >
                                Reviews
                            </h1>
                        </div>

                        <div
                            className="bg-bay-of-many-500 "
                        >
                            <div>
                                Review
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}