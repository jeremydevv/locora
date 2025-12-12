import { Env } from "../../types";
import JSONResponse from "../../utils/JSONResponse";
import { NotFound } from "../../utils/NotFound";
import FavoritesEndpoint from "./favorites/FavoritesEndpoint";
import { InformationEndpoint } from "./information/information";
import RatingsEndpoint from "./ratings/RatingsEndpoint";

function UserPostEntry(req : Request, env : Env) {

    return JSONResponse(req,{
        success : true,
        message : "working"
    },200)

}

async function UserGetEntry(req : Request, env : Env) {

    const path = req.url.split("/v1/users/")[1];
    const segments = path.split("/");

    if (segments[0] === "information") {
        return await InformationEndpoint(req, env);
    } else if (segments[0] === "favorites") {
        return await FavoritesEndpoint(req,env)
    } else if (segments[0] === "ratings") {
        return await RatingsEndpoint(req,env)
    } else {
        return NotFound(req)
    }

}

export { UserPostEntry, UserGetEntry }