import { app, BrowserWindow } from 'electron';
import { initializeNetworkHandlers } from './handlers/networkHandlers';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('../index.html');
};

app.whenReady().then(() => {
  createWindow();
  initializeNetworkHandlers();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
