import request from "../../../utilities/fetch"
import { UserDisplayInformation } from "../UserTypes"

//@ts-ignore
let displayPayload: UserDisplayInformation | Record<string, unknown> = {}
let displayPayloadCached = false

async function GetUserDisplayPayload(idToken: string): Promise<UserDisplayInformation> {

    if (displayPayloadCached) {
        return displayPayload as UserDisplayInformation
    }

    try {

        const Data = await request("/v1/users/information/display", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`
            }
        })

        if (!Data.ok) {
            throw new Error("Failed to fetch user display information")
        }

        const Res = await Data.json()

        displayPayloadCached = true
        displayPayload = Res.data

        return Res.data as UserDisplayInformation
    } catch (error) {
        console.log(error)
        return {
            username : "Loading",
            displayName : "Loading",
            bio : "Loading",
            profilePictureURL : "",
            bannerPictureURL: "",
            coins : "",
            createdAt : ""
        }
    }

}

async function GetUserAttribute(idToken: string, attribute: keyof UserDisplayInformation): Promise<string> {
    const Payload = await GetUserDisplayPayload(idToken)

    if (!(attribute in Payload)) {
        throw new Error("Attribute does not exist in user display information")
    }

    return Payload[attribute] as string
}

export { GetUserDisplayPayload, GetUserAttribute }