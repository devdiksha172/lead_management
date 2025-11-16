"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class RoleHierarchy extends Model {
		static associate(models) {
			// child role
			RoleHierarchy.belongsTo(models.Role, {
				foreignKey: "roleId",
				as: "child_role",
			});

			// parent role (reports to)
			RoleHierarchy.belongsTo(models.Role, {
				foreignKey: "reportToRoleId",
				as: "parent_role",
			});
		}
	}

	RoleHierarchy.init(
		{
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			reportToRoleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "RoleHierarchy",
			tableName: "role_hierarchy",
		}
	);

	return RoleHierarchy;
};
