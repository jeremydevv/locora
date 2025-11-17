import { app, ipcMain, BrowserWindow, protocol } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let authWin;
app.setName("Locora");
app.setAppUserModelId("org.locora.app");
function CreateMainApplication() {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    maxHeight: 1920,
    width: 1080,
    height: 720,
    title: "Locora",
    titleBarStyle: "hidden",
    autoHideMenuBar: false,
    frame: false,
    accentColor: "#323876",
    roundedCorners: true,
    simpleFullscreen: true,
    icon: path.join(process.env.VITE_PUBLIC, "BorderedLocora.png"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.webContents.openDevTools();
  win.on("maximize", () => win.webContents.send("window-maximized"));
  win.on("unmaximize", () => win.webContents.send("window-unmaximized"));
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
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
    title: "Locora",
    accentColor: "#323876",
    roundedCorners: true,
    icon: path.join(process.env.VITE_PUBLIC, "BorderedLocora.png"),
    parent: void 0,
    alwaysOnTop: true,
    focusable: true,
    modal: true,
    show: false,
    webPreferences: {
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false,
      preload: path.join(__dirname$1, "preload-authentication.mjs")
    }
  });
  if (process.env.NODE_ENV == "development") {
    authWin.loadURL("http://localhost:3000/auth");
  } else {
    authWin.loadURL("https://locora.org/auth");
  }
  authWin.once("ready-to-show", () => {
    authWin?.show();
    authWin?.focus();
  });
});
ipcMain.handle("token-update", async (_, userId, token) => {
});
ipcMain.handle("token-fetch", async (_, userId) => {
});
ipcMain.handle("token-delete", async (_, userId) => {
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateMainApplication();
  }
});
ipcMain.on("window-action", (_, action) => {
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
  protocol.registerStringProtocol("locora", (request, callback) => {
    const url = new URL(request.url);
    const idToken = url.searchParams.get("idToken");
    const uid = url.searchParams.get("uid");
    console.log(idToken, uid);
    authWin?.close();
    callback({ data: "OK", mimeType: "text/plain" });
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
