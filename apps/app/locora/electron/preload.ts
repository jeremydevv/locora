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

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld("electronAPI", {
  windowAction: (action: "minimize" | "maximize" | "close") => ipcRenderer.send("window-action", action),
  onWindowMaximize: (callback: () => void) => ipcRenderer.on("window-maximized", callback),
  onWindowUnmaximize: (callback: () => void) => ipcRenderer.on("window-unmaximized", callback),
  offWindowMaximize: (callback: () => void) => ipcRenderer.removeListener("window-maximized", callback),
  offWindowUnmaximize: (callback: () => void) => ipcRenderer.removeListener("window-unmaximized", callback),
});
declare global {
  interface Window {
    electronAPI?: {
      windowAction: (action: WindowAction) => void;
      onWindowMaximize: (callback: () => void) => void;
      onWindowUnmaximize: (callback: () => void) => void;
      offWindowMaximize: (callback: () => void) => void;
      offWindowUnmaximize: (callback: () => void) => void;
    };
  }
}