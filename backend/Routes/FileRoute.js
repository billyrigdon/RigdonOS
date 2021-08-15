const {
	getFiles,
	createFile,
	editFile,
	deleteFile,
	getParent
} = require("../Controllers/FileController");
const router = require("express").Router();

router.route("/").post(getFiles);
router.route("/parent").post(getParent)
router.route("/create").post(createFile);
router.route("/edit").post(editFile);
router.route("/delete").post(deleteFile);

module.exports = router;
