import { parsePhoneNumberFromString } from "libphonenumber-js";

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function standardizePhoneNumber(phone: string) {
    const trimmed = phone.trim()
    const codedNum = trimmed.startsWith("+") ? trimmed : `+1${trimmed}`
    const parsedNum = parsePhoneNumberFromString(codedNum)

    return parsedNum?.isValid() ? parsedNum.formatInternational() : null
}

export { isValidEmail, standardizePhoneNumber }