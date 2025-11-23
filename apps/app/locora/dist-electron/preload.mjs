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
globalThis.addEventListener("message", (event) => {
  console.log(event, event.data);
  if (event.data?.type == "locora-authentication") {
    electron.ipcRenderer.send("authenticated", event.data);
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
  openAuthenticationWindow: () => electron.ipcRenderer.invoke("open-authentication-window"),
  updateSessionToken: (userId, token) => electron.ipcRenderer.invoke("token-update", userId, token),
  fetchSessionToken: (userId) => electron.ipcRenderer.invoke("token-fetch", userId),
  deleteSessionToken: (userId) => electron.ipcRenderer.invoke("token-delete", userId)
});
