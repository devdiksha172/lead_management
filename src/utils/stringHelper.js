function capitalize(str = "") {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function slugify(str = "") {
	return str.toLowerCase().trim().replace(/\s+/g, "-");
}

module.exports = { capitalize, slugify };
