import request from "../../../utilities/fetch";
import { GetIdToken } from "../../AuthStore";

function CacheBusinessRating(
    business_id : string,
    data : Record<string,unknown>
) {

    let cachedRatings = localStorage.getItem("BusinessData-Ratings")

    if (!cachedRatings) {
        cachedRatings = JSON.stringify({})
    }

    const parsedRatings = JSON.parse(cachedRatings)

    parsedRatings[business_id] = {
        data : data,
        ttl : Date.now() + 5 * 60 * 1000
    }

    localStorage.setItem("BusinessData-Ratings",JSON.stringify(parsedRatings))

}

function CheckForBusinessInCache(business_id : string) {

    const cachedRatings = localStorage.getItem("BusinessData-Ratings")

    if (!cachedRatings) {
        return false
    }

    const parsedRatings = JSON.parse(cachedRatings)

    // has it ever been cached?
    if (parsedRatings[business_id]) {

        // is expired data?
        if (parsedRatings[business_id].ttl > Date.now()) {
            return parsedRatings[business_id].data
        } else {

            delete parsedRatings[business_id]

            localStorage.setItem("BusinessData-Ratings",JSON.stringify(parsedRatings))

            return false
        }

    } else {
        return false
    }

}

export default async function GetBusinessRatings(business_id : string) {
    
    const idToken = await GetIdToken()

    if (!idToken || idToken === "") {
        console.log("idToken is invalid!")
        return
    }

    const hasCachedData = CheckForBusinessInCache(business_id)

    if (hasCachedData) {
        return hasCachedData
    }

    try {

        const Result = await request(`/v1/business/ratings?businessId=${business_id}`,{
            headers : {
                "Authorization" : `Bearer ${idToken}`
            }
        })

        const Data = await Result.json()

        if (!Result.ok) {
            console.log("Issue when fetching endpoint for business ratings!",Data)
        }

        CacheBusinessRating(business_id,Data.data)

        return Data.data

    } catch(err) {
        console.log("Issue when getting ratings for the business!",err)
        return null
    }

}