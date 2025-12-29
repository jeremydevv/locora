import request from "../../../utilities/fetch"
import { GetIdToken } from "../../AuthStore"

let UserFavoritesCached = false
let UserFavoritesArray : Array<User_FavoriteElement> = []

export interface User_FavoriteElement {
    name: string,
    updateTime : string,
    fields : {
        business_id: { stringValue: string },
        timeCreated: { stringValue: string },
    }      
}

async function GetUserFavorites(idToken: string) {

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
            UserFavoritesCached = true;
            return null
        }

        localStorage.setItem("UserData-Favorites",JSON.stringify(UserFavoritesArray))

        UserFavoritesCached = true
        UserFavoritesArray = Res.data

        return UserFavoritesArray

    } catch (err) {
        console.log("failed to get the users favorites!")
        console.log(err)
        throw new Error("Failed to get user's favorites!")
    }

}

async function IsBusinessFavorited(business_id: string): Promise<boolean | unknown> {
    
    const cachedUserFavorites = localStorage.getItem("UserData-Favorites")

    if (cachedUserFavorites) {

        console.log(cachedUserFavorites)

        return true

    } else {
        GetUserFavorites(await GetIdToken() || "")
        return await IsBusinessFavorited(business_id)
    }

}

export {GetUserFavorites, IsBusinessFavorited}