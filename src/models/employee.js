"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
		validPassword(password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
	Employee.init(
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: DataTypes.STRING,
			mobile: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Employee",
			tableName: "employees",
			hooks: {
				beforeCreate: async (employee) => {
					let salt = await bcrypt.genSalt(10);
					employee.password = await bcrypt.hash(employee.password, salt);
				},
			},
			paranoid: true, // adds deletedAt for soft delete
			underscored: true, // uses snake_case column names like created_at
		}
	);
	return Employee;
};
