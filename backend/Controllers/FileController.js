const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const asyncHandler = require("express-async-handler");

const getDirContents = asyncHandler(async (req, res) => {

	let dirContents = []
	let stats;

	try {
		fs.readdir(req.body.currentDir, (err, files) => {
			files.forEach(file => {
				try {
					stats = fs.statSync(path.join(req.body.currentDir, file))
					if (stats.isDirectory()) {
						dirContents.push({name: file, isDirectory: true, path: path.join(req.body.currentDir, file)});
					}
					if (stats.isFile()) {
						dirContents.push({name: file, isDirectory: false, path: path.join(req.body.currentDir, file)});
					}
				} catch (error) {
					console.log(file);
				}
			});
			res.status(200).json(dirContents);
		});
	} catch (error) {
		res.status(400).send(error)
	}
})

const runCommand = (command) => {

	exec(command, (error, stdout, stderr) => {
		if (error) {
			return "An error occurred"
		}
		if (stderr) {
			return stderr;
		}
		return stdout;
	});
}

module.exports = {getDirContents, runCommand}