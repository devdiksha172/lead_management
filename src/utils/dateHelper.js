function formatDate(date = new Date(), locale = "en-IN") {
	return date.toLocaleString(locale, { timeZone: "Asia/Kolkata" });
}

function getCurrentDateISO() {
	return new Date().toISOString();
}

module.exports = { formatDate, getCurrentDateISO };
