import { Env } from "../../../types";
import getUidFromIdToken from "../../../utils/GetUIDFromIdToken";

export default async function GetUsersFavorites(req : Request, env : Env) {
    // todo: get the list from the users firebase data
    const UID = getUidFromIdToken(req.headers.get("Authorization") || "",env)

    try {

        const Result = fetch()

    } catch(err) {

    }

}