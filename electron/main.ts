import { app, BrowserView, BrowserWindow, ipcMain } from "electron";
import { initializeNetworkHandlers } from "./handlers/networkHandlers";
import path from "path";
import { exec } from "child_process";
import * as x11 from "x11";

const createWindow = () => {};

async function findNewWindow(title: string): Promise<number> {
	return new Promise((resolve, reject) => {
		exec("wmctrl -l", (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing wmctrl: ${error}`);
				reject(error);
				return;
			}

			const lines = stdout.split("\n");
			for (const line of lines) {
				if (line.includes(title)) {
					// Extract the window ID (it's in hex format)
					const hexWindowId = line.split(" ")[0];
					const windowId = parseInt(hexWindowId, 16);
					resolve(windowId);
					return;
				}
			}
			reject(new Error("Window not found"));
		});
	});
}

app.whenReady().then(() => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	mainWindow.loadFile("../index.html");
	initializeNetworkHandlers();

	ipcMain.on("frame", (event, frame: Buffer) => {
		mainWindow.webContents.send("frame", frame);
	});

	ipcMain.on("start-browser", () => {
		exec(
			"npm start",
			{ cwd: path.join(__dirname, "apps", "min") },
			(error, stdout, stderr) => {
				if (error) {
					console.error(`Error executing npm start: ${error}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
				console.error(`stderr: ${stderr}`);
			}
		);
	});

	function captureFrame(windowId: number): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			X.GetImage(
				0,
				windowId,
				0,
				0,
				400,
				400,
				0xffffffff,
				(err: Error, image: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(image.data);
					}
				}
			);
		});
	}

	ipcMain.on("start-app", () => {
		// Start xclock using the virtual display
		exec("xclock", async (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing xclock: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);

			try {
				const newWindowId = await findNewWindow("xclock");
				console.log(newWindowId);

				setInterval(() => {
					captureFrame(newWindowId)
						.then((frame: Buffer) => {
							if (mainWindow) {
								mainWindow.webContents.send("frame", frame);
							}
						})
						.catch((err: Error) => console.error(err));
				}, 1000 / 30); // 30 FPS
			} catch (err) {
				console.log("failed");
				console.error(err);
			}
		});
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
