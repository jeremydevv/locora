import { env } from "cloudflare:workers";
import JSONResponse from "../../utils/JSONResponse";
import { Env } from "../../types";
import { getAccessToken } from "./FetchAccess";

async function addToEmails(req : Request,email: string) {

    const access_token = await getAccessToken();
    const spreadsheet_id = (env as Env).SPREADSHEET_ID;

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/A1:append?valueInputOption=USER_ENTERED`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: [[email]] }),
            }
        );

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
        return JSONResponse(req, { status: "error", message: "Error adding email to spreadsheet." }, 500);
    }

    console.log("the email was added")

    return JSONResponse(req, { status: "success", message: "Email added to spreadsheet." });

}

export { addToEmails }