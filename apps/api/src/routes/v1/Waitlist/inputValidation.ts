import isValidEmail from "../../utils/isValidEmail";
import isValidPhoneNumber from "../../utils/isValidPhoneNumber";
import JSONResponse from "../../utils/JSONResponse";

async function checkForValidEmail(req : Request,email: string) {

    if (email == "") {
        return JSONResponse(req,
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!email) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Email is required.",
            },
            400
        );
    }

    if (!isValidEmail(email)) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Invalid email address.",
            },
            400
        );
    }

    return true;
}

async function checkForValidPhone(req : Request,phonenumber: string,) {
    
    if (phonenumber == "") {
        return JSONResponse(req,
            {
                status: "error",
                message: "Phone number is required.",
            },
            400
        );
    }

    if (!phonenumber) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Phone number is required.",
            },
            400
        );
    }

    if (!isValidPhoneNumber(phonenumber)) {
        return JSONResponse(req,
            {
                status: "error",
                message: "Invalid phone number.",
            },
            400
        );
    }

    return true;

}

export { checkForValidEmail , checkForValidPhone };