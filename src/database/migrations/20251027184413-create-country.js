"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Countries", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			iso_code: {
				type: Sequelize.STRING,
			},
			iso3: {
				type: Sequelize.STRING,
			},
			phone_code: {
				type: Sequelize.STRING,
			},
			capital: {
				type: Sequelize.STRING,
			},
			currency: {
				type: Sequelize.STRING,
			},
			region: {
				type: Sequelize.STRING,
			},
			subregion: {
				type: Sequelize.STRING,
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("NOW"),
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Countries");
	},
};
