import { app, BrowserWindow, ipcMain, protocol } from 'electron'
import { fileURLToPath } from 'node:url'

import path from 'node:path'
import { WindowAction } from '../types'
//import { DeleteSessionToken, LoadSessionToken, UpdateSessionToken } from './SessionHandling/KeyHandler'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let authWin: BrowserWindow | null

app.setName('Locora')
app.setAppUserModelId('org.locora.app')

function CreateMainApplication() {
  win = new BrowserWindow({

    minWidth: 800,
    minHeight: 600,

    maxHeight : 1920,

    width: 1080,
    height: 720,

    title: 'Locora',

    titleBarStyle: 'hidden',
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
  })

  win.webContents.openDevTools();

  win.on("maximize", () => win!.webContents.send("window-maximized"));
  win.on("unmaximize", () => win!.webContents.send("window-unmaximized"));


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

ipcMain.handle("open-authentication-window",async () => {
  authWin = new BrowserWindow({
    width : 480,
    height : 780,

    maxWidth : 480,
    maxHeight : 780,

    minWidth : 480,
    minHeight : 780,
    autoHideMenuBar : true,
    
    fullscreenable : false,

    title: 'Locora',

    accentColor: '#323876',

    roundedCorners: true,

    icon: path.join(process.env.VITE_PUBLIC, 'BorderedLocora.png'),

    parent : undefined,
    alwaysOnTop : true,
    focusable : true,
    modal : true,
    show : false,

    webPreferences : {
      sandbox : false,
      nodeIntegration : false,
      contextIsolation : true,
      backgroundThrottling : false,
      preload : path.join(__dirname,"preload-authentication.mjs")
    }
  })

  if (process.env.NODE_ENV == "development") {
    authWin.loadURL("http://localhost:3000/auth")
  } else {
    authWin.loadURL("https://locora.org/auth")
  }

  authWin.once("ready-to-show",() => {
    authWin?.show()
    authWin?.focus()
  })

})

ipcMain.handle("token-update", async (_,userId : string, token: string) => {
})

ipcMain.handle("token-fetch", async (_,userId : string) => {
})

ipcMain.handle("token-delete", async (_,userId : string) => {
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

app.whenReady().then(CreateMainApplication).then(() => {
  protocol.registerStringProtocol('locora',(request,callback) => {
    const url = new URL(request.url)

    const idToken = url.searchParams.get("idToken")
    const uid = url.searchParams.get("uid")

    console.log(idToken,uid)

    authWin?.close()
    callback({data: "OK" , mimeType: "text/plain"})
  })
})
