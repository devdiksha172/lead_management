"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("states", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			country_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "countries", key: "id" },
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			code: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			type: {
				type: Sequelize.ENUM("State", "Union Territory"),
				allowNull: false,
				defaultValue: "State",
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("states");
	},
};
