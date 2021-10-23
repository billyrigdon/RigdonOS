const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");

const runCommand = asyncHandler(async (req, res) => {
	let command = req.body.command;
	try {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				res.status(500).json(error);
			}
			if (stderr) {
				res.status(200).json({ output: stderr });
			}
			res.status(200).json({ output: stdout });
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = { runCommand };
