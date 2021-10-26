const { spawn, exec } = require("child_process");
const asyncHandler = require("express-async-handler");
const path = require("path");

let commandHistory = [];

const shell = spawn("sh", [], { detached: true });
shell.on("close", (code) => {
	console.log("[shell] terminated :", code);
});

process.stdin.pipe(shell.stdin);

shell.stdout.on("data", (data) => {
	commandHistory.push(`${data}`.split("\n")[0]);
});

const runCommand = asyncHandler(async (req, res) => {
	let command = req.body.command;
	req.body.command.pipe(shell.stdin);
	res.status(200).json({ output: commandHistory });
	// try {
	// 	exec(command, (error, stdout, stderr) => {
	// 		if (error) {
	// 			res.status(500).json(error);
	// 		} else if (stderr) {
	// 			res.status(200).json({ output: stderr });
	// 		}
	// 		let stdoutArray = stdout.split("\n");
	// 		res.status(200).json({ output: stdoutArray });
	// 	});
	// } catch (error) {
	// 	res.status(500).json(error);
	// }
});

const getWorkingDir = (req, res) => {
	let workingDir = path.resolve(process.cwd(), ".");
	res.status(200).json({ workingDir: workingDir });
};

const interactiveCommand = () => {
	const test = [];
};

module.exports = { runCommand, getWorkingDir };
