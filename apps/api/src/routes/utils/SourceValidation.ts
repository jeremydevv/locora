const AllowedOrigins = [
    "https://locora.org",
    "https://api.locora.org",
    "http://localhost:5173"
]

export default function SourceValidation(req : Request) {

    console.log(req.headers.get("Origin"))

    if (req.headers.get("Origin") == null || !AllowedOrigins.includes(req.headers.get("Origin")!)) {
        return false
    }

    return true

}