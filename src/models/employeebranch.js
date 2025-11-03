"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EmployeeBranch extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			EmployeeBranch.belongsTo(models.Employee, {
				foreignKey: "employeeId",
				as: "employee",
			});
			EmployeeBranch.belongsTo(models.Branch, {
				foreignKey: "branchId",
				as: "branch",
			});
		}
	}
	EmployeeBranch.init(
		{
			branchId: DataTypes.INTEGER,
			employeeId: DataTypes.INTEGER,
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "EmployeeBranch",
			tableName: "employee_branches",
		}
	);
	return EmployeeBranch;
};
