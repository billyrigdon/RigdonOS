const express = require("express");
const app = express();
const { spawn, exec } = require("child_process");
//const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const fileRoute = require("./Routes/FileRoute");
const terminalRoute = require("./Routes/TerminalRoute");
const path = require("path");
const { runCommand } = require("./Controllers/TerminalController");

let commandHistory = [];

const shell = spawn("sh", [], { detached: true });
shell.on("close", (code) => {
	console.log("[shell] terminated :", code);
});

process.stdin.pipe(shell.stdin);

shell.stdout.on("data", (data) => {
	//console.log(`${data}`);
	commandHistory.push(`${data}`.split("\n"));
	data = data.toString();
	console.log(data);
});

shell.stderr.on("data", (data) => {
	//console.log(`${data}`);
	commandHistory.push(`${data}`.split("\n"));
	data = data.toString();
	console.log(data);
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/files", fileRoute);
app.use("/api/terminal", terminalRoute);

app.post("/api/terminal/command", (req, res) => {
	runCommand(req, res, shell, commandHistory);
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(express.static(path.join(__dirname, "build")));

app.listen(process.env.PORT, () => {
	console.log("Server listening on port: " + process.env.PORT);
});
