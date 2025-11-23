"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
electron.contextBridge.exposeInMainWorld("electronAPI", {
  onPlatform(callback) {
    electron.ipcRenderer.on("platform", (_, platform) => callback(_, platform));
  },
  windowAction: (action) => electron.ipcRenderer.send("window-action", action),
  onWindowMaximize: (callback) => electron.ipcRenderer.on("window-maximized", callback),
  onWindowUnmaximize: (callback) => electron.ipcRenderer.on("window-unmaximized", callback),
  offWindowMaximize: (callback) => electron.ipcRenderer.removeListener("window-maximized", callback),
  offWindowUnmaximize: (callback) => electron.ipcRenderer.removeListener("window-unmaximized", callback),
  openAuthenticationWindow: () => electron.ipcRenderer.invoke("open-authentication-window")
});
electron.contextBridge.exposeInMainWorld("authAPI", {
  getIdToken: () => electron.ipcRenderer.invoke("get-id-token"),
  getRefreshToken: () => electron.ipcRenderer.invoke("get-refresh-token"),
  getUid: () => electron.ipcRenderer.invoke("get-uid"),
  onAuthenticationChange: (callback) => {
    electron.ipcRenderer.on("authenticated", (_, data) => {
      callback({
        uid: data.uid || "",
        idToken: data.idToken || "",
        refreshToken: data.refreshToken || ""
      });
    });
    return () => {
      electron.ipcRenderer.off("authenticated", () => {
      });
    };
  },
  getSession: () => electron.ipcRenderer.invoke("get-session")
});
