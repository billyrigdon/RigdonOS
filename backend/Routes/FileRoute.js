const {
	getFiles,
	createFile,
	editFile,
	deleteFile,
} = require("../Controllers/FileController");
const router = require("express").Router();

router.route("/").post(getFiles);
router.route("/create").post(createFile);
router.route("/edit").post(editFile);
router.route("/delete").post(deleteFile);

module.exports = router;
