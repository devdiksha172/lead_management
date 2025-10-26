const express = require("express");
const routes = require("./src/routes");

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
const app = express();
app.use(express.json()); // parse JSON

//Routes
app.use(routes);

// Centralized Error Handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ message: err.message || "Internal Server Error ..." });
});

module.exports = app;
