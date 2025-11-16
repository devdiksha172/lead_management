const { Permission, PermissionHierarchy, Menu } = require("../models");
const slugify = require("../helpers/slugify");

module.exports = {
	// ========================================
	// 1. Create Permission
	// ========================================
	async create(req, res) {
		try {
			const { menuId, name, isDefault } = req.body;

			if (!menuId || !name) {
				return res
					.status(400)
					.json({ message: "menuId and name are required" });
			}

			const slug = slugify(name);
			const createdBy = req.user.id;

			const permission = await Permission.create({
				menuId,
				name,
				slug,
				isDefault: isDefault || false,
				isActive: true,
				createdBy,
			});

			res.status(201).json({
				success: true,
				message: "Permission created",
				data: permission,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},

	// ========================================
	// 2. Create Default Permissions for Menu
	// ========================================
	async createDefault(req, res) {
		try {
			const { menuId } = req.body;
			const createdBy = req.user.id;

			if (!menuId) {
				return res.status(400).json({ message: "menuId is required" });
			}

			const defaultPermissions = [
				{ name: "view", isDefault: true },
				{ name: "create", isDefault: true },
				{ name: "edit", isDefault: true },
				{ name: "delete", isDefault: true },
			];

			const perms = [];

			for (const p of defaultPermissions) {
				const slug = slugify(p.name);
				const perm = await Permission.create({
					menuId,
					name: p.name,
					slug,
					isDefault: p.isDefault,
					isActive: true,
					createdBy,
				});
				perms.push(perm);
			}

			res.json({
				success: true,
				message: "Default permissions created",
				data: perms,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},

	// ========================================
	// 3. Create Permission Hierarchy
	// ========================================
	async addHierarchy(req, res) {
		try {
			const { permissionId, parentPermissionId } = req.body;

			if (!permissionId || !parentPermissionId) {
				return res.status(400).json({
					message: "permissionId and parentPermissionId are required",
				});
			}

			const hierarchy = await PermissionHierarchy.create({
				permissionId,
				parentPermissionId,
			});

			res.json({
				success: true,
				message: "Hierarchy added",
				data: hierarchy,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},

	// ========================================
	// 4. List Permissions By Menu
	// ========================================
	async getByMenu(req, res) {
		try {
			const { menuId } = req.params;

			const permissions = await Permission.findAll({
				where: { menuId },
				include: [
					{
						model: PermissionHierarchy,
						as: "childHierarchy",
					},
					{
						model: PermissionHierarchy,
						as: "parentHierarchy",
					},
				],
			});

			res.json({ success: true, data: permissions });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},

	// ========================================
	// 5. List All Permissions
	// ========================================
	async index(req, res) {
		try {
			const permissions = await Permission.findAll();
			res.json({ success: true, data: permissions });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},

	// ========================================
	// 6. Delete Permission
	// ========================================
	async destroy(req, res) {
		try {
			const { id } = req.params;

			await PermissionHierarchy.destroy({ where: { permissionId: id } });
			await PermissionHierarchy.destroy({ where: { parentPermissionId: id } });
			await Permission.destroy({ where: { id } });

			res.json({ success: true, message: "Permission deleted" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},
};
