"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Menu extends Model {
		static associate(models) {
			// Self reference: parent → children
			Menu.belongsTo(models.Menu, {
				as: "parent",
				foreignKey: "parentId",
			});
			Menu.hasMany(models.Menu, {
				as: "children",
				foreignKey: "parentId",
			});

			// Creator relationship (auth user)
			Menu.belongsTo(models.Employee, {
				as: "created_by",
				foreignKey: "createdBy",
			});
		}
	}

	Menu.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			icon: DataTypes.STRING,
			parentId: DataTypes.INTEGER,
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			createdBy: DataTypes.INTEGER,
			order: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Menu",
			tableName: "menus",
		}
	);
	return Menu;
};
