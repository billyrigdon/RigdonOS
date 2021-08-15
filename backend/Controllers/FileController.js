const Files = require("../Models/FileModel");
const asyncHandler = require("express-async-handler");

const getParent = asyncHandler(async (req, res) => {
	try {
		if (req.body.currentDir === "/") {
			res.status(200).json({ parentDir: "/" });
		} else {
			Files.findOne(
				{
					name: req.body.currentDir,
				},
				(err, file) => {
					if (err) {
						res.status(400).send("Couldn't find file");
						console.log(err);
					} else if (file) {
						console.log("File found");
						res.status(200).json(file);
					} else {
						res.status(400).send("Couldn't find file");
						console.log(
							"Unknown Error. Check property names in POST request"
						);
					}
				}
			);
		}
	} catch {
		res.status(400).send("Couldn't find files");
	}
});

const getFiles = asyncHandler(async (req, res) => {
	try {
		Files.find(
			{
				parentDir: req.body.currentDir,
			},
			(err, files) => {
				if (err) {
					res.status(400).send("Couldn't find files");
					console.log(err);
				} else if (files) {
					console.log("Files found");
					res.status(200).json(files);
				} else {
					res.status(400).send("Couldn't find files");
					console.log(
						"Unknown Error. Check property names in POST request"
					);
				}
			}
		);
	} catch {
		res.status(400).send("Couldn't find files");
	}
});

const createFile = asyncHandler(async (req, res) => {
	try {
		const fileExists = await Files.find(
			{
				name: req.body.name,
				parentDir: req.body.parentDir,
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
					parentDir: req.body.parentDir,
				},
				(err, file) => {
					if (err) {
						res.status(400).send("File couldn't be created");
					} else if (file) {
						console.log("Created new file: " + file.name);
						res.status(200).send("File created successfully");
					} else {
						res.status(400).send("Couldn't create files");
						console.log(
							"Unknown Error. Check property names in POST request"
						);
					}
				}
			);
		}
	} catch {
		res.status(400).send("Couldn't create file");
	}
});

const editFile = asyncHandler(async (req, res) => {
	try {
		await Files.findOne(
			{
				name: req.body.name,
				parentDir: req.body.parentDir,
			},
			(err, file) => {
				if (err) {
					res.status(400).send("Couldn't update file");
					return console.log(err);
				}
				file.name = req.body.newName;
				file.contents = req.body.newContents;
				file.save((err, updatedFile) => {
					if (err) {
						res.status(400).send("Couldn't update file");
						return console.log(err);
					} else if (updatedFile) {
						res.status(200).json(updatedFile);
					} else {
						res.status(400).send("Couldn't edit files");
						console.log(
							"Unknown Error. Check property names in POST request"
						);
					}
				});
			}
		);
	} catch {
		res.status(400).send("Couldn't edit file");
	}
});

const deleteFile = asyncHandler(async (req, res) => {
	try {
		await Files.findOneAndRemove(
			{
				name: req.body.name,
				parentDir: req.body.parentDir,
			},
			(err, file) => {
				if (err) {
					res.status(400).send("Couldn't delete file");
					return console.log(err);
				} else if (file) {
					res.status(200).send("File Deleted Successfully");
				} else {
					res.status(400).send("Couldn't delete file");
				}
			}
		);
	} catch {
		res.status(400).send("Couldn't delete files");
	}
});

module.exports = { createFile, getFiles, editFile, deleteFile, getParent };
