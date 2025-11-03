import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "fs";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: "Locora",
    autoHideMenuBar: false,
    frame: false,
    titleBarStyle: "hidden",
    icon: path.join(process.env.VITE_PUBLIC, "BorderedLocora.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.on("maximize", () => win.webContents.send("window-maximized"));
  win.on("unmaximize", () => win.webContents.send("window-unmaximized"));
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("window-action", (event, action) => {
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
ipcMain.handle("mapCache-get", (_, url) => {
  const filePath = path.join(cacheDir, encodeURIComponent(url));
  return fs.existsSync(filePath) ? filePath : null;
});
ipcMain.handle("mapCache-save", (_, url, data) => {
  const filePath = path.join(cacheDir, encodeURIComponent(url));
  fs.writeFileSync(filePath, Buffer.from(data));
  fs.utimesSync(filePath, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date());
});
ipcMain.handle("mapCache-cleanup", () => {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1e3;
  fs.readdirSync(cacheDir).forEach((file) => {
    const filePath = path.join(cacheDir, file);
    const stats = fs.statSync(filePath);
    if (now - stats.atimeMs > sevenDays) fs.unlinkSync(filePath);
  });
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
