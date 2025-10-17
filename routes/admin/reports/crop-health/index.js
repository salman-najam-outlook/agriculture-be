const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const translation = require(rootPath + '/middleware/translation');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { Op } = require('sequelize');
const convertEmptyStringToNull = require(rootPath + '/middleware/convertEmptyStringToNull');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const {
  getQueryParamsForSatelliteReports,
  getSatelliteReports,
  exportCropHealthReportListingRouteHandler,
  BASIC_REPORT_TYPES,
  getSatelliteReportGroupById,
  generateCropHealthReportRouteHandler,
  downloadCropHealthPdfRouteHandler,
} = require(rootPath + '/helpers/satellite-report');
const { requestCropHealthReportValidation } = require(rootPath + '/helpers/validators/report');

router.get('/', auth, async (req, res) => {
  try {
    const organization = req.user.organization;
    const queryParams = getQueryParamsForSatelliteReports(req.query);
    const satelliteReportsData = await getSatelliteReports({
      ...queryParams,
      organizationId: organization,
      reportTypes: BASIC_REPORT_TYPES,
      reportGroup: 'Crop Health Report',
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: satelliteReportsData,
      })
    );
  } catch (error) {
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const report = await getSatelliteReportGroupById(req.params.id, true, req.headers.lang || 'en', {
      reportGroup: 'Crop Health Report',
      reportType: { [Op.in]: BASIC_REPORT_TYPES },
    });
    if (!report) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.REPORT_DATA_DOESNOT_EXISTS,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: error.FETCH,
        data: report,
      })
    );
  } catch (error) {
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get('/export/:fileType', auth, translation, exportCropHealthReportListingRouteHandler);

router.post(
  '/',
  auth,
  convertEmptyStringToNull(),
  requestCropHealthReportValidation,
  validationErrorHandler,
  generateCropHealthReportRouteHandler
);

router.post(
  '/:id/download-pdf',
  auth,
  translation,
  multer({ storage: multer.memoryStorage(), limits: { files: 1 } }).single('mapImage'),
  downloadCropHealthPdfRouteHandler
);

module.exports = router;
