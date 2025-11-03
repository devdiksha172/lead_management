"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Branch extends Model {
		static associate(models) {
			// belongs to State
			Branch.belongsTo(models.State, {
				foreignKey: "stateId",
				as: "state",
			});

			// belongs to Unit
			Branch.belongsTo(models.Unit, {
				foreignKey: "unitId",
				as: "unit",
			});
		}
	}

	Branch.init(
		{
			stateId: DataTypes.INTEGER,
			unitId: DataTypes.INTEGER,
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: DataTypes.TEXT,
			latitude: DataTypes.DECIMAL(10, 7),
			longitude: DataTypes.DECIMAL(10, 7),
			pincode: DataTypes.STRING,
			phone: DataTypes.STRING,
			email: DataTypes.STRING,
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "Branch",
			tableName: "branches",
			// paranoid: true,
			// underscored: true,
			// timestamps: true,
		}
	);

	return Branch;
};
