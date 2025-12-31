import request from "../../../utilities/fetch"
import { GetIdToken } from "../../AuthStore"

export interface User_FavoriteElement {
    name: string,
    updateTime : string,
    fields : {
        business_id: { stringValue: string },
        timeCreated: { stringValue: string },
    }      
}

let CachedUserFavorites : {
    favorites : Array<User_FavoriteElement> | null
    ttl : number
} = {
    favorites : [],
    ttl : -1
}

async function GetUserFavorites(idToken: string) {

    if (CachedUserFavorites.favorites && CachedUserFavorites.favorites.length > 0 && Date.now() < CachedUserFavorites.ttl) {
        return CachedUserFavorites.favorites
    }

    try {

        const Data = await request("/v1/users/favorites/getfavorites", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`
            }
        })

        if (!Data.ok) {
            throw new Error("Failed to fetch user display information")
        }

        const Res = await Data.json()

        if (!Res.data) {
            console.log("no data was provided!")
            return null
        }

        CachedUserFavorites.favorites = Res.data ?? []
        CachedUserFavorites.ttl = Date.now() + 6000

        return CachedUserFavorites.favorites

    } catch (err) {
        console.log("failed to get the users favorites!")
        console.log(err)
        throw new Error("Failed to get user's favorites!")
    }

}

async function IsBusinessFavorited(business_id: string): Promise<boolean | unknown> {

    if (!business_id || business_id === "") {
        return false
    }

    let isFavorited = false
    const favData : Array<User_FavoriteElement> | null = await GetUserFavorites(await GetIdToken() || "")

    favData?.map((value : User_FavoriteElement) => {
        if (!value || !value.fields || !value.fields.business_id) {
            return
        }

        if (value.fields.business_id.stringValue == business_id) {
            isFavorited = true
        }
    })

    return isFavorited
}

async function RemoveFavoriteLocally(business_id : string) {

    if (!IsBusinessFavorited(business_id)) {
        throw new Error("Cannot locally remove a favorite that isnt favorited!")
    }

    if (!business_id || business_id === "") {
        return
    }

}

export {GetUserFavorites, IsBusinessFavorited, RemoveFavoriteLocally}