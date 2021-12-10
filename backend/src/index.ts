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

//Initialize express and socket.io server
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://127.0.0.1:3000",
		methods: ["GET", "POST"],
	},
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
});

//Listen on port defined in .env and serve webpage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.use(express.static(path.join(__dirname, "client")));

server.listen(process.env.PORT, () => {
	console.log("Server listening on port: " + process.env.PORT);
});
