require("dotenv").config(); // load .env

const config = {
	development: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || "lead_management_dev",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 3306,
		dialect: process.env.DB_DIALECT || "mysql",
	},
	test: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME_TEST || "lead_management_test",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 3306,
		dialect: process.env.DB_DIALECT || "mysql",
	},
	production: {
		username: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME_PROD || "lead_management_prod",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || 3306,
		dialect: process.env.DB_DIALECT || "mysql",
	},
};

module.exports = config[process.env.NODE_ENV];
