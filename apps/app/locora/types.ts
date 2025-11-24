export type WindowAction = "close" | "minimize" | "maximize";
export interface DataPayload {
    idToken: string | null;
    uid: string | null;
    refreshToken: string | null;
}