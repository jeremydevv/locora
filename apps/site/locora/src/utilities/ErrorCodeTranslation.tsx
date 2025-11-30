export default function TranslateErrorCode(msg : string) {
    const errorMap : Record<string,string> = {
        "INVALID_LOGIN_CREDENTIALS" : "The information provided was invald.",
        "EMAIL_EXISTS" : "An account is already registered with this information."
    }
    return errorMap[msg] || false
}