const { body } = require('express-validator');
const moment = require('moment');
const db = require(rootPath + '/models');

exports.nftCreateValidations = [
  body('submittedAt')
    .trim()
    .notEmpty()
    .withMessage('Submitted date is required')
    .bail()
    .custom((submittedAt) => {
      const isValidFormat = moment(submittedAt, true).isValid();
      if (!isValidFormat) throw new Error('Submitted date format is invalid');
      return true;
    }),
  body('snapshottedAt')
    .trim()
    .notEmpty()
    .withMessage('Snapshot time is required')
    .bail()
    .custom((snapshottedAt) => {
      const isValidFormat = moment(snapshottedAt, true).isValid();
      if (!isValidFormat) throw new Error('Snapshot time format is invalid');
      return true;
    }),
  body('lat')
    .trim()
    .notEmpty()
    .withMessage('GPS latitude is required')
    .bail()
    .isFloat({ max: 90, min: -90 })
    .withMessage('GPS latitude of snapshot is invalid'),
  body('lng')
    .trim()
    .notEmpty()
    .withMessage('GPS longitude is required')
    .bail()
    .isFloat({ max: 180, min: -180 })
    .withMessage('GPS longitude of snapshot is invalid'),
  body('fileS3Key').trim().notEmpty().withMessage('Snapshots file S3 key is required'),
  body('geofenceId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.body?.userFarmId) {
        whereCondition.farmId = req.body.userFarmId.toString();
      }
      if (req.user) {
        whereCondition.userId = req.user.id;
      }
      const geofence = await db.Geofence.findOne({ where: whereCondition, attributes: ['id'] });
      if (!geofence) {
        throw new Error('Geofence ID is invalid');
      }
      return true;
    }),
  body('userFarmId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.user) {
        whereCondition.userId = req.user.id;
      }
      const farm = await db.user_farm.findOne({ where: whereCondition, attributes: ['id'] });
      if (!farm) {
        throw new Error('Farm ID is invalid');
      }
      return true;
    }),
  body('altitude').optional().isFloat().withMessage('Altitude is invalid'),
];

exports.nftCreateForAdminValidations = [
  body('snapshottedAt')
    .trim()
    .optional()
    .custom((snapshottedAt) => {
      const isValidFormat = moment(snapshottedAt, true).isValid();
      if (!isValidFormat) throw new Error('Snapshot time format is invalid');
      return true;
    }),
  body('lat')
    .trim()
    .notEmpty()
    .withMessage('GPS latitude is required')
    .bail()
    .isFloat({ max: 90, min: -90 })
    .withMessage('GPS latitude of snapshot is invalid'),
  body('lng')
    .trim()
    .notEmpty()
    .withMessage('GPS longitude is required')
    .bail()
    .isFloat({ max: 180, min: -180 })
    .withMessage('GPS longitude of snapshot is invalid'),
  body('farmerId')
    .optional()
    .custom(async (value) => {
      const farmer = await db.user.findOne({ where: { id: value }, attributes: ['id'] });
      if (!farmer) {
        throw new Error('Farmer ID is invalid');
      }
      return true;
    }),
  body('imagePath')
    .trim()
    .notEmpty()
    .withMessage('Image location path is required')
    .bail()
    .isURL()
    .withMessage('Image location path is invalid'),
  body('geofenceId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.body?.userFarmId) {
        whereCondition.farmId = req.body.userFarmId.toString();
      }
      if (req.body?.farmerId) {
        whereCondition.userId = req.body.farmerId.toString();
      }
      const geofence = await db.Geofence.findOne({ where: whereCondition, attributes: ['id'] });
      if (!geofence) {
        throw new Error('Geofence ID is invalid');
      }
      return true;
    }),
  body('userFarmId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.body?.farmerId) {
        whereCondition.userId = req.body.farmerId.toString();
      }
      const farm = await db.user_farm.findOne({ where: whereCondition, attributes: ['id'] });
      if (!farm) {
        throw new Error('Farm ID is invalid');
      }
      return true;
    }),
  body('altitude').optional().isFloat().withMessage('Altitude is invalid'),
];

