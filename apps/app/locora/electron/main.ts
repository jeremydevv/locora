import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import path from 'node:path'
import { WindowAction } from '../types'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width : 1920, 
    height: 1080,
    title: 'Locora',
    autoHideMenuBar: false,
    frame : false,
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

  win.on("maximize", () => win!.webContents.send("window-maximized"));
  win.on("unmaximize", () => win!.webContents.send("window-unmaximized"));


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

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

const cacheDir = path.join(app.getPath("userData"), "map_cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

ipcMain.handle("mapCache-get", (_, url: string) => {
  const filePath = path.join(cacheDir, encodeURIComponent(url));
  return fs.existsSync(filePath) ? filePath : null;
});

ipcMain.handle("mapCache-save", (_, url: string, data: Uint8Array) => {
  const filePath = path.join(cacheDir, encodeURIComponent(url));
  fs.writeFileSync(filePath, Buffer.from(data));
  fs.utimesSync(filePath, new Date(), new Date());
});

ipcMain.handle("mapCache-cleanup", () => {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  fs.readdirSync(cacheDir).forEach((file) => {
    const filePath = path.join(cacheDir, file);
    const stats = fs.statSync(filePath);
    if (now - stats.atimeMs > sevenDays) fs.unlinkSync(filePath);
  });
});
app.whenReady().then(createWindow)
