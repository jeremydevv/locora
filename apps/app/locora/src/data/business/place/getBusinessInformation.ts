import { BusinessPayload } from "../../../pages/BusinessPage/BusinessStore";
import request from "../../../utilities/fetch";
import { GetIdToken } from "../../AuthStore";

async function GetBusinessInformation(business_id : string) : Promise<BusinessPayload | null>  {
    
    try {

        const cachedPlaceInfo = localStorage.getItem("placeinfo-"+business_id)

        if (cachedPlaceInfo) {
            const parsedPlaceInfo = JSON.parse(cachedPlaceInfo)

            if (!parsedPlaceInfo.data || !parsedPlaceInfo.ttl) {
                localStorage.removeItem("placeinfo-"+business_id)
                return await GetBusinessInformation(business_id) 
            }

            if (parsedPlaceInfo.ttl < Date.now()) {
                localStorage.removeItem("placeinfo-"+business_id)
                return await GetBusinessInformation(business_id)
            } else {
                return JSON.parse(JSON.parse(parsedPlaceInfo.data).data)
            }
        }

        const Results = await request(`/v1/maps/getplaceinfo?placeId=${business_id}`,{
            "headers" : {
                "Authorization" : `Bearer ${await GetIdToken()}`
            }
        })

        const Data : {
            data : BusinessPayload,
            id : string
        } = await Results.json()

        localStorage.setItem("placeinfo-"+business_id,JSON.stringify({
            data : JSON.stringify(Data.data),
            ttl : Date.now() * 5 * 60 * 1000
        }))

        if (!Results.ok) {
            console.log("Issue happened when trying to get business data!", Data)
            return null
        }

        return Data.data

    } catch(err) {
        console.log("GetBusinessInformation Error",err)
    }

    return null

}

export {GetBusinessInformation}