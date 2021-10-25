const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");
const path = require("path");

const runCommand = asyncHandler(async (req, res) => {
	let command = req.body.command;
	try {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				res.status(500).json(error);
			} else if (stderr) {
				res.status(200).json({ output: stderr });
			}
			let stdoutArray = stdout.split("\n");
			res.status(200).json({ output: stdoutArray });
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

const getWorkingDir = (req, res) => {
	let workingDir = path.resolve(process.cwd(), ".");
	res.status(200).json({ workingDir: workingDir });
};

module.exports = { runCommand, getWorkingDir };
