const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customErrorUtil');
const { JWT_PRIVATE_KEY } = require("../config/config");

module.exports = (req, res, next) => {
    const tokenHeader = req.get('Authorization');

    try {
        if (!tokenHeader) {
            throw new CustomError('Unauthorized', 401);
        }

        const token = tokenHeader.split(' ')[1];

        // Decode the token
        const decoded = jwt.decode(token);

        if (!decoded) {
            throw new CustomError('Invalid token', 401);
        }

        // Verify the decoded token
        jwt.verify(token, JWT_PRIVATE_KEY, (err, verified) => {
            if (err) {
                throw err;
            }

            if (!verified) {
                // Token is invalid or expired
                throw new CustomError('Invalid or expired token', 401);
            }

            req.user_id = decoded.user_id; // Assign user_id from decoded token
            next();
        });
    } catch (error) {
        next(error);
    }
};