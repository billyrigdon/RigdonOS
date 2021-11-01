const {
	getParentDir,
	getDirContents,
} = require("../Controllers/FileController");
const router = require("express").Router();

router.route("/").post(getDirContents);
router.route("/parent").post(getParentDir);
//router.route("/create").post(createFile);
//router.route("/edit").post(editFile);
//router.route("/delete").post(deleteFile);

module.exports = router;
