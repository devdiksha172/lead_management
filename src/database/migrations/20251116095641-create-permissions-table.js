"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("permissions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			menu_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "menus", key: "id" },
				onDelete: "CASCADE",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			is_default: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			created_by: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			updated_by: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("permissions");
	},
};
