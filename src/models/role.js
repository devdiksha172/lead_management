"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			// who created the role
			Role.belongsTo(models.Employee, {
				foreignKey: "createdBy",
				as: "created_by",
			});

			// roles this role reports to (many-to-many)
			Role.belongsToMany(models.Role, {
				through: "role_hierarchy",
				as: "reporting_to",
				foreignKey: "roleId",
				otherKey: "reportToRoleId",
			});

			// roles that report to this role
			Role.belongsToMany(models.Role, {
				through: "role_hierarchy",
				as: "reporting_from",
				foreignKey: "reportToRoleId",
				otherKey: "roleId",
			});
		}
	}

	Role.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			isActive: DataTypes.BOOLEAN,
			createdBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Role",
			tableName: "roles",
		}
	);

	return Role;
};
