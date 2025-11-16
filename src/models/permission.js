"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Permission extends Model {
		static associate(models) {
			Permission.belongsTo(models.Menu, {
				foreignKey: "menuId",
				as: "menu",
			});
		}
	}

	Permission.init(
		{
			menuId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			isDefault: DataTypes.BOOLEAN,
			isActive: DataTypes.BOOLEAN,
			createdBy: DataTypes.INTEGER,
			updatedBy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Permission",
		}
	);

	return Permission;
};
