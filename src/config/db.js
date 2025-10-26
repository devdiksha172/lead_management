const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DB_NAME || "lead_management_dev",
	process.env.DB_USER || "root",
	process.env.DB_PASSWORD || null,
	{
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 3306,
		dialect: process.env.DB_DIALECT || "mysql",
		logging: false, //console.log, // set to true if you want to see SQL queries in console
	}
);

module.exports = sequelize;
