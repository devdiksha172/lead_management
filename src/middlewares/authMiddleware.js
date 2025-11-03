require("dotenv").config();
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

module.exports = (req, res, next) => {
	const token = req.header("authorization").split(" ")[1];
	if (!token)
		return res.status(401).json({ message: "No token, Authorization failed" });
	try {
		const decodedData = jwt.verify(token, JWT_SECRET);
		req.user = decodedData;
		next();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
