import fs from "fs";
import path from "path";
import asyncHandler from "express-async-handler";
import { FileObj } from "../Types/FileInterface";
import { Request,Response } from "express";
import mime from "mime-types";

export const getDirContents = asyncHandler(async (req, res) => {
	let dirContents: FileObj[] = [];
	let stats;

	try {
		fs.readdir(req.body.currentDir, (err, files) => {
			files.forEach((fileName) => {
				try {
					stats = fs.statSync(path.join(req.body.currentDir, fileName));
					if (stats.isDirectory()) {
						dirContents.push({
							name: fileName,
							isDirectory: true,
							path: path.join(req.body.currentDir, fileName),
							txtContents: null
						});
					}
					if (stats.isFile()) {
						let text = '';
						
						try {
							text = fs.readFileSync(path.join(req.body.currentDir, fileName), "utf-8");
						} catch(err) {
							console.log(err)
							text = ''
						}
						console.log(text);

						dirContents.push({
							name: fileName,
							isDirectory: false,
							path: path.join(req.body.currentDir, fileName),
							txtContents: text
						});
					}
				} catch (error) {
					console.log(fileName);
				}
			});
			res.status(200).json(dirContents);
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

export const getParentDir = (req: Request, res: Response) => {
	const parentDir = path.dirname(req.body.currentDir);
	res.status(200).json({ currentDir: parentDir });
};



