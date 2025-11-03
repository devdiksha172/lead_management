"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("employee_branches", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			branch_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			employee_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "employees", key: "id" },
				onDelete: "CASCADE",
			},
			is_active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
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
				defaultValue: Sequelize.fn("NOW"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("EmployeeBranches");
	},
};
