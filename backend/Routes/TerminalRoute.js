const { runCommand, getWorkingDir } = require("../Controllers/TerminalController");
const router = require("express").Router();

router.route("/command").post(runCommand);
router.route("/directory").get(getWorkingDir);

module.exports = router;
