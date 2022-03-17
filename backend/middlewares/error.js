/**
 * Error Handling Middleware
 */

// Handle Duplicate Key Errors From MondoDB
const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists`;
	return res
		.status(code)
		.json({ message: error, data: { fields: field }, success: false });
};

// Handle Validation Errors
const handleValidationError = (err, res) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const fields = Object.values(err.errors).map((el) => el.path);
	const code = 400;
	if (errors.length > 1) return res.status(code).json({ message: errors, data: { fields }, success: false });
	return res.status(code).json({
		message: errors.join(''),
		data: { fields },
		success: false,
	});

};

const handle404Error = (err, res) => {
	return res
		.status(err.statusCode)
		.json({ message: err.message, data: {}, success: false });
};

const handleGeneralError = (err, res) => {
	const code = 400;
	return res
		.status(code)
		.json({ message: err.message, data: {}, success: false });
};

const errHandler = (err, req, res, next) => {
	try {
		console.log(err);
		if (err.name === 'ValidationError')
			return (err = handleValidationError(err, res));
		else if (err.code && err.code === 11000)
			return (err = handleDuplicateKeyError(err, res));
		else if (err.statusCode && err.statusCode === 404)
			return (err = handle404Error(err, res));
		return err = handleGeneralError(err, res);
	} catch (error) {
		res.status(500).json({
			message: 'An unknown error occurred.',
			data: {},
			success: false,
		});
	}
};

module.exports = errHandler;