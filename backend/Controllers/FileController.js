const Files = require("../Models/FileModel");
const asyncHandler = require("express-async-handler");

const getFiles = asyncHandler(async (req, res) => {
	const currentDir = req.body.currentDir;

	Files.find(
		{
			name: new RegExp(currentDir + ".*?", "g"),
		},
		(err, files) => {
			if (err) return res.status(400).send("Couldn't find files");
			console.log("Files found");
			res.status(200).json(files);
		}
	);
});

const createFile = asyncHandler(async (req, res) => {
	const fileExists = await Files.find(
		{
			name: req.body.name,
		},
		(err, files) => {
			if (err) {
				console.log(err);
			}
			return files;
		}
	);

	console.log(fileExists);

	if (fileExists.length > 0) {
		res.status(400).send("File already exists");
	} else {
		await Files.create(
			{
				name: req.body.name,
				isDirectory: req.body.isDirectory,
				contents: req.body.contents,
			},
			(err, file) => {
				if (err) {
					res.status(400).send("File couldn't be created");
				}
				console.log("Created new file: " + file.name);
				res.status(200).send("File created successfully");
			}
		);
	}
});

module.exports = { createFile, getFiles };
