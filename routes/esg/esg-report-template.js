const express = require('express');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../../middleware/validation_error_handler');
const auth = require('../../middleware/auth');
const {
  createEsgReportTemplate,
  getEsgReportTemplates,
  getEsgReportTemplateById,
  updateEsgReportTemplate,
  deleteEsgReportTemplate,
} = require('../../controllers/esg-report/esgReportTemplateController');

const router = express.Router();

const esgReportTemplateValidationSchema = {
  templateName: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  templateSettings: {
    optional: { options: { nullable: true } },
  },
};

router.post(
  '/',
  auth,
  checkSchema(esgReportTemplateValidationSchema),
  validation_error_handler,
  createEsgReportTemplate
);

router.get(
  '/',
  auth,
  getEsgReportTemplates
);

router.get(
  '/:id',
  auth,
  getEsgReportTemplateById
);


router.put(
  '/:id',
  auth,
  checkSchema(esgReportTemplateValidationSchema),
  validation_error_handler,
  updateEsgReportTemplate
);


router.delete(
  '/:id',
  auth,
  deleteEsgReportTemplate
);

module.exports = router;