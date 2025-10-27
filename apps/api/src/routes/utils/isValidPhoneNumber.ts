import { parsePhoneNumberFromString } from "libphonenumber-js"

export default function isValidPhoneNumber(phoneNumber: string) {
    const parsedNum = parsePhoneNumberFromString(phoneNumber)
    return parsedNum?.isValid() ?? false
}