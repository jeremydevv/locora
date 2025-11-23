import { ipcRenderer, contextBridge } from 'electron'
import { WindowAction } from '../types'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

globalThis.addEventListener("message", (event) => {
    console.log(event,event.data)
    if (event.data?.type == "locora-authentication") {
        ipcRenderer.send("authenticated",event.data)
    }
})

contextBridge.exposeInMainWorld("electronAPI", {
  onPlatform(callback: (event: Electron.IpcRendererEvent, platform: string) => void) {
    ipcRenderer.on('platform', (_, platform) => callback(_,platform))
  },
  windowAction: (action: "minimize" | "maximize" | "close") => ipcRenderer.send("window-action", action),
  onWindowMaximize: (callback: () => void) => ipcRenderer.on("window-maximized", callback),
  onWindowUnmaximize: (callback: () => void) => ipcRenderer.on("window-unmaximized", callback),
  offWindowMaximize: (callback: () => void) => ipcRenderer.removeListener("window-maximized", callback),
  offWindowUnmaximize: (callback: () => void) => ipcRenderer.removeListener("window-unmaximized", callback),
  openAuthenticationWindow : () => ipcRenderer.invoke("open-authentication-window"),
  updateSessionToken : (userId: string, token: string) => ipcRenderer.invoke("token-update", userId, token),
  fetchSessionToken : (userId: string) => ipcRenderer.invoke("token-fetch", userId),
  deleteSessionToken : (userId: string) => ipcRenderer.invoke("token-delete", userId),
});

declare global {
  interface Window {
    electronAPI?: {
      onPlatform: (callback: (event: Electron.IpcRendererEvent, platform: string) => void) => void;
      windowAction: (action: WindowAction) => void;
      onWindowMaximize: (callback: () => void) => void;
      onWindowUnmaximize: (callback: () => void) => void;
      offWindowMaximize: (callback: () => void) => void;
      offWindowUnmaximize: (callback: () => void) => void;
      openAuthenticationWindow : () => Promise<void>,
      updateSessionToken : (userId: string, token: string) => null,
      fetchSessionToken : (userId: string) => string,
      deleteSessionToken : (userId: string) => null,
    };
  }
}