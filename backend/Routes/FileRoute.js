const {
	getParentDir,
	getDirContents,
} = require("../Controllers/FileController");
const router = require("express").Router();

router.route("/").post(getDirContents);
router.route("/parent").post(getParentDir);

module.exports = router;
