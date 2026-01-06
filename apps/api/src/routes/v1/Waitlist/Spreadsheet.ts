import { env } from "cloudflare:workers";
import JSONResponse from "../../utils/JSONResponse";
import { Env } from "../../types";
import { getAccessToken } from "./FetchAccess";

async function isInSheet(req: Request, info: string) {

    const access_token = await getAccessToken();
    const spreadsheet_id = (env as Env).SPREADSHEET_ID;

    var InSheet = false

    try {
        const [EmailData] = await Promise.all([
            fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/A:A`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                }
            ),
        ])

        const cleanedNumber = info.replace(/[\s()-]/g, "").replace(/^\+/, "");

        const emailData: { values: string[] } = await EmailData.json();
        const phoneData: { values: string[] } = await emailData;

        const emails: string[] = (emailData.values || []).slice(1).map(row => row[0]?.toLowerCase().trim());
        const phoneNumbers: string[] = (phoneData.values || []).slice(1).map(row => row[0]?.replace(/[\s()-]/g, "").toLowerCase().trim()).filter(Boolean);

        if (emails.includes(info.toLowerCase()) || phoneNumbers.includes(cleanedNumber)) {
            InSheet = true
        }
        
        return InSheet

    } catch (error) {
        console.error(error);
        return JSONResponse(req, { status: "error", message: "Error adding info to spreadsheet." }, 500);
    }

}

async function addToEmails(req: Request, email: string) {

    const access_token = await getAccessToken();
    const spreadsheet_id = (env as Env).SPREADSHEET_ID;

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/A:A:append?valueInputOption=USER_ENTERED`,
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

    } catch (error) {
        console.error(error);
        return JSONResponse(req, { status: "error", message: "Error adding email to spreadsheet." }, 500);
    }

    return JSONResponse(req, { status: "success", message: "Email added to spreadsheet." });

}

export { addToEmails, isInSheet }