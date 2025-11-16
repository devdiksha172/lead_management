const Joi = require("joi");

module.exports = Joi.object({
	name: Joi.string().trim().required(),
	slug: Joi.string().trim().optional().allow(null, ""),
	icon: Joi.string().trim().optional().allow(null, ""),
	parentId: Joi.number().integer().optional().allow(null),
});
