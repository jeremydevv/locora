import request from "../../../utilities/fetch"

export default async function GetBusinessesList(idToken : string, query: string, location : {lat : number, lon : number, zoom : number}) {

    try {
        const Result = await request(`/v1/maps/querysearch?q=` + 
            `${encodeURIComponent(query)}` + 
            `&lat=${location.lat}` +
            `&lon=${location.lon}` + 
            `&zoom=${location.zoom}`, {
            headers : {
                "Authorization" : `Bearer ${idToken}`
            },
            method: "GET"
        })

        const Data = await Result.json()

        if(!Result.ok) {
            console.log(Data)
            return
        }

        console.log(Data)

        return Data
    } catch (err) {

        console.log(err)
        return null
    }

}