exports.nftUpdateForAdminValidations = [
  body('snapshottedAt')
    .trim()
    .optional()
    .custom((snapshottedAt) => {
      const isValidFormat = moment(snapshottedAt, true).isValid();
      if (!isValidFormat) throw new Error('Snapshot time format is invalid');
      return true;
    }),
  body('lat').optional().isFloat({ max: 90, min: -90 }).withMessage('GPS latitude of snapshot is invalid'),
  body('lng').optional().isFloat({ max: 180, min: -180 }).withMessage('GPS longitude of snapshot is invalid'),
  body('farmerId')
    .optional()
    .custom(async (value) => {
      const farmer = await db.user.findOne({ where: { id: value }, attributes: ['id'] });
      if (!farmer) {
        throw new Error('Farmer ID is invalid');
      }
      return true;
    }),
  body('imagePath').optional().isURL().withMessage('Image location path is invalid'),
  body('status').optional().isIn(['Requested', 'Approved', 'Rejected']).withMessage('NFT snapshot status is invalid'),
  body('geofenceId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.body?.userFarmId) {
        whereCondition.farmId = req.body.userFarmId.toString();
      }
      if (req.body?.farmerId) {
        whereCondition.userId = req.body.farmerId.toString();
      }
      const geofence = await db.Geofence.findOne({ where: whereCondition, attributes: ['id'] });
      if (!geofence) {
        throw new Error('Geofence ID is invalid');
      }
      return true;
    }),
  body('userFarmId')
    .optional()
    .custom(async (value, { req }) => {
      const whereCondition = { id: value };
      if (req.body?.farmerId) {
        whereCondition.userId = req.body.farmerId.toString();
      }
      const farm = await db.user_farm.findOne({ where: whereCondition, attributes: ['id'] });
      if (!farm) {
        throw new Error('Farm ID is invalid');
      }
      return true;
    }),
  body('altitude').optional().isFloat().withMessage('Altitude is invalid'),
];

exports.nftStatusUpdateValidations = [
  body('status')
    .notEmpty()
    .withMessage('NFT snapshot status is required')
    .bail()
    .isIn(['Requested', 'Approved', 'Rejected'])
    .withMessage('NFT snapshot status is invalid'),
];

exports.allNftStatusUpdateValidations = [
  ...this.nftStatusUpdateValidations,
  body('ids').isArray({ min: 1 }).withMessage('NFT snapshot ids must be an array'),
  body('ids.*')
    .notEmpty()
    .withMessage('NFT snapshot id is required')
    .isInt()
    .withMessage('NFT snapshot id must be an integer'),
];

const ACCEPTED_ATTRIBUTE_DISPLAY_TYPES = ['number', 'boost_number', 'boost_percentage', 'date'];

exports.nftUpdateAttributeValidations = [
  body('attributes').optional().isArray().withMessage('Attributes must be an array'),
  body('attributes.*').isObject({ strict: true }).withMessage('Attribute must be an object'),
  body('attributes.*.traitType')
    .trim()
    .notEmpty()
    .withMessage('Attribute name is required')
    .bail()
    .isString()
    .withMessage('Attribute name is invalid'),
  body('attributes.*.value')
    .trim()
    .notEmpty()
    .withMessage('Attribute value is required')
    .bail()
    .isString()
    .withMessage('Attribute value is invalid'),
  body('attributes.*.displayType')
    .trim()
    .optional()
    .isIn(ACCEPTED_ATTRIBUTE_DISPLAY_TYPES)
    .withMessage('Attribute display type is invalid'),
  body('attributes.*.maxValue').trim().optional().isNumeric({ no_symbols: true }).withMessage('Max value is invalid'),
];

exports.generateNftMetadataValidations = [
  body('snapshotIds')
    .optional({ nullable: true })
    .isArray()
    .withMessage('NFT Snapshot Ids must be an array'),
  body('snapshotIds.*')
    .optional({ nullable: true })
    .isInt()
    .withMessage('NFT snapshot id must be an integer'),
  body('filename').notEmpty().withMessage('Filename for metadata is required'),
  body('imageLink')
    .isString()
    .withMessage('NFT image link is invalid')
    .bail()
    .notEmpty()
    .trim()
    .withMessage('NFT image link is required')
    .bail()
    .isURL()
    .withMessage('NFT image link is invalid'),
  body('name')
    .isString()
    .withMessage('NFT name is invalid')
    .bail()
    .notEmpty()
    .trim()
    .withMessage('NFT name is required'),
  body('description')
    .isString()
    .withMessage('NFT description is invalid')
    .bail()
    .notEmpty()
    .trim()
    .withMessage('NFT description is required'),
  body('imageViewPageLink')
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .withMessage('NFT view page link is invalid')
    .bail()
    .trim()
    .isURL()
    .withMessage('NFT view page link is invalid'),
  body('attributes').optional({ nullable: true }).isArray().withMessage('Attributes must be an array'),
  body('attributes.*').optional({ nullable: true }).isObject({ strict: true }).withMessage('Attribute must be an object'),
  body('attributes.*.traitType')
    .optional({ nullable: true })
    .trim()
    .isString()
    .withMessage('Attribute name is invalid'),
  body('attributes.*.value')
    .optional({ nullable: true })
    .trim()
    .isString()
    .withMessage('Attribute value is invalid'),
  body('attributes.*.displayType')
    .optional({ nullable: true })
    .trim()
    .isIn(ACCEPTED_ATTRIBUTE_DISPLAY_TYPES)
    .withMessage('Attribute display type is invalid'),
  body('attributes.*.maxValue').optional({ nullable: true }).trim().isNumeric({ no_symbols: true }).withMessage('Max value is invalid'),
];
