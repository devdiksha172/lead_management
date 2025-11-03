"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class State extends Model {
		static associate(models) {
			State.belongsTo(models.Country, {
				foreignKey: "countryId",
				as: "country",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
			State.hasMany(models.Unit, {
				foreignKey: "stateId",
				as: "units",
			});
		}
	}

	State.init(
		{
			countryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			type: {
				type: DataTypes.ENUM("State", "Union Territory"),
				allowNull: false,
				defaultValue: "State",
			},
		},
		{
			sequelize,
			modelName: "State",
			tableName: "states",
		}
	);

	return State;
};
