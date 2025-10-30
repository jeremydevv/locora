import { parsePhoneNumberFromString } from "libphonenumber-js"

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhoneNumber(phoneNumber: string) {
    const trimmed = phoneNumber.trim()
    const codedNum = trimmed.startsWith("+") ? trimmed : `+1${trimmed}`
    const parsedNum = parsePhoneNumberFromString(codedNum)

    return parsedNum?.isValid() ? parsedNum.formatInternational().trim() : null
}

function ParsePhoneNumber(number : string) {
    
}

export { isValidEmail, isValidPhoneNumber }

