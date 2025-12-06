import { Router } from "itty-router";
import { Env } from "../types";
import MalformedData from "../utils/MalformedRequest";
import JSONResponse from "../utils/JSONResponse";
import Corsify from "../utils/Corsify";

const router = Router({ base: "/v1/download/" });

interface GitResponse {
    url : string,
    assets_url : string,
    upload_url : string,
    html_url : string,
    id : number
}

interface GitRelease {
    url : string
    name : string
    id : number
}

router.all("*" , async (request : Request, env : Env) => {

    console.log("hit the endpoint")

    const parsedURL = new URL(request.url)
    const searchParams = parsedURL.searchParams
    const os = searchParams.get("os")

    if (!os) {
        return MalformedData(request)
    }

    if (!['mac',"win"].includes(os)) {
        return MalformedData(request)
    }

    const ip = request.headers.get("CF-Connecting-IP")

    const { success } = await env.WaitlistRatelimiter.limit({
        key : ip || ""
    })

    if (!success) {
        console.log("rate limited")
        return JSONResponse(request,{
            success : false,
            message : "Too many requests!"
        },429)
    }

    const targetName = os === "win" ? "Locora.Setup.1.0.0.exe" : "Locora-1.0.0-arm64.dmg";

    const releaseRes = await fetch(`https://api.github.com/repos/jeremydevv/locora/releases/latest`, {
        headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "Accept": "application/vnd.github+json",
            "User-Agent": "locora"
        }
    });

    if (!releaseRes.ok) {
        return JSONResponse(request, {
            success: false,
            message: "Failed to fetch release data"
        }, 500);
    }


    // Fetch assets separately
    const releaseData : GitResponse = await releaseRes.json();
    const assetsRes = await fetch(releaseData.assets_url, {
        headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "Accept": "application/vnd.github+json",
            "User-Agent": "locora"
        }
    });

    if (!assetsRes.ok) {
        return JSONResponse(request, {
            success: false,
            message: "Failed to fetch release assets"
        }, 500);
    }

    const assets: GitRelease[] = await assetsRes.json();
    const asset = assets.find((x) => x.name === targetName);

    if (!asset) {
        console.log("couldnt find the asset")
        return JSONResponse(request, {
            success: false,
            message: "Installer not found"
        }, 404)
    }

    const binaryResult = await fetch(`https://api.github.com/repos/jeremydevv/locora/releases/assets/${asset.id}`, {
        headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "Accept": "application/octet-stream",
            "User-Agent": "locora"
        },
        redirect: "follow",
        cf: {
            cacheTtl: 0,
            cacheEverything: false
        }
    })

    if (!binaryResult.ok) {
        console.log("failed to get the installer binary")
        return JSONResponse(request, {
            success: false,
            message: "Failed to fetch installer binary"
        }, 500)
    }

    console.log("returning successfully")

    return Corsify(request,
        new Response(binaryResult.body, {
            status: 200,
            headers: {
                "Content-Type": os === "win"
                    ? "application/vnd.microsoft.portable-executable"
                    : "application/x-apple-diskimage",
                "Content-Disposition": `attachment; filename="${targetName}"`,
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        })
    )

})

export const handleDownload = (req: Request, env: Env) => router.handle(req, env);