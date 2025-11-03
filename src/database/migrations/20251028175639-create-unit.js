"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("units", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			state_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "states",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
			},
			deleted_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("units");
	},
};
