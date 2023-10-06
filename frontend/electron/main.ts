// import { app, BrowserWindow } from 'electron';
// import { initializeNetworkHandlers } from './handlers/networkHandlers';

// const createWindow = () => {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true, 
//       contextIsolation: false,
//     },
//   });

//   mainWindow.loadFile('../index.html');
// };

// app.whenReady().then(() => {
//   createWindow();
//   initializeNetworkHandlers();
// });

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', function () {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });


import { app, BrowserWindow, ipcMain } from 'electron';
import { exec, spawn } from 'child_process';
import { createClient, eventMask, createWindow } from 'x11';
import * as os from "os";
import { IXClient, IXDisplay } from '../src/Types/X11';


let launchedApp: string | null = null;
let X;
let desktopWindow: BrowserWindow;
let desktopTopWid: number;
// Used to track BrowserWindow containers
const browserWindowIds = new Set();


const moveWindowToBottom = (windowId) => {
  console.log('move to bottom')
};

const addBrowserWindowId = (browserWindow) => {
  const windowId = getElectronWindowId(browserWindow);
  browserWindowIds.add(windowId);
};

const getElectronWindowId = (browserWindow: BrowserWindow): number => {
  const hbuf = browserWindow.getNativeWindowHandle();
  // const wid = nativeHandle.readUint32LE(0);
  return os.endianness() === "LE" ? hbuf.readInt32LE() : hbuf.readInt32BE();;
}

// Function to set a custom X11 property to indicate a BrowserWindow
const setBrowserWindowPropertyAsync = (browserWindow) => {
  return new Promise<void>((resolve, reject) => {
    const windowId = getElectronWindowId(browserWindow);
    const atomName = 'IS_ELECTRON_BROWSER_WINDOW';
    X?.InternAtom(false, atomName, (err, atom) => {
      if (err) return reject(err);
      X?.ChangeProperty(0, windowId, atom, X?.atoms.STRING, 8, 'replace', 'true', () => {
        resolve();  
      });
    });
  });
};

// Function to check if a given window ID is a BrowserWindow
const isBrowserWindow = async (wid, X) => {
  return new Promise((resolve, reject) => { 
    X?.InternAtom(false, 'IS_ELECTRON_BROWSER_WINDOW', (err, atom) => {
      if (err) {
        return resolve(false);
      }
      X?.GetProperty(0, wid, atom, 0, 4, (err, prop) => {
        if (err) {
          return resolve(false);
        }
        if (prop.data.toString() === 'true') {
          return resolve(true);
        }
        return resolve(false);
      });
    });
  });
};


const createWrapperWindow = (width, height) => {
  const elecWindow = new BrowserWindow({
    width: width,
    height: height,
    show: true,
    frame: false,
    alwaysOnTop:true
  });

  elecWindow.loadFile("../lib/index.html");
  elecWindow.webContents.openDevTools();

  return elecWindow;
};

const wrapX11App = async (x11WindowId, reactUrl) => {
  console.log('wrapping' + x11WindowId + "with" + reactUrl)
  if (X) {
    console.log('wrapping' + x11WindowId + "with" + reactUrl)
    // Get geometry of the x11 window
    X.GetGeometry(x11WindowId, async (err, geometry) => {
      if (err) {
        console.log('Failed to get geometry:', err);
        return;
      }
      const { width, height } = geometry;

      // Create new Electron BrowserWindow
      const wrapperWindow = createWrapperWindow(width, height);

      // Reparent x11 window into wrapperWindow
      const electronWindowId = getElectronWindowId(wrapperWindow ? wrapperWindow : null);
      X.ReparentWindow(x11WindowId, electronWindowId, 0, 50);
    });
  }
};

// Initialize Desktop Environment
const _init = () => {
  const desktopWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: false,
    resizable: false,
    movable: false,
    focusable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  desktopWindow.loadFile('../index.html');
  desktopWindow.webContents
  desktopWindow.setFocusable(false);
  desktopWindow.setAlwaysOnTop(false);
  desktopTopWid = getElectronWindowId(desktopWindow);

    createClient((err, display: IXDisplay) => {
      X = display.client;
      const root = X.root;

      const wid1 = X.AllocID();
      
      console.log('wtf-----------------')
      // // Create X11 desktop and reparent electron app inside of it
      X.CreateWindow(
        wid1,
        display.screen[0].root,
        0,
        0,
        1000,
        800,
        0,
        0,
        0,
        0,
        { eventMask: eventMask, backgroundPixel: 92 }
      );
      X.MapWindow(desktopTopWid);
      X.MapWindow(wid1);
      X.ReparentWindow(desktopTopWid, wid1, 0, 0);

      // FIX ME: create wrapper window, grab Id, and reparent it to be contained within desktop window 
      const wrapperWindow: BrowserWindow = createWrapperWindow(300, 400);
      const wrapperWindowId = getElectronWindowId(wrapperWindow);

        
      // Create X11 desktop and reparent electron app inside of it
      const wid2 = X.AllocID();    
      X.CreateWindow(
        wid2,
        display.screen[0].root,
        0,
        0,
        300,
        400,
        0,
        0,
        0,
        0,
        { eventMask: eventMask, backgroundPixel: 92 }
      );
      X.MapWindow(wrapperWindowId)
      X.MapWindow(wid2)
      // X.ReparentWindow(wid2, wid1, 0, 0);
      X.ReparentWindow(wrapperWindowId, wid2, 0, 0);
      
      X.on('error', (err) => {
        console.error(`X11 Error: ${err}`);
      });

      // X.on("event", async (ev) => {
      //   console.log(ev)
      //   if (ev.type == 16) { // CreateNotify
      //     const isElectronWrapper = await isBrowserWindow(ev.wid, X);
      //     if (ev.parent === root && !isElectronWrapper) {
      //       const newWID = ev.wid;
      //       console.log('New top-level window created:', newWID);
      //       // wrapX11App(newWID, 'lib/titlebar.html');
      //     }
      //   }
      // });
  })

}

app.whenReady().then(() => {
  //Main desktop  
  _init();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) _init()
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



//---------------------------------------------- REACT EVENTS----------------------------------------------------

// Listen for an "onLaunchApp" IPC event
ipcMain.on('onLaunchApp', (event, appCommand) => {
  const child = spawn(appCommand);

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  // Set the launched app
  launchedApp = appCommand;
});