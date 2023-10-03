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
	const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
	fs.appendFileSync(logFile, formattedMessage);
};

const launchApplication = (appName: string, socket: Socket) => {
	const currentDisplayNumber =
		availableDisplayNumbers.length > 0
			? availableDisplayNumbers.shift()!
			: nextDisplayNumber++;

	socketToDisplayMap.set(socket.id, currentDisplayNumber);

	const command = `xpra start :${currentDisplayNumber} --start-child="${appName}" --exit-with-children`;

	log(
		`Attempting to launch app: ${appName} on display :${currentDisplayNumber}`
	);

	exec(command, (error, stdout, stderr) => {
		if (error) {
			log(`Error launching app: ${error}`);
			socket.emit("appError", `Failed to launch ${appName}`);
			return;
		}

		const username = "someUsername";
		const password = "someVeryLongPasswordString";
		const connectionString = `http://localhost:1313?display=:${currentDisplayNumber}&username=${username}&password=${password}`;

		socket.emit("appLaunched", connectionString);
		log(
			`Successfully launched app: ${appName} on display :${currentDisplayNumber}`
		);
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

// Starting port for XPRA
let availableDisplayNumbers: number[] = [];
let nextDisplayNumber = 100;
let nextTcpPort = 10000;
const socketToDisplayMap = new Map<string, number>();

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

// Initialize xpra on a different route
io.of("/xpra").on("connection", (socket: Socket) => {
	log(`New connection for XPRA: ${socket.id}`);

	// Handle launching apps
	socket.on("launchApp", (appName: string) => {
		launchApplication(appName, socket);
	});

	// Handle disconnects
	socket.on("disconnect", () => {
		const displayToKill = socketToDisplayMap.get(socket.id);
		if (displayToKill !== undefined) {
			log(`Killing XPRA display :${displayToKill}`);
			exec(`xpra stop :${displayToKill}`, () => {
				availableDisplayNumbers.push(displayToKill);
				socketToDisplayMap.delete(socket.id);
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
