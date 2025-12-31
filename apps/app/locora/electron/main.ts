import { app, BrowserWindow, globalShortcut, ipcMain, protocol } from 'electron'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'
const userStorage = new Store()

import path from 'node:path'

import { DataPayload, WindowAction } from '../types'
import Keytar from 'keytar'
import baseAPIUrl from '../src/utilities/BaseAPIUrl'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, '../.env') })

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const Environment = process.env['VITE_ENVIRONMENT']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let authWin: BrowserWindow | null

app.setName('Locora')
app.setAppUserModelId('org.locora.app')

const TitleBarStyle = process.platform !== 'darwin' ? 'hidden' : 'hiddenInset'

function CreateMainApplication() {
  win = new BrowserWindow({

    minWidth: 800,
    minHeight: 600,

    maxHeight: 1920,

    width: 1080,
    height: 720,

    title: 'Locora',

    titleBarStyle: TitleBarStyle,
    autoHideMenuBar: false,
    frame: false,

    accentColor: '#323876',

    roundedCorners: true,
    simpleFullscreen: true,

    icon: path.join(process.env.VITE_PUBLIC, 'BorderedLocora.png'),

    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },

  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    win?.webContents.send('platform', process.platform)
  })


  win.on("maximize", () => win!.webContents.send("window-maximized"));
  win.on("unmaximize", () => win!.webContents.send("window-unmaximized"));


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

ipcMain.handle("open-authentication-window", async () => {
  authWin = new BrowserWindow({
    width: 480,
    height: 780,

    maxWidth: 480,
    maxHeight: 780,

    minWidth: 480,
    minHeight: 780,
    autoHideMenuBar: true,

    fullscreenable: false,

    title: 'Locora | Authentication',

    accentColor: '#323876',

    roundedCorners: true,

    icon: path.join(process.env.VITE_PUBLIC, 'BorderedLocora.png'),

    parent: undefined,
    alwaysOnTop: process.platform !== "darwin",
    focusable: true,
    show: false,

    webPreferences: {
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.mjs")
    }
  })

  if (Environment == "dev") {
    authWin.loadURL("http://localhost:3067/auth")
  } else if(Environment == "main") {
    authWin.loadURL("https://locora.org/auth")
  } else {
    authWin.loadURL(`https://${Environment}.locora.pages.dev/auth`)
  }

  if (process.platform === "darwin") {
    authWin?.show()
  }

  authWin.on("ready-to-show", () => {
    authWin?.show()
    authWin?.focus()
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateMainApplication()
  }
})


// topbar window actions
ipcMain.on("window-action", (_, action: WindowAction) => {
  if (!win) return;

  switch (action) {
    case "close":
      win.close();
      break;
    case "minimize":
      win.minimize();
      break;
    case "maximize":
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
      break;
  }
});

const data : DataPayload = {
  idToken: null,
  uid: null,
  refreshToken: null,
  expiresIn : null
}

// handling auth requests

ipcMain.handle("get-id-token", async () => {

  if (data.idToken !== null) {
    return data.idToken
  }

  return await Keytar.getPassword("org.locora.app", `${userStorage.get("uid")}-idToken` || "")

})

ipcMain.handle("get-device-type", async () => {
  return process.platform
})

ipcMain.handle("get-uid", async () => {
  return userStorage.get("uid")
})

ipcMain.handle("get-refresh-token", async () => {
  return await Keytar.getPassword("org.locora.app", `${userStorage.get("uid")}-refreshToken` || "")
})

ipcMain.handle("get-session", async () => {
  return {
    idToken: data.idToken,
    uid: data.uid,
    refreshToken: data.refreshToken
  }
})

ipcMain.handle("get-expires-in", async () => {
  return userStorage.get("expiresIn")
})

ipcMain.handle("logout", async () => {
  const uid = userStorage.get("uid") as string

  await Promise.all([
    Keytar.deletePassword("org.locora.app", `${uid}-idToken`),
    Keytar.deletePassword("org.locora.app", `${uid}-refreshToken`)
  ])

  userStorage.delete("uid")

  data.idToken = null
  data.refreshToken = null
  data.uid = null

  return true
})

ipcMain.handle("get-session-information", async (_,key : string) => {
  return userStorage.get(key)
})

ipcMain.handle("save-session-information", async (_, newData) => {
  for (const key in newData) {
    userStorage.set(key, newData[key])
  }
})

ipcMain.handle("refresh-session-data", async () => {

  try {
    
    const RefreshToken = await Keytar.getPassword(`org.locora.app`,`${userStorage.get("uid")}-refreshToken`)
    const idToken = await Keytar.getPassword(`org.locora.app`,`${userStorage.get("uid")}-idToken`)

    const Result = await fetch(baseAPIUrl() + "/v1/auth/refresh", {
      body : JSON.stringify({RefreshToken : RefreshToken}),
      headers : {
        "Authorization" : `Bearer ${idToken}`,
        "Content-Type" : "application/json"
      },
      method : "POST"
    })

    const contentType = Result.headers.get("content-type")

    if (!Result.ok || (!contentType?.includes("application/json"))) {
      const Data = await Result.text()
      console.log("the refresh failed to occur")
      console.log(Data)
      return null
    }

    const Data = await Result.json()

    console.log(Data)

    userStorage.set("uid", Data.uid || "")

    if (!Data.expiresIn) {
      userStorage.set("expiresIn", (+Date.now() + 0) || "")
    } else {
      userStorage.set("expiresIn", (+Date.now() + (+Data.expiresIn)*1000) || "")

    }

    await Promise.all([
      Keytar.setPassword("org.locora.app", `${Data.uid}-idToken` || "" , Data.idToken || ""),
      Keytar.setPassword("org.locora.app", `${Data.uid}-refreshToken` || "" , Data.refreshToken || "")
    ])

    data.uid = Data.uid
    data.refreshToken = Data.refreshToken
    data.idToken = Data.idToken

    return Data

  } catch(err) {
    console.log(err)
  }

})

app.whenReady().then(CreateMainApplication).then(() => {

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    authWin?.webContents.toggleDevTools()
    win?.webContents.toggleDevTools()
  })

  protocol.registerStringProtocol('locora', async (request) => {
    const url = new URL(request.url)

    const idToken = url.searchParams.get("idToken")
    const uid = url.searchParams.get("uid")
    const refreshToken = url.searchParams.get("refreshToken")
    const expiresIn = url.searchParams.get("expiresIn")

    userStorage.set("uid", uid || "")

    if (!expiresIn) {
      userStorage.set("expiresIn", (+Date.now() + 0) || "")
    } else {
      userStorage.set("expiresIn", (+Date.now() + ((+expiresIn)*1000)) || "")
    }

    await Promise.all([
      Keytar.setPassword("org.locora.app", `${uid}-idToken` || "" , idToken || ""),
      Keytar.setPassword("org.locora.app", `${uid}-refreshToken` || "" , refreshToken || "")
    ])

    // keeping in main.ts
    data.idToken = idToken
    data.uid = uid
    data.refreshToken = refreshToken
    data.expiresIn = userStorage.get("expiresIn") as string

    // sending for current session view
    win?.webContents.send("authenticated", {
      idToken: idToken,
      uid: uid,
      refreshToken: refreshToken,
      expiresIn: expiresIn
    })

    setTimeout(() => {
      authWin?.close()
    }, 500);

  })

})