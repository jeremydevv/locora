import request from "../../../utilities/fetch";
import { GetIdToken } from "../../AuthStore";

export interface Business_InformationData {
    name : string,
    id : string,
    description : string,
    address : string,
    thumbnail : string,
    website : string,
    rating : {
        "1" : number,
        "2" : number,
        "3" : number,
        "4" : number,
        "5" : number,
        "average" : number
    }
    ratings : Array<unknown>
}

async function GetBusinessInformation(business_id : string) : Promise<Business_InformationData | null>  {
    
    try {

        const cachedPlaceInfo = localStorage.getItem("placeinfo-"+business_id)

        if (cachedPlaceInfo) {
            return  JSON.parse(JSON.parse(cachedPlaceInfo).data)
        }

        const Results = await request(`/v1/maps/getplaceinfo?placeId=${business_id}`,{
            "headers" : {
                "Authorization" : `Bearer ${await GetIdToken()}`
            }
        })

        const Data : {
            data : Business_InformationData,
            id : string
        } = await Results.json()

        localStorage.setItem("placeinfo-"+business_id,JSON.stringify(Data.data))

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