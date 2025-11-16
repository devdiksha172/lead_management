module.exports = {
	auth: {
		login: require("./auth/login.validation"),
		register: require("./auth/register.validation"),
	},
	menu: {
		create: require("./menu/create.validation.js"),
	},
};
