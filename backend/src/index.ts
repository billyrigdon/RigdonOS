import express from "express";
import fs from "fs";
import http from "http";
import os from "os";
import * as pty from "node-pty";
import { Server, Socket } from "socket.io";
import { exec } from "child_process";
import fileRoute from "./Routes/FileRoute";
import cors from "cors";
import path from "path";

// Setup logging
const logFile = "/RigdonOS/filesystem/logs/node-server.log";

const log = (message: string) => {
	//	const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
	//	fs.appendFileSync(logFile, formattedMessage);
	console.log(message);
};

const launchApplication = (
	appName: string,
	socket: Socket,
	tcpPort: number
) => {
	const command = `xpra start :72 --bind-tcp=:${tcpPort} --start="${appName}" --desktop-scaling=on --tray=no --opengl=yes --keyboard-layout=us --no-tray --html=on`;

	log(`Attempting to launch app: ${appName} on port ${tcpPort}`);

	exec(command, (error, stdout, stderr) => {
		if (error) {
			log(`Error launching app: ${error}`);
			socket.emit("appError", `Failed to launch ${appName}`);
			return;
		}

		const connectionString = `http://localhost:${tcpPort}`;

		setTimeout(() => {
			socket.emit("appLaunched", connectionString);
		}, 1000);

		log(`Successfully launched app: ${appName} on port ${tcpPort}`);
	});
};

//Initialize express and socket.io server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:1313",
		methods: ["GET", "POST"],
	},
});

// Websocket for terminal and starting GUI applications
io.of("/pty").on("connection", (socket: Socket) => {
	log(`New connection for PTY: ${socket.id}`);

	const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
	const ptyProcess = pty.spawn(shell, [], {
		name: "xterm-color",
		cols: 80,
		rows: 24,
		cwd: process.env.HOME,
		env: process.env,
	});

	// Handle terminal input
	socket.on("input", (input) => {
		ptyProcess.write(input);
	});

	// Emit terminal output
	ptyProcess.onData((data) => {
		socket.emit("output", data);
	});

	// The node-pty process will be killed when the user explicitly disconnects from this PTY namespace.
	socket.on("disconnect", () => {
		log(`PTY Process killed for: ${socket.id}`);
		ptyProcess.kill();
	});
});

// Xpra routes, uses dynamically assigned ports which free up upon disconnect
let availableTcpPorts: number[] = [];
let nextTcpPort = 10000;
const socketToTcpPortMap = new Map<string, number>();

io.of("/xpra").on("connection", (socket: Socket) => {
	log(`New connection for XPRA: ${socket.id}`);

	let tcpPort =
		availableTcpPorts.length > 0 ? availableTcpPorts.shift()! : nextTcpPort++;
	socketToTcpPortMap.set(socket.id, tcpPort);

	socket.on("launchApp", (appName: string) => {
		launchApplication(appName, socket, tcpPort);
	});

	socket.on("disconnect", () => {
		const tcpPortToKill = socketToTcpPortMap.get(socket.id);
		if (tcpPortToKill !== undefined) {
			log(`Killing XPRA on port ${tcpPortToKill}`);
			exec(`xpra stop tcp:0.0.0.0:${tcpPortToKill}`, () => {
				availableTcpPorts.push(tcpPortToKill);
				socketToTcpPortMap.delete(socket.id);
			});
		}
	});
});

// Express middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/files", fileRoute);

// Serve static files
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.use(express.static(path.join(__dirname, "client")));

// Start the server
server.listen(1313, () => {
	log(`Server listening on port: 1313`);
});
