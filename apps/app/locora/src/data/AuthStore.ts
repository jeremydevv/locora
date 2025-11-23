const Payload: {
    idToken: string,
    uid: string,
    refreshToken?: string
} = {
    idToken: "",
    uid: "",
    refreshToken: ""
}

async function GetIdToken(): Promise<string | null> {
    if (Payload.idToken !== "") {
        return Payload.idToken
    }

    const result = await window.authAPI?.getIdToken((idToken) => {
        return idToken
    })

    if (result) {
        Payload.idToken = result
        return result
    }

    return null
}

async function GetUid(): Promise<string | null> {
    if (Payload.uid !== "") {
        return Payload.uid
    }

    const session = await window.authAPI?.getSession((sessionData) => {
        return sessionData.uid
    })

    if (session?.uid) {
        Payload.uid = session.uid
        return session.uid
    }

    return null
}

async function GetRefreshToken(): Promise<string | null> {
    if (Payload.refreshToken && Payload.refreshToken !== "") {
        return Payload.refreshToken
    }

    const session = await window.authAPI?.getSession((sessionData) => {
        return sessionData.refreshToken
    })

    if (session?.refreshToken) {
        Payload.refreshToken = session.refreshToken
        return session.refreshToken
    }

    return null
}

export { GetIdToken, GetUid, GetRefreshToken }