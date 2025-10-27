"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class State extends Model {
		static associate(models) {
			State.belongsTo(models.Country, {
				foreignKey: "country_id",
				as: "country",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}

	State.init(
		{
			country_id: {
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
			underscored: true, // uses snake_case columns (created_at, updated_at)
			timestamps: true, // adds created_at and updated_at
			paranoid: true, // adds deleted_at (for soft deletes)
		}
	);

	return State;
};
