const fs = require("fs");
const path = require("path");

function fileExists(filePath) {
	return fs.existsSync(path.resolve(filePath));
}

module.exports = { fileExists };
