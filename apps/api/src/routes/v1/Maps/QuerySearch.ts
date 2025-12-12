import { Env, GeoAPI_PlaceDetailsResponse, GeoAPI_QueryResponse, GeoAPI_QueryResults, Locora_Business } from "../../types";
import InternalError from "../../utils/InternalError";
import JSONResponse from "../../utils/JSONResponse";
import MalformedData from "../../utils/MalformedRequest";
import CreateBusinessDataEntry from "../Business/D1Interactions/Whole/CreateBusinessData";
import getBusinessData from "../Business/D1Interactions/Whole/GetBusinessData";
import getStoreFrontImage from "../Business/R2Interactions/Images/GetStoreFront";
import { PlaceDetails } from "./SharedMap";

async function RunBusiness(business : GeoAPI_QueryResults, env : Env) {
    let endResult = null;

    const googlePlaceId = business.place_id;
    const latitude = business.geometry.location.lat;
    const longitude = business.geometry.location.lng;

    try {
        const businessData = await getBusinessData(googlePlaceId, env)

        if (businessData) {
            endResult = businessData
        } else {

            // constructing business data for this

            const detailsRes = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?` +
                `place_id=${googlePlaceId}&` +
                `fields=name,formatted_address,types,opening_hours,formatted_phone_number,website,geometry` +
                `&key=${env.GOOGLE_MAPS_API_KEY}`
            );

            const placeDetails: GeoAPI_PlaceDetailsResponse = await detailsRes.json();

            const DetailsMain = placeDetails.result;

            const storeFrontUrl = await getStoreFrontImage(googlePlaceId, env);

            if (!DetailsMain) return;

            const ConstructedBusiness: Locora_Business = {
                id: googlePlaceId,
                name: DetailsMain.name || "Unknown",
                description: "No description available.",
                address: DetailsMain.formatted_address || "No address provided.",
                category: DetailsMain.types?.[0] || "general",
                contact: {
                    phone: DetailsMain.formatted_phone_number || "N/A",
                    email: "N/A"
                },
                website: DetailsMain.website || "N/A",
                latitude: latitude,
                longitude: longitude,
                thumbnail: storeFrontUrl || "",
                timestamp: String(Date.now()),

                rating: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,

                    average: 0
                },

                ratings: {},

                ttl: 0
            };

            endResult = CreateBusinessDataEntry(googlePlaceId, JSON.stringify(ConstructedBusiness), env)

            return endResult

        }

    } catch (err) {
        console.log(err)
    }
}

export default async function QuerySearchEndpoint(req: Request, env: Env) {

    const reqURL = new URL(req.url)

    const query = reqURL.searchParams.get("q")
    const lon = reqURL.searchParams.get("lon")
    const lat = reqURL.searchParams.get("lat")
    const zoom = reqURL.searchParams.get("zoom")

    let cleanedQuery = query?.trim()
        .toLowerCase()
        .replace("/\s+/g", " ")
        .replace("/[^w\s,.-]/g", "")
        .replace("/\(near me|close|far|around|find|search|to|places?)\b/g", "")

    if (!cleanedQuery || cleanedQuery == "" || cleanedQuery.length == 0) {
        return MalformedData(req, "No query was provided")
    }

    if (!lon || !lat || !zoom) {
        return MalformedData(req, "Missing positioning data")
    }

    const ZoomScaling: Record<number, number> = {
        20: 350, 19: 550, 18: 750, 17: 1100, 16: 170150,
        15: 2750, 14: 3500, 13: 5000, 12: 7500, 11: 11000,
        10: 15500, 9: 18000
    }

    try {

        if (Math.floor(Number(zoom)) < 9 || Math.floor(Number(zoom)) > 20) {
            return JSONResponse(req, {
                success: false,
                message: "zoomed out too much or too close"
            }, 400)
        }

        const radius = ZoomScaling[Math.floor(Number(zoom))]

        const Data = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
            `query=${encodeURIComponent(cleanedQuery)}` +
            `&location=${lat},${lon}` +
            `&radius=${radius}` +
            `&key=${env.GOOGLE_MAPS_API_KEY}`
        );

        const Result: GeoAPI_QueryResponse = await Data.json();

        const businessesWithData: Array<Locora_Business> = []

        // parses into our format or takes it from DB
        const sliceSize = Math.ceil(Result.results.length / 2);
        for (let i = 0; i < Result.results.length; i += sliceSize) {
            const slice = Result.results.slice(i, i + sliceSize);

            await Promise.all(slice.map(async (business) => {
                const PreExistingData = await getBusinessData(business.place_id, env)
                if (PreExistingData != null) {
                    businessesWithData.push(PreExistingData as Locora_Business)
                    return
                }

                const businessData = await RunBusiness(business, env)
                if (businessData != null) {
                    businessesWithData.push(businessData as Locora_Business)
                }
            }));
        }

        if (!Data) {
            console.log(Result)
            return InternalError(req)
        }

        return JSONResponse(req, {
            success: true,
            businesses: businessesWithData
        }, 200)

    } catch (err) {
        console.log(err)
    }

    return JSONResponse(req, {
        success: true,
        message: "Something went wrong with the query."
    }, 500)

}