const { getFiles, createFile } = require("../Controllers/FileController");
const router = require("express").Router();

router.route("/").post(getFiles);
router.route("/create").post(createFile);

module.exports = router;