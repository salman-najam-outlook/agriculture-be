const { check } = require('express-validator');
const dateFormat = "MM/DD/YYYY";

exports.contactUsValidator = () => [
    
    check('email', 'Email is required').trim().notEmpty().isEmail().withMessage('Please provide valid email'),
    check('categoryId', 'Category Id is required').trim().notEmpty().isNumeric(),
    check('subject', 'Subject is required').trim().notEmpty(),
    check('message', 'message is required').trim().notEmpty()
    
];

