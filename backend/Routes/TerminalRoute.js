const { runCommand } = require("../Controllers/TerminalController");
const router = require("express").Router();

router.route("/command").post(runCommand);

module.exports = router;
