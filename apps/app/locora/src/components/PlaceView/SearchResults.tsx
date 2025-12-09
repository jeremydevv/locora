import { useEffect, useState } from "react"
import { onQueryChange } from "../Mapview/MapStore"
import SearchResultBox from "./ResultBox"

import loadingSymbol from "../../assets/loading.png"

export default function SearchResults() {

    const [query , setNewQuery] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        onQueryChange((newQuery : string) => {

            setNewQuery(newQuery)

        })
    },[])

    return (
        <>
            <div
                className="flex flex-col rounded-2xl bg-gradient-to-b from-bay-of-many-500 via-bay-of-many-600 to-bay-of-many-600 drop-shadow-9xl shadow-2xl z-2 p-3 gap-5 overflow-y-scroll max-h-[80vh]"
            >
                {
                    (!loading) 
                    ? ([1,2,3,4,5,6,7].map((id) => {
                            return <SearchResultBox key={id} />
                    })) 
                    : (
                        <div
                            className="flex flex-col items-center gap-3"
                        >
                            <h1
                                className="font-bold text-white text-center text-xl"
                            >
                                Results are loading...
                            </h1>
                            <img src={loadingSymbol} className="w-6 h-6 aspect-square animate-spin" />
                        </div>
                    )
                }
            </div>
        </>
    )
}