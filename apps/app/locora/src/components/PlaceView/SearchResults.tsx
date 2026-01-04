import { useEffect, useState } from "react"
import SearchResultBox from "./ResultBox"

import loadingSymbol from "../../assets/loading.png"
import { BusinessPayload, OnBusinessDataChange } from "../../pages/BusinessPage/BusinessStore"

interface props {
    rawQueryChanged : (fn : (q : string) => void) => void
}

export default function SearchResults({rawQueryChanged} : props) {

    const [loading, setLoading] = useState<boolean>(true)
    const [businessDataList, setBusinessDataList] = useState<BusinessPayload[]>([])

    useEffect(() => {

        rawQueryChanged(() => {
            setLoading(true)
        })

        OnBusinessDataChange((businessdata : BusinessPayload[]) => {
            setBusinessDataList(businessdata)
            setLoading(false)
        })

    }, [])

    return (
        <>
            <div
                className="flex flex-col rounded-2xl bg-linear-to-b from-bay-of-many-500 via-bay-of-many-600 to-bay-of-many-600 drop-shadow-9xl shadow-2xl z-2 p-3 gap-5 overflow-y-scroll max-h-[80vh]"
            >
                {
                    (!loading)
                        ?
                        (
                            businessDataList.map((businessData: BusinessPayload, index: number) => (
                                <SearchResultBox key={index} data={JSON.stringify(businessData)} />
                            ))
                        ) : (
                            <div
                                className="flex flex-col items-center gap-3"
                            >
                                <h1
                                    className="font-bold text-white text-center text-xl"
                                >
                                    Results are loading for ...
                                </h1>
                                <img src={loadingSymbol} className="w-6 h-6 aspect-square animate-spin" />
                            </div>
                        )
                }
            </div>
        </>
    )
}