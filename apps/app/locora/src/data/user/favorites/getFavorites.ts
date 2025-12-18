import request from "../../../utilities/fetch"

let UserFavoritesCached = false
let UserFavoritesArray = []

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

        UserFavoritesCached = true
        UserFavoritesArray = Res.data

        return UserFavoritesArray

    } catch (err) {
        console.log("failed to get the users favorites!")
        throw new Error("Failed to get user's favorites!")
    }

}

async function IsBusinessFavorited(business_id: string): Promise<boolean> {
    return false
}

export {GetUserFavorites}