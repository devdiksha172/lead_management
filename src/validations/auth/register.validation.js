const Joi = require("joi");

module.exports = Joi.object({
	firstname: Joi.string().min(3).required().messages({
		"string.base": "First name must be a string",
		"string.min": "First name must be at least 3 characters long",
		"any.required": "First name is required",
	}),

	lastname: Joi.string().allow("").messages({
		"string.base": "Last name must be a string",
	}),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"string.email": "Please enter a valid email ending with .com or .net",
			"any.required": "Email is required",
		}),

	password: Joi.string()
		.pattern(
			new RegExp(
				"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
			)
		)
		.required()
		.messages({
			"string.pattern.base":
				"Password must be at least 8 characters long, include uppercase, lowercase, number and special character",
			"any.required": "Password is required",
		}),

	mobile: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			"string.pattern.base": "Mobile number must be exactly 10 digits",
			"any.required": "Mobile number is required",
		}),
});
