import { useEffect } from "react"
import { onQueryChange } from "../../components/Mapview/MapStore"
import { BusinessPayload, getBusinessData } from "./BusinessStore"
import request from "../../utilities/fetch"
import { DataPayload } from "../../../types"

interface props {
    businessData : BusinessPayload | null
}

export default function BusinessPage({businessData} : props) {

    console.log(businessData)

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
                </div>
            </>
        )
    }
    
    return (
        <>
            <div>

            </div>
        </>
    )

}