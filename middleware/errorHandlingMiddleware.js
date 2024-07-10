const CustomError = require("../utils/customErrorUtil");

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    let statusCode = 500; // Default status code

    // Check if error is an instance of CustomError
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        data: err.data || ""
    });
};

module.exports = errorHandler;