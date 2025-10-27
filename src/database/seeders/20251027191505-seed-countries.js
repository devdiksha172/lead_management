"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
	async up(queryInterface, Sequelize) {
		// Read countries from JSON
		const countriesPath = path.join(__dirname, "../../utils/countries.js");
		const countries = JSON.parse(fs.readFileSync(countriesPath, "utf8"));

		// Add timestamps
		const records = countries.map((c) => {
			const phone_code =
				c.idd?.root && c.idd?.suffixes?.length
					? c.idd.root + c.idd.suffixes[0]
					: c.idd?.root || null;

			return {
				name: c.name?.common || null,
				iso_code: c.cca2 || null,
				iso3: c.cca3 || null,
				phone_code,
				capital: c.capital?.[0] || null,
				currency: c.currencies ? Object.keys(c.currencies)[0] : null,
				region: c.region || null,
				subregion: c.subregion || null,
				created_at: new Date(),
				updated_at: new Date(),
			};
		});

		await queryInterface.bulkInsert("countries", records, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("countries", null, {});
	},
};
