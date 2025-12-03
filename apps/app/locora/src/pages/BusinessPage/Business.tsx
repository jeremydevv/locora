import { useEffect } from "react"
import { onQueryChange } from "../../components/Mapview/MapStore"
import { getBusinessData } from "./BusinessStore"
import request from "../../utilities/fetch"

export default function BusinessPage() {

    async function GetBusinessesList(query : string) {

        try {

            const Result = await request(`/v1/maps/querysearch?=${query}`, {
                method : "GET"
            })

            const Data = await Result.json()

            return Data
        } catch(err) {

            console.log(err)
            return null
        }

    }

    function UpdateBusinessesPayload(businessData : any) {

    }

    useEffect(() => {
        onQueryChange(async (query : string) => {
            const businessListData = await GetBusinessesList(query)

            if (!businessListData) {
                console.log("Invalid business data was provided")
                return
            }

            UpdateBusinessesPayload(businessListData)
        })
    },[])

    return (
        <>
            <div>

                

            </div>
        </>
    )

}