import { app, BrowserWindow, ipcMain } from "electron";
import { spawn } from "child_process";
import { createClient, eventMask, createWindow } from "x11";

let X;
let desktopWindow: BrowserWindow;

// Used to track BrowserWindow containers
const browserWindowIds = new Set();
const openedWinows: Set<number> = new Set();
// Add to set to check if browserWindow in event listener
const addBrowserWindowId = (windowId: number) => {
  browserWindowIds.add(windowId);
};

const wrapX11App = (wid: number) => {};

// Get Id to create/map/reparent BrowserWindows, also add to set
const getElectronWindowId = (browserWindow: BrowserWindow): number => {
  const nativeHandle = browserWindow.getNativeWindowHandle();
  const wid = nativeHandle.readUint32LE(0);
  addBrowserWindowId(wid);
  return wid;
};

// Initilize desktop and X11 client
const initDesktop = async () => {
  desktopWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
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

  desktopWindow.loadURL("https://billyrigdon.dev");
  desktopWindow.maximize();
  desktopWindow.setFullScreen(true);
  desktopWindow.setFocusable(false);
  desktopWindow.setAlwaysOnTop(false);
  const desktopWid = getElectronWindowId(desktopWindow);
  initX11Client(desktopWid);
};

const initX11Client = (desktopWid: number) => {
  createClient(async (err, display) => {
    X = display.client;
    const root = display.screen[0].root;

    X.ChangeWindowAttributes(
      root,
      { eventMask: X.eventMask.SubstructureNotify },
      (err) => {
        if (err) {
          console.error("Failed to set event mask:", err);
          return;
        }

        X.on("error", (err) => {
          console.error(`X11 Error: ${err}`);
        });

        X.on("event", (ev) => {});
      }
    );
    X.MapWindow(desktopWid);

    // Open test app
    // openApp(desktopWid, 800, 600);

    X.on("error", (err) => {
      console.error(`X11 Error: ${err}`);
    });

    X.on("event", (ev) => {
      if (ev.name === "CreateNotify") {
        if (!openedWinows.has(ev.wid)) {
          openedWinows.add(ev.wid);
          openApp(ev.wid, desktopWid, 300, 400);
        } else {
          console.log("No thanks, I already got one.");
        }
      }
    });
  });
};

// Create X11 container window with desktop as parent
// Create React component and reparent inside X11 container
const openApp = (
  appWid: number,
  parentId: number,
  width: number,
  height: number
) => {
  const electronWindow = new BrowserWindow({
    width: width,
    height: 50,
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
  electronWindow.loadFile("./desktop.html");
  electronWindow.setFullScreen(true);
  electronWindow.setFocusable(false);
  electronWindow.setAlwaysOnTop(true);
  const electronWid = getElectronWindowId(electronWindow);
  openedWinows.add(electronWid);

  const x11ContainerId = X.AllocID();
  openedWinows.add(x11ContainerId);

  // Desktop should be root in almost every situation
  X.CreateWindow(
    x11ContainerId,
    parentId,
    55,
    60,
    width,
    height - 50, // For titlebar
    0,
    0,
    0,
    0,
    { eventMask: eventMask, backgroundPixel: 10 }
  );

  // Reparent Electron container into x11 window container
  X.MapWindow(x11ContainerId);
  X.ReparentWindow(electronWid, x11ContainerId, 0, 0);
  X.MapWindow(electronWid);

  X.ReparentWindow(appWid, electronWid, 0, 50);
  console.log("reparented");
  X.MapWindow(appWid);
};

app.whenReady().then(() => {
  initDesktop();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      initDesktop();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//---------------------------------------------- REACT EVENTS----------------------------------------------------

// Listen for an "onLaunchApp" IPC event
ipcMain.on("onLaunchApp", (event, appCommand) => {
  const child = spawn(appCommand);

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});
