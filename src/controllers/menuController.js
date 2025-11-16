const { where } = require("sequelize");
const { Menu } = require("../models");
const { success, error, notFound } = require("../utils/responseHelper");
const { slugify } = require("../utils/stringHelper");
const { Op } = require("sequelize");

module.exports = {
	async index(req, res) {
		try {
			const menus = await Menu.findAll({
				where: { parentId: null },
				include: [{ model: Menu, as: "children" }],
				order: [["id", "ASC"]],
			});

			return success(res, "Menu list fetched successfully", menus);
		} catch (err) {
			return error(res, err.message);
		}
	},

	async store(req, res) {
		try {
			const { name, slug, icon, parentId } = req.body;
			const createdBy = req.user.id;
			const finalSlug = slug ? slugify(slug) : slugify(name);
			const order = order ? order : 0;

			const existing = await Menu.findOne({
				where: {
					[Op.or]: [{ name: name }, { slug: finalSlug }],
				},
			});

			if (existing) {
				return error(res, "Menu with same name or slug already exists.");
			}

			const menu = await Menu.create({
				name,
				slug: finalSlug,
				icon,
				parentId,
				createdBy,
				order: order,
			});

			return success(res, "Menu created successfully", menu, 201);
		} catch (err) {
			return error(res, err.message);
		}
	},

	async update(req, res) {
		try {
			const { id } = req.params;
			const { name, slug, icon, parentId } = req.body;
			const finalSlug = slug ? slugify(slug) : slugify(name);
			const finalOrder = req.order ?? 0;

			const menu = await Menu.findByPk(id);
			if (!menu) return notFound(res, "Menu not found");

			const whereCondition = {
				[Op.or]: [{ name }, { slug: finalSlug }],
				id: { [Op.ne]: id }, // ignore itself
			};

			const duplicate = await Menu.findOne({ where: whereCondition });

			if (duplicate) {
				return error(
					res,
					"Another menu with same name or slug already exists under this parent"
				);
			}

			await menu.update({
				name,
				slug: finalSlug,
				icon,
				parentId,
				order: finalOrder,
			});
			return success(res, "Menu updated successfully", menu, 200);
		} catch (err) {
			return error(res, err.message);
		}
	},

	async destroy(req, res) {
		try {
			const { id } = req.params;
			const menu = await Menu.findByPk(id);
			if (!menu) return notFound(res, "Menu not found");

			await menu.destroy();
			return success(res, "Menu deleted successfully");
		} catch (err) {
			return error(res, err.message);
		}
	},
};
