import {
	getParentDir,
	getDirContents,
}  from "../Controllers/FileController";
import express from "express";

const router = express.Router();

router.route("/").post(getDirContents);
router.route("/parent").post(getParentDir);

export default router;