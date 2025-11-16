"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("menus", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			icon: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			parent_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "menus",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			created_by: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deleted_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("menus");
	},
};
