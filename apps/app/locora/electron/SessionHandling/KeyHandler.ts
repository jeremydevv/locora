import Keytar from "keytar"

const SERVICE_NAME = "locora-electron-session"

export function LoadSessionToken(userId : string) {
    return Keytar.getPassword(SERVICE_NAME, userId)
}

export function UpdateSessionToken(userId : string, token : string) {
    return Keytar.setPassword(SERVICE_NAME, userId, token)
}

export function DeleteSessionToken(userId : string) {
    Keytar.deletePassword(SERVICE_NAME, userId)
}