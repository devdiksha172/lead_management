"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("role_hierarchy", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "roles",
					key: "id",
				},
				onDelete: "CASCADE",
			},

			report_to_role_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "roles",
					key: "id",
				},
				onDelete: "CASCADE",
			},

			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},

			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("role_hierarchy");
	},
};
