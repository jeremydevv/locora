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
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electronAPI", {
  windowAction: (action) => electron.ipcRenderer.send("window-action", action),
  onWindowMaximize: (callback) => electron.ipcRenderer.on("window-maximized", callback),
  onWindowUnmaximize: (callback) => electron.ipcRenderer.on("window-unmaximized", callback),
  offWindowMaximize: (callback) => electron.ipcRenderer.removeListener("window-maximized", callback),
  offWindowUnmaximize: (callback) => electron.ipcRenderer.removeListener("window-unmaximized", callback)
});
electron.contextBridge.exposeInMainWorld("mapCache", {
  getCachedTile: (url) => electron.ipcRenderer.invoke("mapCache-get", url),
  saveTile: (url, data) => electron.ipcRenderer.invoke("mapCache-save", url, data),
  cleanupCache: () => electron.ipcRenderer.invoke("mapCache-cleanup")
});
