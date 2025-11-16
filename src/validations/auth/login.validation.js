const Joi = require("joi");

module.exports = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"string.email": "Please enter a valid email address",
			"any.required": "Email is required",
		}),

	password: Joi.string().required().messages({
		"string.base": "Password must be a string",
		"any.required": "Password is required",
		"string.empty": "Password cannot be empty",
	}),
});
