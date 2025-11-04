import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

import path from 'node:path'
import { WindowAction } from '../types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

app.setName('Locora')
app.setAppUserModelId('org.locora.app')

function createWindow() {
  win = new BrowserWindow({
    width : 1080, 
    height: 720,
    title: 'Locora',
    autoHideMenuBar: false,
    frame : false,
    accentColor: '#276ff5',
    roundedCorners: true,
    simpleFullscreen: true,
    titleBarStyle: 'hidden',
    icon: path.join(process.env.VITE_PUBLIC, 'BorderedLocora.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  win.webContents.openDevTools();

  win.on("maximize", () => win!.webContents.send("window-maximized"));
  win.on("unmaximize", () => win!.webContents.send("window-unmaximized"));


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// topbar window actions
ipcMain.on("window-action", (event, action : WindowAction) => {
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

app.whenReady().then(createWindow)
