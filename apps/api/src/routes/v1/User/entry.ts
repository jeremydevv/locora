import { Env } from "../../types";

function UserPostEntry(req : Request, env : Env) {

    console.log(req.url)

}

function UserGetEntry(req : Request, env : Env) {

    console.log(req.url)

}

export { UserPostEntry, UserGetEntry }