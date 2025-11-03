"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Unit extends Model {
		static associate(models) {
			// A Unit belongs to a State
			Unit.belongsTo(models.State, {
				foreignKey: "stateId",
				as: "state",
			});

			// A Unit has many Branches
			Unit.hasMany(models.Branch, {
				foreignKey: "unitId",
				as: "branches",
			});
		}
	}

	Unit.init(
		{
			stateId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: DataTypes.STRING,
			code: DataTypes.STRING,
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "Unit",
			tableName: "units",
		}
	);

	return Unit;
};
