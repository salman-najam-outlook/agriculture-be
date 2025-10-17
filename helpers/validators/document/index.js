const { check, body } = require('express-validator');

exports.preSignedURLValidator = () => [
  check('objectName', 'Object name with extension is required')
    .trim()
    .notEmpty(),
  check('action').notEmpty().isIn(['get', 'put']),
  check('mimeType', 'Mime type is required')
    .if(body('action').exists().equals('put'))
    .trim()
    .notEmpty(),
];

exports.documentDataValidator = () => [
  check('displayName', 'Display Name is required').trim().notEmpty(),
  check('docType', 'Document can be either folder or file')
    .notEmpty()
    .isIn(['file', 'folder']),
  check('format').if(body('docType').equals('file')).notEmpty(),
  check('uuidName').if(body('docType').equals('file')).notEmpty(),
  check('size').if(body('docType').equals('file')).notEmpty().isNumeric(),
  check('format').if(body('docType').equals('file')).notEmpty(),
];

exports.renameDocumentValidator = () => [
  check('displayName', 'Display Name is required').trim().notEmpty(),
];

exports.moveDocumentValidator = () => [
  check('parentId', 'Parent Id is required').trim().notEmpty(),
];
