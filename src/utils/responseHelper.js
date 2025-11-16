/**
 * Common helper for sending consistent API responses
 */

function success(res, message = "Success", data = {}, statusCode = 200) {
	return res.status(statusCode).json({
		success: true,
		message,
		data,
	});
}

function error(
	res,
	message = "Something went wrong",
	statusCode = 500,
	errors = null
) {
	return res.status(statusCode).json({
		success: false,
		message,
		errors,
	});
}

function validationError(res, errors = [], message = "Validation failed") {
	return res.status(422).json({
		success: false,
		message,
		errors,
	});
}

function unauthorized(res, message = "Unauthorized access") {
	return res.status(401).json({
		success: false,
		message,
	});
}

function notFound(res, message = "Resource not found") {
	return res.status(404).json({
		success: false,
		message,
	});
}

module.exports = {
	success,
	error,
	validationError,
	unauthorized,
	notFound,
};
