const { body } = require("express-validator");
const CustomError = require("../utils/customErrorUtil");
const { validationResult } = require("express-validator");

// Dynamic validation middleware
const validateFields = async (req, res, next) => {
    const fieldsToValidate = Object.keys(req.body);

    const validationRules = fieldsToValidate.map(field => {
        switch (field) {
            case "email":
                return body(field)
                    .isEmail()
                    .normalizeEmail()
                    .withMessage('Invalid email');
            case "username":
                return body(field)
                    .trim()
                    .isAlphanumeric()
                    .withMessage('Username should only contain letters and numbers')
                    .isLength({ min: 3, max: 10 })
                    .withMessage('Username should be between 3 to 10 characters')
                    .not().isEmpty()
                    .withMessage('Enter username');
            case "password":
                return body(field)
                    .trim()
                    .isLength({ min: 8 })
                    .withMessage('Password should contain at least 8 characters')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/)
                    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            case "confirmPassword":
                return body(field)
                    .trim()
                    .custom((value, { req }) => {
                        if (value !== req.body.password) {
                            throw new CustomError('Passwords do not match', 422);
                        }
                        return true;
                    });
            case "phone":
                return body(field)
                    .trim()
                    .isString()
                    .custom((value) => {
                        const phoneStr = String(value);
                        const isDigitsOnly = /^\d+$/.test(phoneStr); // Check if all characters are digits

                        if (phoneStr.length !== 10 || phoneStr.charAt(0) === '0' || !isDigitsOnly) {
                            return Promise.reject('Invalid phone number');
                        }
                        return true;
                    });
            case "name":
                return body(field)
                    .trim()
                    .isString()
                    .isLength({ min: 3, max: 100 })
                    .withMessage('Title must be between 3 to 30 characters')
                    .not().isEmpty()
                    .withMessage('Title not provided');
            case "description":
                return body(field)
                    .trim()
                    .isString()
                    .isLength({ min: 5, max: 300 })
                    .withMessage('Description must be between 5 to 200 characters')
                    .not().isEmpty()
                    .withMessage('Description not provided');
            case "price":
                return body(field)
                    .isNumeric()
                    .not().isEmpty();
            case "quantity":
                return body(field)
                    .isNumeric()
                    .not().isEmpty()
            default:
                return null;
        }
    }).filter(validation => validation !== null);

    await Promise.all(validationRules.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new CustomError(errors.array()[0].msg, 422);
        error.data = errors.array();
        
        return next(error);
    }

    next();
};

module.exports = validateFields;