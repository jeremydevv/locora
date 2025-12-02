import { Env } from "../../types"

async function ReverseGeoCode(lat: number, lon: number, env: Env) {

    try {
        const Result = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${env.GEO_API_KEY}`, {
            method: "GET"
        })

        const data = await Result.json()

        return data
    } catch (err) {
        console.error(err)
    }
}

async function PlaceDetails(placeId: string, env: Env) {

    try {
        const Result = await fetch(`https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${env.GEO_API_KEY}`, {
            method: "GET"
        })
        const Data = await Result.json()

        return Data
    } catch (err) {
        console.error(err)
    }

}

export { ReverseGeoCode , PlaceDetails}