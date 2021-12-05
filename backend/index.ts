import express from "express"
const app = express();
import cors from "cors";
import fileRoute from "./Routes/FileRoute";
import path from "path";
import http from "http";
import os from "os";
import pty from "node-pty"
import { Server, Socket } from "socket.io";
require("dotenv").config();

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://127.0.0.1:3000",
		methods: ["GET", "POST"],
	},
});


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/files", fileRoute);

//Websocket for terminal
io.on("connection", (socket: Socket) => {
	console.log("connected");
	const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

	
	const ptyProcess = pty.spawn(shell, [], {
		name: "xterm-color",
		cols: 80,
		rows: 24,
		cwd: process.env.HOME,
		//env: process.env,
	});

	socket.on("input", (input) => {
		ptyProcess.write(input);
	});

	ptyProcess.on("data", (data: any) => {
		socket.emit("output", data);
	});

	socket.on("disconnect", () => {
		//kill shell
	});
});

//Listen on port defined in .env and serve webpage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(express.static(path.join(__dirname, "build")));

server.listen(process.env.PORT, () => {
	console.log("Server listening on port: " + process.env.PORT);
});
