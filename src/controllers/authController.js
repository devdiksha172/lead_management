require("dotenv").config();
const { Employee } = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

async function register(req, res) {
	try {
		const { firstname, lastname, mobile, email, password } = req.body;
		const existingEmployee = await Employee.findOne({
			where: {
				[Op.or]: [{ email: email }, { mobile: mobile }],
			},
		});

		if (existingEmployee) {
			return res
				.status(400)
				.json({ message: "Employee with same name or mobile already exist" });
		}
		//const hashedPassword = await bcrypt.hash(password, 10);
		const employee = await Employee.create({
			firstname,
			lastname,
			email,
			mobile,
			password,
		});

		res.status(201).json({
			message: "Employee registration done successfully",
			result: {
				id: employee.id,
				firstname: employee.firstname,
				lastname: employee.lastname,
				email: employee.email,
				mobile: employee.mobile,
			},
		});
		return res.status(400).json({ message: "Employee Created successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;
		const employee = await Employee.findOne({ where: { email: email } });
		if (!employee) {
			return res.status(400).json({ message: "Employee Not found" });
		}
		//const matched = bcrypt.compareSync(password, employee.password);
		const matched = employee.validPassword(password);

		if (!matched)
			return res.status(400).json({ message: "Password does not matched" });

		const token = jwt.sign(
			{
				id: employee.id,
				firstname: employee.firstname,
				lastname: employee.lastname,
				email: employee.email,
				mobile: employee.mobile,
			},
			JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);
		res.status(200).json({
			message: "Logged in successfully",
			result: { token: token },
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function me(req, res) {
	try {
		const employee = await Employee.findByPk(req.user.id, {
			attributes: ["id", "firstname", "lastname", "email", "mobile"],
		});
		if (!employee)
			return res.status(400).json({ message: "Employee not found" });

		return res
			.status(200)
			.json({ message: "Employee found", result: employee });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = { register, login, me };
