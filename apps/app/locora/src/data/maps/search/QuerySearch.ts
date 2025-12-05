import request from "../../../utilities/fetch"

export default async function GetBusinessesList(idToken : string, query: string) {

    try {
        const Result = await request(`/v1/maps/querysearch?q=${encodeURIComponent(query)}`, {
            headers : {
                "Authorization" : `Bearer ${idToken}`
            },
            method: "GET"
        })

        const Data = await Result.json()

        return Data
    } catch (err) {

        console.log(err)
        return null
    }

}