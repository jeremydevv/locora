import { useState } from "react"

interface Query {
    text : string,
    orderType : "Default" | "Top",
    storeType : "Food" | "Retail"
}

export default function Explore() {

    const [currentQuery, setCurrentQuery] = useState<Query>({
        text : "",
        orderType : "Default",
        storeType : "Food",
    }) 

    return (
        <>
            <div
                className="w-full min-h-full bg-bay-of-many-500"
            >
                
                {/* featured places (manual)*/}
                <div>

                </div>

                {/* reccomended (get key words out of search, cache, randomly pick) */}
                <div>

                </div>

                {/* recently searched places (cached last searched easy) */}
                <div>

                </div>

            </div>
        </>
    )

}