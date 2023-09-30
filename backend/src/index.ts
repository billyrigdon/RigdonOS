import express from "express";
const app = express();
import cors from "cors";
import fileRoute from "./Routes/FileRoute";
import path from "path";
import http from "http";
import os from "os";
import * as pty from "node-pty";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";
import * as x11 from "x11";
import shell from "shelljs";
import WebSocket from "ws";
import net from "net";
import { exec } from "child_process";
//Initialize express and socket.io server
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:1313",
		methods: ["GET", "POST"],
	},
});

// Launch a GUI application by its name
const launchApp = (appName, displayNumber) => {
	exec(`DISPLAY=:99 ${appName} &`);
};

// Initial setup
// setupXvfb();

// WebSocket server for VNC
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
	console.log("New VNC connection");

	// Create a TCP socket connection to the VNC server (x11vnc)
	const vncSocket = net.connect(5999, "localhost");

	vncSocket.on("data", (data) => {
		ws.send(data);
	});

	ws.on("message", (message) => {
		vncSocket.write(message);
	});

	ws.on("close", () => {
		vncSocket.end();
	});

	vncSocket.on("end", () => {
		ws.close();
	});
});

// Integrate WebSocket upgrade with the existing HTTP server
server.on("upgrade", (request, socket, head) => {
	if (request.url === "/vnc") {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request);
		});
	}
	// You can add more conditions here for other WebSocket routes
});

//Express middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//Routes
app.use("/api/files", fileRoute);

//Websocket for terminal
io.on("connection", (socket: Socket) => {
	console.log("connected");
	const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

	console.log(shell);

	const ptyProcess = pty.spawn(shell, [], {
		name: "xterm-color",
		cols: 80,
		rows: 24,
		cwd: process.env.HOME,
		env: Object.assign(process.env),
	});

	socket.on("input", (input) => {
		ptyProcess.write(input);
	});

	ptyProcess.onData((data: any) => {
		socket.emit("output", data);
	});

	socket.on("disconnect", () => {
		ptyProcess.kill();
	});

	socket.on("launchBrowser", () => {
		console.log(
			"------------------------------------------------Launching app------------------------------------------------------------------------------------------"
		);
		launchApp("xclock", 99);
	});
});

//Listen on port defined in .env and serve webpage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.use(express.static(path.join(__dirname, "client")));

server.listen(1313, () => {
	console.log("Server listening on port: " + 1313);
});
