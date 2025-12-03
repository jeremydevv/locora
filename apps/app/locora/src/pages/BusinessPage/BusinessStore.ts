let CurrentPayload : BusinessPayload | null = null;

interface BusinessPayload {
    placeId : string,
    rating : number
}

export type onBusinessDataChange = (businessData : BusinessPayload) => void

const OnChangeListeners : (onBusinessDataChange[]) = []

function ChangeBusinessData(businessData : BusinessPayload) {
    CurrentPayload = businessData
    OnChangeListeners.forEach((fn : onBusinessDataChange) => fn?.(businessData))
}

function OnBusinessDataChange(fn : onBusinessDataChange) {
    OnChangeListeners.push(fn)

    return () => {
        OnChangeListeners.filter( (val) => val !== fn )
    }
}

function getBusinessData() : BusinessPayload | null{
    return CurrentPayload
}

export { OnBusinessDataChange , ChangeBusinessData, getBusinessData }