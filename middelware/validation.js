const { body, validationResult } = require('express-validator');

const signUpValidate = [
    body('name').trim().notEmpty().withMessage('Name should not blank'),
    body('email').trim().isEmail().withMessage('Email should be valid'),
    body('password').notEmpty().withMessage('Password should not blank').isLength({ min: 8 }).withMessage('Min 8 characters are required').isAlphanumeric().withMessage('Password must be an alpha numeric')/* .isLowercase().withMessage('Password must have one Capital characteres') */,
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];
const validateProduct = [
    body('name').trim().notEmpty().withMessage('Product Name must be alpha numeric'),
    body('description').trim().isLength({max: 255}).withMessage('Max 255 characters are allow'),
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
]
module.exports.signUpValidation = signUpValidate;
module.exports.productValidation = validateProduct;