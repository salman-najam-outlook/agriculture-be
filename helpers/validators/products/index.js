const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.createProductValidation = () => {
    return [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Product name is required')
            .isString()
            .withMessage('Product name must be a string')
            .isLength({ min: 2, max: 100 })
            .withMessage('Product name must be between 2 and 100 characters'),

        check('hsCode')
            .trim()
            .optional()
            .isString()
            .withMessage('HS Code must be a string')
            .isLength({ min: 6, max: 10 })
            .withMessage('HS Code must be between 6 and 10 characters'),

        check('s3Url')
            .trim()
            .optional()
            .isURL()
            .withMessage('S3 URL must be a valid URL')
    ];
};

exports.updateProductValidation = () => {
    return [
        check('name')
            .trim()
            .optional()
            .isString()
            .withMessage('Product name must be a string')
            .isLength({ min: 2, max: 100 })
            .withMessage('Product name must be between 2 and 100 characters'),

        check('hsCode')
            .trim()
            .optional()
            .isString()
            .withMessage('HS Code must be a string')
            .isLength({ min: 6, max: 10 })
            .withMessage('HS Code must be between 6 and 10 characters')
            .custom(async (value, { req }) => {
                if (value) {
                    const product = await db.Product.findOne({ where: { hsCode: value } });
                    if (product && product.id !== req.params.id) {
                        throw new Error('HS Code must be unique');
                    }
                }
                return true;
            }),

        check('s3Url')
            .trim()
            .optional()
            .isURL()
            .withMessage('S3 URL must be a valid URL')
    ];
};