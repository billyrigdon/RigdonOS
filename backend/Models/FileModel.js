const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	isDirectory: Boolean,
	contents: String,
});

const Files = mongoose.model("Files", fileSchema);

module.exports = Files;
