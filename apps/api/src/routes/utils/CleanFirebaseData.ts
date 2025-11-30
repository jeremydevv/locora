import { DataPayload } from "../types";

export default function cleanFirebaseData(fields : Record<string,string>) : DataPayload { 
    const cleaned: Record<string, any> = {};
    for (const key in fields) {
        const valueObj : any = fields[key];
        if ('stringValue' in valueObj) {
            cleaned[key] = valueObj.stringValue;
        } else if ('integerValue' in valueObj) {
            cleaned[key] = Number(valueObj.integerValue);
        } else if ('doubleValue' in valueObj) {
            cleaned[key] = Number(valueObj.doubleValue);
        } else if ('booleanValue' in valueObj) {
            cleaned[key] = valueObj.booleanValue;
        } else if ('timestampValue' in valueObj) {
            cleaned[key] = valueObj.timestampValue;
        } else {
            cleaned[key] = valueObj;
        }
    }
    return cleaned as DataPayload;
}