import { Env, GeoAPI_StoreFrontPhotoResponse } from "../../../../types";

export default async function getStoreFrontImage(place_id : string, env : Env) {
    
    if (!place_id) {
        return null
    }

    try {

        const key = `business_images/storefront_${place_id}.jpg`

        const CachedImage = await env.CDN.get(key)

        if (CachedImage) {
            return "https://cdn.locora.org/business_images/" + key
        }

        const Result = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${env.GOOGLE_MAPS_API_KEY}`, {
            method: "GET"
        })

        if (!Result.ok) {
            console.log(Result)
            return null
        }

        const Data : GeoAPI_StoreFrontPhotoResponse = await Result.json()
        const PhotoReference = Data.result.photos?.[0]?.photo_reference

        if (!PhotoReference) {
            console.log("no photo reference found")
            return null
        }

        const PhotoResult = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photoreference=${PhotoReference}&key=${env.GOOGLE_MAPS_API_KEY}`, {
            method: "GET"
        })

        if (!PhotoResult.ok) {
            console.log("photo fetch failed", PhotoResult)
            return null
        }

        const image_bytes = await PhotoResult.arrayBuffer()

        await env.CDN.put(key, image_bytes, {
            httpMetadata: {
                contentType: "image/jpeg"
            }
        })

        return "https://cdn.locora.org/business_images/" + key

    } catch (err) {
        console.error(err)
    }
}