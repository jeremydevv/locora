import { BusinessPayload } from "./BusinessStore"
import TemplateThumbnail from "../../assets/placeholder.png"
import BaseCDNUrl from "../../utilities/BaseCDNUrl"
import RatingBar from "../../components/ratingbar"
import BaseButton from "../../components/button"
import { useEffect, useState } from "react"
import FilledStar from "../../assets/FilledStar"
import request from "../../utilities/fetch"
import { GetIdToken, GetUid } from "../../data/AuthStore"
import { EmptyBookmark } from "../../assets/EmptyBookmark"
import { IsBusinessFavorited } from "../../data/user/favorites/getFavorites"
import FilledBookmark from "../../assets/FilledBookmark"
import GetBusinessRatings from "../../data/business/ratings/getBusinessRatings"
import Deal from "../../components/deal"
import GetLintedCategory from "../../utilities/GetLintedCategory"

interface props {
    businessData: BusinessPayload | null
}

export interface User_RatingData {
    username?: string,
    uid?: string,
    header: string,
    text: string,
    rating: 1 | 2 | 3 | 4 | 5
}

const locallyFavorited: Record<string, boolean> = {}

export default function BusinessPage({ businessData }: props) {

    const [isRatingOpened, setRatingOpened] = useState<boolean>(false)

    const [ratingInputData, setRatingInputData] = useState<User_RatingData>({
        header: "",
        text: "",
        rating: 1,
    })

    const [uid, setUid] = useState<string | null>(null)

    const [listedRatings, setListedRatings] = useState<Record<string, User_RatingData> | null>(null)

    async function HandleRating() {

        if (!businessData || !businessData.id) {
            return
        }

        if (!ratingInputData.rating) {
            console.log("invalid rating data")
            return
        }

        const cachedRatings = localStorage.getItem("BusinessData-CachedRatings")

        // check if we already rated this place
        if (cachedRatings) {

            const parsedCachedRatings = JSON.parse(cachedRatings)

            if (parsedCachedRatings[businessData.id]) {
                console.log("already rated this, just returning")
                return
            }

        }

        try {

            const Result = await request(`/v1/business/ratings?businessId=${businessData.id}`, {
                method: "POST",
                body: JSON.stringify({
                    header: ratingInputData.header,
                    text: ratingInputData.text,
                    rating: ratingInputData.rating
                }),
                headers: {
                    "Authorization": `Bearer ${await GetIdToken()}`
                }
            })

            const Data = await Result.json()

            if (!Result.ok) {
                console.log("Errored when trying to rate the business", Data)
            }

            console.log(Data)

            setRatingInputData({
                header : "",
                text : "",
                rating : 1
            })

        } catch (err) {
            console.log("Erroring when trying to rate this business", err)
        }

    }

    async function HandleFavorite() {
        if (!businessData || !businessData.id) {
            return
        }

        try {

            const Results = await request(`/v1/users/favorites/modifyfavorite?id=${businessData.id}`, {
                headers: {
                    "Authorization": await GetIdToken() || ""
                },
                method: "POST"
            })

            const data = await Results.json()

            console.log(data)

        } catch (err) {
            console.error(err)
        }

    }

    const imageDir = businessData?.thumbnail ? businessData?.thumbnail.trim()
        .replace("https://cdn.locora.org/business_images", BaseCDNUrl()) : TemplateThumbnail

    const [isBusinessFavorited, setBusinessFavorited] = useState<boolean>(false)

    useEffect(() => {

        async function GetUIDForLocal() {

            const uid = await GetUid()

            if (!uid) {
                return
            }

            if (listedRatings && listedRatings[uid]) {
                setRatingOpened(false)
            }

            setUid(uid)

        }

        async function IsFavorited() {
            if (!businessData || !businessData.id || businessData.id === "") {
                setBusinessFavorited(false)
                return false
            }

            if (locallyFavorited[businessData.id]) {
                setBusinessFavorited(true)
                return true
            }

            const isFaved: boolean = await IsBusinessFavorited(businessData.id) as boolean

            console.log(businessData)

            setBusinessFavorited(isFaved)

            return isFaved

        }

        async function GetRatings() {

            if (!businessData || !businessData.id || businessData.id === "") {
                return false
            }

            const businessRatings = await GetBusinessRatings(businessData.id)

            setListedRatings(businessRatings)

        }

        async function DoAll() {
            await Promise.all([GetRatings(), IsFavorited(), GetUIDForLocal()])
        }

        DoAll()

    }, [businessData])

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

    return (
        <>
            <div
                className="flex flex-col items-center justify-center w-screen h-full overflow-x-hidden"
            >
                <div
                    className="flex flex-col items-center gap-10 w-full min-h-full p-[15vw] overflow-x-hidden"
                >

                    <div
                        className="flex flex-row bg-bay-of-many-700 p-5 rounded-2xl"
                    >
                        <div
                            className="flex flex-col justify-between gap-2"
                        >
                            <div
                                className="flex flex-col h-full items-center justify-between"
                            >
                                <div
                                    className="flex flex-col"
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
                                    </div>

                                    <div
                                        className="flex flex-row gap-2 pb-15"
                                    >
                                        <RatingBar style="white" rating={businessData.rating.average} />

                                        <p
                                            className="font-bold text-white"
                                        >
                                            {businessData.rating.average}/5
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="flex flex-col min-h-[24vh] min-w-[20vw] gap-2 bg-linear-to-b from-bay-of-many-800 to-bay-of-many-900 rounded-2xl p-3 items-center"
                                >

                                    <h2
                                        className="text-white text-2xl font-semibold underline"
                                    >
                                        Deals
                                    </h2>

                                    <div
                                        className="bg-bay-of-many-950 min-w-full min-h-[84%] overflow-scroll overflow-y-hidden rounded-2xl p-2"
                                    >

                                        <Deal storeType={GetLintedCategory(businessData.category)}/>

                                    </div>

                                </div>

                                <div
                                    className="flex flex-col items-center pt-5"
                                >
                                    <a
                                        href={businessData.website || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p
                                            className="text-white/80 underline"
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

                            </div>

                            {/*action bar*/}
                            <div
                                className="flex flex-row gap-2 justify-center items-center"
                            >
                                <BaseButton onClick={() => {

                                    if (!listedRatings || !uid) {
                                        setRatingOpened(!isRatingOpened)
                                        return
                                    }

                                    if (listedRatings[uid]) {
                                        setRatingOpened(false)
                                        return
                                    }

                                    setRatingOpened(!isRatingOpened)
                                }} preChildren={

                                    <FilledStar color={"white"} />

                                } />
                                <BaseButton onClick={() => {
                                    HandleFavorite()
                                }} preChildren={

                                    <>
                                        {
                                            isBusinessFavorited === true ? (
                                                <FilledBookmark />
                                            ) : (
                                                <EmptyBookmark />
                                            )
                                        }
                                    </>

                                } />
                            </div>
                        </div>

                        <img className="p-2 pl-5 w-[35vw] rounded-2xl" src={imageDir} />

                    </div>

                    <div
                        className={"flex flex-col gap-2 w-[60%] p-5 bg-linear-to-b from-bay-of-many-500 to-bay-of-many-700 py-5 rounded-2xl " + (isRatingOpened ? "" : "hidden")}
                    >

                        <h2
                            className="font-bold text-white text-2xl"
                        >
                            Write a Review!
                        </h2>

                        <div
                            className="flex flex-col gap-2"
                        >
                            <div
                                className="flex flex-row justify-between px-2"
                            >

                                <input
                                    className="bg-bay-of-many-800 rounded-xl p-2 text-bold text-wrap text-white px-5 text-left"
                                    placeholder="Header for your Review (optional)"
                                    onChange={(e) => {
                                        setRatingInputData((prev: User_RatingData) => ({
                                            ...prev,
                                            header: e.target.value
                                        }))
                                    }}
                                    value={ratingInputData.header}
                                />

                                <RatingBar
                                    rating={ratingInputData.rating}
                                    onRatingClicked={(rating) => {
                                        setRatingInputData((prev: User_RatingData) => ({
                                            ...prev,
                                            rating: rating
                                        }))
                                    }}
                                    style={"white"}
                                />

                            </div>

                            <input
                                className="bg-bay-of-many-800 rounded-xl text-semibold p-2 py-10 text-left text-white"
                                placeholder="Text for your review (optional)"
                                onChange={(e) => {
                                    setRatingInputData((prev: User_RatingData) => ({
                                        ...prev,
                                        text: e.target.value
                                    }))
                                }}
                                value={ratingInputData.text}
                            />
                        </div>

                        <div
                            className="flex flex-row justify-end gap-3"
                        >

                            <BaseButton text={"Reset"} onClick={() => {
                                setRatingInputData({
                                    header: "",
                                    text: "",
                                    rating: 1,
                                })
                            }} />
                            <BaseButton text={"Post"} onClick={async () => {
                                await HandleRating()
                            }} />

                        </div>

                    </div>

                    <div
                        className="flex flex-col gap-2 rounded-2xl bg-linear-to-b from-bay-of-many-700 to-bay-of-many-800"
                    >
                        <div
                            className="flex flex-row items-center text-center p-2 gap-3"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-10">
                                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <h1
                                className="font-bold text-white text-5xl"
                            >
                                Reviews
                            </h1>
                        </div>

                        <div
                            className="min-w-[15w] p-5"
                        >
                            {
                                listedRatings && Object.values(listedRatings).map((value) => {
                                    return (
                                        <>
                                            <div
                                                key={value.uid + businessData.id}
                                                className="bg-bay-of-many-600 rounded-2xl p-2 px-2 max-w-[50vw]"
                                            >
                                                <h1
                                                    className="text-white text-xl"
                                                >
                                                    {value.username || "No name"}
                                                </h1>

                                                <div className="flex flex-row gap-2">
                                                    <p className="text-white font-semibold">{value.rating}/5</p>
                                                    <RatingBar style={"white"} rating={value.rating} />
                                                </div>

                                                <div
                                                    className="flex flex-col pt-5"
                                                >
                                                    <h2
                                                        className="text-white text-2xl font-semibold"
                                                    >
                                                        {value.header}
                                                    </h2>

                                                    <p
                                                        className="text-white text-xl font-medium"
                                                    >
                                                        {value.text}
                                                    </p>
                                                </div>

                                            </div>
                                        </>
                                    )
                                })
                            }

                            {
                                (listedRatings && Object.values(listedRatings).length <= 0)
                                && (
                                    <>
                                        <h1
                                            className="text-center text-white font-black text-3xl"
                                        >
                                            No one has reviewed this place so far!
                                        </h1>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}