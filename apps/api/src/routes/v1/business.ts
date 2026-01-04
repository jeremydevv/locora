import { Router } from "itty-router";
import { Env } from "../types";
import { checkForValidAuthorization } from "../utils/CheckForAuth";
import Unauthorized from "../utils/Unauthorized";
import JSONResponse from "../utils/JSONResponse";
import CreateUserRating from "../../../data/userdata/ratings/CreateRating";
import WriteNewRating from "./User/ratings/WriteRating";
import ViewBusinessRatings from "./Business/Endpoints/ViewRatings";
import RemoveRating from "./User/ratings/RemoveRating";
import Corsify from "../utils/Corsify";

const router = Router({ base: "/v1/business/" });

router.options("*", async (request : Request, env : Env) => {
    return Corsify(request,JSONResponse(request,{
        success : true
    },200),false)
})

router.get("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = await checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        return Unauthorized(request)
    }

    const requestURL = new URL(request.url)
    const businessId = requestURL.searchParams.get("businessId")

    if (!businessId) {
        return JSONResponse(request,{
            success : false,
            message : "No business ID was provided!"
        },400)
    }

    const ViewedRatings = await ViewBusinessRatings(businessId, env)

    if (!ViewedRatings) {
        return JSONResponse(request,{
            success : false,
            message : "Business not found or has no ratings!"
        },404)
    }

    return JSONResponse(request,{
        success : true,
        message : "Ratings were correctly fetched!",
        data : ViewedRatings
    })

}) 

router.post("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = await checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        console.log("request wasnt validated at secondary")
        return Unauthorized(request)
    }

    const WrittenRating = await WriteNewRating(request,env)

    console.log(WrittenRating)

    return JSONResponse(request,{
        success : true,
        message : "hello 1"
    })

}) 

router.delete("/ratings", async (request : Request, env : Env) => { 

    const isRequestValidated = await checkForValidAuthorization(request,env)

    if (!isRequestValidated) {
        console.log("request wasnt validated at secondary")
        return Unauthorized(request)
    }

    const RemovedRating = await RemoveRating(request,env)

    console.log(RemovedRating)

    return JSONResponse(request,{
        success : true,
        message : "hello 2"
    })

}) 

export const handleBusiness = (req: Request, env: Env) => router.handle(req, env);
