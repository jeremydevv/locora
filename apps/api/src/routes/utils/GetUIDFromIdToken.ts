import JSONResponse from "./JSONResponse"

export default async function getUidFromIdToken(idToken: string) {

    console.log(idToken)

    try {
        const Result = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
        )

        console.log(Result)

        if (!Result.ok) {
            return false
        }

        const tokenData: {
            sub: string
        } = await Result.json()

        if (!(tokenData.sub)) {
            return false
        }

        return tokenData.sub
    } catch (err) {
        console.log(err)
    }

}