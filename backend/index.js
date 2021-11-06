const express = require("express");
const app = express();
const cors = require("cors");
const fileRoute = require("./Routes/FileRoute");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const os = require("os");
const pty = require("node-pty");
const io = require("socket.io")(server, {
	cors: {
		origin: "http://127.0.0.1:3000",
		methods: ["GET", "POST"],
	},
});
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/files", fileRoute);

//Websocket for terminal
io.on("connection", (socket) => {
	console.log("connected");
	const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

	const ptyProcess = pty.spawn(shell, [], {
		name: "xterm-color",
		cols: 80,
		rows: 24,
		cwd: process.env.HOME,
		env: process.env,
	});

	socket.on("input", (input) => {
		ptyProcess.write(input);
	});

	ptyProcess.on("data", (data) => {
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
