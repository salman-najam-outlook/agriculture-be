const express = require('express');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../../middleware/validation_error_handler');
const auth = require('../../middleware/auth');
const { 
  createEsgReport, 
  getEsgReportById, 
  updateEsgReport, 
  deleteEsgReport, 
  getEsgReports
} = require('../../controllers/esg-report/esgReportController');

const router = express.Router();

const esgReportValidationSchema = {
  reportId: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  reportType: {
    isString: true,
    notEmpty: true,
    isIn: {
      options: [['private', 'public']],
    },
  },
  esgProtocolId: {
    isMongoId: true,
    notEmpty: true,
  },
  reportTimeline: {
    optional: { options: { nullable: true } },
    isArray: true,
    custom: {
      options: (value) => {
        if (value && Array.isArray(value)) {
          return true;
        }
        return true;
      }
    }
  },
  subOrganizationIds: {
    optional: { options: { nullable: true } },
  },
  templateId: {
    isMongoId: true,
    notEmpty: true,
  }
};

router.post(
  '/',
  auth,
  checkSchema(esgReportValidationSchema),
  validation_error_handler,
  createEsgReport
);

router.get(
  '/',
  auth,
  getEsgReports
);

router.get(
  '/:id',
  auth,
  getEsgReportById
);

router.put(
  '/:id',
  auth,
  checkSchema(esgReportValidationSchema),
  validation_error_handler,
  updateEsgReport
);

router.delete(
  '/:id',
  auth,
  deleteEsgReport
);

module.exports = router;