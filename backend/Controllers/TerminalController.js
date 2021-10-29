const asyncHandler = require("express-async-handler");
const path = require("path");
const Readable = require("stream").Readable;

const runCommand = (req, res, shell, history) => {
	try {
		//Readable.from("ls").pipe(shell.stdin);
		shell.stdin.write(req.body.command + "\n");
		setTimeout(() => {
			res.status(200).json(history);
		}, 600);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getWorkingDir = (req, res) => {
	let workingDir = path.resolve(process.cwd(), ".");
	res.status(200).json({ workingDir: workingDir });
};

module.exports = { runCommand, getWorkingDir };
