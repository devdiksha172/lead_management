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
		define: {
			underscored: true, // convert camelCase -> snake_case
			timestamps: true, // auto add created_at, updated_at
			paranoid: true, // enable deleted_at (soft delete)
			createdAt: "created_at",
			updatedAt: "updated_at",
			deletedAt: "deleted_at",
		},
		logging: false,
	}
);

module.exports = sequelize;
