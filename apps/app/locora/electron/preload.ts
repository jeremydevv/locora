import { ipcRenderer, contextBridge } from 'electron'
import { DataPayload, WindowAction } from '../types'

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
});

contextBridge.exposeInMainWorld("authAPI", {
    getIdToken : () => ipcRenderer.invoke("get-id-token"),
    getRefreshToken : () => ipcRenderer.invoke("get-refresh-token"),
    getUid : () => ipcRenderer.invoke("get-uid"),
    logout : () => ipcRenderer.invoke("logout"),

    onAuthenticationChange : (callback : ({uid,idToken,refreshToken} : DataPayload) => void) => {
        ipcRenderer.on("authenticated", (_, data : DataPayload) => {
            callback({
                uid : data.uid || "",
                idToken : data.idToken || "",
                refreshToken : data.refreshToken || ""
            })
        })
        return () => {
            ipcRenderer.off("authenticated", () => {})
        }
    },

    getSession : () => ipcRenderer.invoke("get-session"),
})

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
    };
    authAPI?: {
        getIdToken : (callback : (idToken : string | null) => void) => Promise<string | null>,
        getRefreshToken : (callback : (refreshToken : string | null) => void) => Promise<string | null>,
        getUid : (callback : (uid : string | null) => void) => Promise<string | null>,
        getSession : (callback : (sessionData : DataPayload) => void) => Promise<Record<string,string> | null>,
        onAuthenticationChange : (callback : ({uid,idToken,refreshToken} : DataPayload) => void) => () => void
        logout : () => Promise<void>,
    }
  }
}