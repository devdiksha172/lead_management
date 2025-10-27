"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Country.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(191),
				allowNull: false,
			},
			iso_code: {
				// e.g. "IN"
				type: DataTypes.STRING(2),
				allowNull: true,
			},
			iso3: {
				// e.g. "IND"
				type: DataTypes.STRING(3),
				allowNull: true,
			},
			phone_code: {
				// e.g. "+91"
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			capital: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			currency: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			region: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			subregion: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Country",
			tableName: "countries",
			timestamps: true,
			paranoid: true, // adds deletedAt for soft delete
			underscored: true, // uses snake_case column names like created_at
		}
	);
	return Country;
};
