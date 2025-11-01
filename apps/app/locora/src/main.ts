import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import started from 'electron-squirrel-startup';
import isDev from 'electron-is-dev'; // npm i electron-is-dev

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (started) app.quit();

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Name of your built renderer folder
const RENDERER_NAME = 'locora'; // change if different

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    // Vite dev server URL (default)
    mainWindow.loadURL('http://localhost:5173');
  } else {
    // Production build
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${RENDERER_NAME}/index.html`)
    );
  }

  // Optionally open DevTools in dev mode
  if (isDev) mainWindow.webContents.openDevTools();
};

// App lifecycle
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
