import request from "../../../utilities/fetch";
import { GetIdToken } from "../../AuthStore";

export interface UserRating {
    createTime : string,
    fields : {
        business_id : {stringValue : string}
        header : {stringValue : string}
        name : {stringValue : string}
        rating : {integerValue : string}
        text : {stringValue : string}
        timeCreated : {timestampValue : string}
        uid : {stringValue : string}
    }
    name : string,
    updateTime : string
}

export default async function GetUserRatings() {

    try {

        const idToken = await GetIdToken()

        if (!idToken) {
            return null
        }

        const Result = await request("/v1/users/ratings/getRatings",{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${idToken}`
            }
        })

        const Data : {
            data : UserRating[]
        } = await Result.json()

        if (!Result.ok) {
            console.log(Data)
            return null
        }

        console.log(Data)

        return Data.data

    } catch(err) {
        console.log(err)
        throw new Error("Could not get the users ratings!")
    }

}