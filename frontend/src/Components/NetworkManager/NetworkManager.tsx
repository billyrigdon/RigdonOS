import React, { useEffect, useState } from "react";
import "./NetworkManager.scss";
const { ipcRenderer } = window.require("electron");

const NetworkManager: React.FC = () => {
	const [ssid, setSsid] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [interfaceName, setInterfaceName] = useState<string>("");
	const [ip, setIp] = useState<string>("");
	const [gateway, setGateway] = useState<string>("");
	const [dns, setDns] = useState<string>("");
	const [airplaneMode, setAirplaneMode] = useState<"on" | "off">("off");
	const [availableNetworks, setAvailableNetworks] = useState<string[]>([]);
	const [currentNetwork, setCurrentNetwork] = useState<string>("");
	const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

	useEffect(() => {
		ipcRenderer.send("get-available-networks");
		ipcRenderer.send("get-current-network");

		ipcRenderer.on("available-networks", (_, networks) => {
			setAvailableNetworks(networks);
		});

		ipcRenderer.on("current-network", (_, network) => {
			setCurrentNetwork(network);
		});

		return () => {
			ipcRenderer.removeAllListeners("available-networks");
			ipcRenderer.removeAllListeners("current-network");
		};
	}, []);

	const connectToSelectedWifi = () => {
		if (selectedNetwork && password) {
			ipcRenderer.send("connect-to-wifi", selectedNetwork, password);
		}
	};

	const connectWifi = () => {
		ipcRenderer.send("connect-to-wifi", ssid, password);
	};

	const setStaticIP = () => {
		ipcRenderer.send("set-static-ip", interfaceName, ip, gateway, dns);
	};

	const setDHCP = () => {
		ipcRenderer.send("set-dhcp", interfaceName);
	};

	const toggleAirplaneMode = () => {
		const newStatus = airplaneMode === "on" ? "off" : "on";
		setAirplaneMode(newStatus);
		ipcRenderer.send("toggle-airplane-mode", newStatus);
	};

	return (
		<div id="nm-container">
			<h1>Network Settings</h1>

			<h2>Current Network: {currentNetwork}</h2>
			<h2>Available Networks:</h2>
			<ul>
				{availableNetworks.map((network, index) => (
					<li key={index} onClick={() => setSelectedNetwork(network)}>
						{network}
					</li>
				))}
			</ul>

			{selectedNetwork && (
				<div>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={connectToSelectedWifi}>Connect</button>
				</div>
			)}
			{/* <div>
				<input
					type="text"
					placeholder="SSID"
					value={ssid}
					onChange={(e) => setSsid(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={connectWifi}>Connect to WiFi</button>
			</div>
			<div>
				<input
					type="text"
					placeholder="Interface Name"
					value={interfaceName}
					onChange={(e) => setInterfaceName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="IP Address"
					value={ip}
					onChange={(e) => setIp(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Gateway"
					value={gateway}
					onChange={(e) => setGateway(e.target.value)}
				/>
				<input
					type="text"
					placeholder="DNS"
					value={dns}
					onChange={(e) => setDns(e.target.value)}
				/>
				<button onClick={setStaticIP}>Set Static IP</button>
				<button onClick={setDHCP}>Set to DHCP</button>
			</div> */}
			<div>
				<button onClick={toggleAirplaneMode}>
					Toggle Airplane Mode (Current: {airplaneMode})
				</button>
			</div>
		</div>
	);
};

export default NetworkManager;
