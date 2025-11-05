"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
const sendMail = require("../utils/mailer"); // import your mailer here

module.exports = (sequelize, DataTypes) => {
	class Employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
		validPassword(password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
	Employee.init(
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: DataTypes.STRING,
			mobile: DataTypes.STRING,
			password: DataTypes.STRING,
			fullname: {
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.firstname} ${this.lastname}`.trim();
				},
				set(value) {
					const parts = value.split(" ");
					this.setDataValue("firstname", parts[0]);
					this.setDataValue("lastname", parts.slice(1).join(" "));
				},
			},
		},
		{
			sequelize,
			modelName: "Employee",
			tableName: "employees",
			hooks: {
				beforeCreate: async (employee) => {
					let salt = await bcrypt.genSalt(10);
					employee.password = await bcrypt.hash(employee.password, salt);
				},
				afterCreate: async (user, options) => {
					console.log("🎉 New user created:", user.email);

					// Send mail after user registration
					await sendMail(
						user.email,
						"Welcome to MyApp 🎉",
						`<h3>Hello ${user.fullname},</h3><p>Welcome to MyApp! Your account has been created successfully.</p>`
					);
				},
			},
			paranoid: true, // adds deletedAt for soft delete
			underscored: true, // uses snake_case column names like created_at
		}
	);
	return Employee;
};
