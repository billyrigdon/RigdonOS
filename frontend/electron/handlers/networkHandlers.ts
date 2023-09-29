import { IpcMainEvent, ipcMain } from "electron";
import { exec } from "child_process";

export const initializeNetworkHandlers = (): void => {
	ipcMain.on("connect-to-wifi", (_, ssid: string, password: string) => {
		exec(
			`nmcli dev wifi connect ${ssid} password ${password}`,
			(error, stdout) => {
				if (error) {
					console.error(`Error connecting to WiFi: ${error}`);
					return;
				}
				console.log(`Connected to WiFi: ${stdout}`);
			}
		);
	});

	ipcMain.on(
		"set-static-ip",
		(_, interfaceName: string, ip: string, gateway: string, dns: string) => {
			exec(
				`nmcli con mod ${interfaceName} ipv4.addresses ${ip} ipv4.gateway ${gateway} ipv4.dns ${dns} ipv4.method manual`,
				(error, stdout) => {
					if (error) {
						console.error(`Error setting static IP: ${error}`);
						return;
					}
					console.log(`Static IP set: ${stdout}`);
				}
			);
		}
	);

	ipcMain.on("set-dhcp", (_, interfaceName: string) => {
		exec(`nmcli con mod ${interfaceName} ipv4.method auto`, (error, stdout) => {
			if (error) {
				console.error(`Error setting to DHCP: ${error}`);
				return;
			}
			console.log(`Switched to DHCP: ${stdout}`);
		});
	});

	ipcMain.on("toggle-airplane-mode", (_, status: "on" | "off") => {
		exec(`nmcli radio wifi ${status}`, (error, stdout) => {
			if (error) {
				console.error(`Error toggling airplane mode: ${error}`);
				return;
			}
			console.log(`Airplane mode toggled: ${stdout}`);
		});
	});

	ipcMain.on("get-available-networks", (event: IpcMainEvent) => {
		exec(`nmcli -t -f ssid dev wifi`, (error, stdout) => {
			if (error) {
				console.error(`Error fetching available networks: ${error}`);
				return;
			}
			const networks = stdout.trim().split("\n");
			event.reply("available-networks", networks);
		});
	});

	ipcMain.on("get-current-network", (event: IpcMainEvent) => {
		exec(
			`nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d: -f2`,
			(error, stdout) => {
				if (error) {
					console.error(`Error fetching current network: ${error}`);
					return;
				}
				event.reply("current-network", stdout.trim());
			}
		);
	});


};
