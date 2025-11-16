const { Role, sequelize } = require("../models");
const { slugify } = require("../utils/stringHelper");
const { success, error, notFound } = require("../utils/responseHelper");

module.exports = {
	async index(req, res) {
		const roles = await Role.findAll({
			include: [
				{
					model: Role,
					as: "reporting_to",
					attributes: ["id", "name"],
				},
			],
		});
		res.json({ status: true, roles });
	},

	async store(req, res) {
		const { name, reportToRoleIds = [] } = req.body;

		const role = await sequelize.transaction(async (t) => {
			const newRole = await Role.create(
				{
					name,
					slug: slugify(name),
					createdBy: req.user.id,
				},
				{ transaction: t }
			);

			if (reportToRoleIds.length > 0) {
				await newRole.setReporting_to(reportToRoleIds, { transaction: t });
			}

			return newRole;
		});

		res.json({
			status: true,
			message: "Role created successfully",
			role,
		});
	},

	async update(req, res) {
		const { id } = req.params;
		const { name, reportToRoleIds = [] } = req.body;

		const role = await Role.findByPk(id);
		if (!role)
			return res.status(404).json({ status: false, message: "Role not found" });

		await sequelize.transaction(async (t) => {
			await role.update(
				{
					name,
					slug: slugify(name),
				},
				{ transaction: t }
			);

			await role.setReporting_to(reportToRoleIds, { transaction: t });
		});

		res.json({ status: true, message: "Role updated" });
	},

	async destroy(req, res) {
		await Role.destroy({ where: { id: req.params.id } });
		res.json({ status: true, message: "Role deleted" });
	},
};
