import { useCallback, useEffect, useRef, useState } from "react"
import BusinessEmbed from "../components/businessembed"
import { ChangePage } from "../App"
import { GetRecentlyViewedItems } from "./BusinessPage/ViewStore"
import request from "../utilities/fetch"
import { GetIdToken } from "../data/AuthStore"
import { BusinessPayload } from "./BusinessPage/BusinessStore"

interface Query {
    text: string,
    orderType: "Default" | "Top Rated",
    storeType: "Food" | "Retail"
}

interface props {
    SwitchPage : ChangePage
}

export default function Explore({
    SwitchPage
} : props) {

    const [currentQuery, setCurrentQuery] = useState<Query>({
        text: "",
        orderType: "Default",
        storeType: "Food",
    })

    const [recentlyViewed, setRecentlyViewed] = useState<Array<string> | null>([])
    const [resultData, setResultData] = useState<Array<BusinessPayload>>([])

    const typingTimeout = useRef<NodeJS.Timeout>()

    useEffect(() => {

        function GetRecentlyViewed() {
            setRecentlyViewed(GetRecentlyViewedItems())
        }

        async function DoAll() {
            await Promise.all([
                GetRecentlyViewed()
            ])
        }

        DoAll()

    }, [])

    const SearchWithQuery = useCallback(async (query: Query) => {

        const idToken = await GetIdToken()
        const { text, orderType, storeType } = query

        try {

            console.log("Running search with", query)

            const Result = await request(`/v1/business/search?text=${encodeURIComponent(text)}&filterType=${orderType}&storeType=${storeType}`, {
                headers : {
                    "Authorization" : `Bearer ${idToken}`
                },
                method : "GET"
            })

            const Data = await Result.json()

            if (!Result.ok) {
                console.log("Issue when trying to query a search!",Data)
                return
            }

            console.log(Data,Data.data)

            setResultData(Data.data ? Data.data : [])

        } catch(err) {
            console.log("Issue when trying to query a search!",err)
        }

    },[])

    const InputChanged = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {

        const nextText = e.target.value

        setCurrentQuery((prev) => {
            const nextQuery = {
                ...prev,
                text: nextText
            }

            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current)
            }

            typingTimeout.current = setTimeout(() => {
                SearchWithQuery(nextQuery)
            }, 1300);

            return nextQuery
        })

    },[SearchWithQuery])

    return (
        <>
            <div
                className="w-screen min-h-screen bg-bay-of-many-500 pt-9 overflow-x-hidden"
            >

                <div
                    className="flex flex-row gap-2 items-center justify-center w-full bg-bay-of-many-700 h-[7vh]"
                >

                    <div
                        className="flex bg-bay-of-many-800 rounded-3xl p-2"
                    >
                        <input
                            className="bg-bay-of-many-950 text-white rounded-2xl p-2"
                            onChange={(e) => {
                                InputChanged(e)
                            }}
                            value={currentQuery.text}
                            placeholder="Search for a business"
                        />

                    </div>
                    
                    <div
                        className="flex flex-row gap-2 bg-bay-of-many-800 rounded-2xl p-2"
                    >
                        <select
                            onChange={(e) => {
                                setCurrentQuery((oldVal) => ({
                                    ...oldVal,
                                    orderType : e.target.value as "Default" | "Top Rated"
                                }))
                            }}
                            value={currentQuery.orderType}
                            className="bg-bay-of-many-500 rounded-2xl text-white p-1"
                        >
                            <option>
                                Default
                            </option>
                            <option>
                                Top Rated
                            </option>
                        </select>
                        <select 
                            onChange={(e) => {
                                setCurrentQuery((oldVal) => ({
                                    ...oldVal,
                                    storeType : e.target.value as "Food" | "Retail"
                                }))
                            }}
                            value={currentQuery.storeType}
                            className="bg-bay-of-many-500 rounded-2xl text-white p-1"
                            >
                            <option>
                                Default
                            </option>
                            <option>
                                Food
                            </option>
                            <option>
                                Retail
                            </option>
                        </select>
                    </div>

                </div>

                <div
                    className="flex flex-col gap-20 p-20"
                >

                    <div
                        className="flex flex-col gap-1"
                        style={{
                            "visibility" : (resultData.length <= 0) ? "hidden" : "visible"
                        }}
                    >
                        <h1 className="text-3xl text-left text-white font-bold">
                            Search Results
                        </h1>

                        <div className="flex flex-row overflow-x-scroll overflow-y-hidden min-w-full gap-2 bg-bay-of-many-600 py-5 rounded-2xl pl-5">
                            {
                                resultData.map((data) => {
                                    if (!data) {
                                        return 
                                    }

                                    return (<BusinessEmbed ShowRating={false} key={data.id} business_id={data.id} SwitchPage={SwitchPage} />)
                                })
                            }
                        </div>
                    </div>
                        
                    {/* featured places (manual)*/}
                    <div className="flex flex-col gap-1">
                        
                        <h1 className="text-4xl text-center text-white font-bold">
                            Featured Businesses
                        </h1>

                        <div className="flex flex-row overflow-x-scroll overflow-y-hidden min-w-full gap-2 bg-bay-of-many-600 py-5 rounded-2xl pl-5">
                            
                            <BusinessEmbed SwitchPage={SwitchPage} business_id={"ChIJH8POjuFZwokRpCBDG24ns14"} />
                            <BusinessEmbed SwitchPage={SwitchPage} business_id={"ChIJ8z6bMPvCwogRWgA07cafMMA"} />

                        </div>  

                    </div>

                    {/* recently viewed (cached last searched easy) */}
                    <div className="flex flex-col gap-2">

                        <h1 className="text-4xl text-white font-bold">
                            Recently Viewed
                        </h1>

                        <div className="flex flex-row overflow-x-scroll overflow-y-hidden gap-2 bg-bay-of-many-600 py-5 rounded-2xl pl-5">
                            {
                                recentlyViewed?.map((business_id) => {
                                    return (<BusinessEmbed key={business_id+"recentlyviewed"} business_id={business_id} SwitchPage={SwitchPage}/>)
                                })
                            }
                        </div>

                    </div>

                </div>

            </div>
        </>
    )

}
