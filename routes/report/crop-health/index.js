const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const convertEmptyStringToNull = require(rootPath + '/middleware/convertEmptyStringToNull');
const {
  getQueryParamsForSatelliteReports,
  getSatelliteReports,
  exportCropHealthReportListingRouteHandler,
  BASIC_REPORT_TYPES,
  generateCropHealthReportRouteHandler,
  downloadCropHealthPdfRouteHandler,
} = require(rootPath + '/helpers/satellite-report');
const { requestCropHealthReportValidation } = require(rootPath + '/helpers/validators/report');
const simpleTranslate = require(rootPath + '/helpers/simpleTranslate')

router.get('/', auth,translation, async (req, res) => {
  try {
    const lang = req.headers.lang || 'en';
    const queryParams = getQueryParamsForSatelliteReports(req.query);
    delete queryParams.limit;
    delete queryParams.offset;
    const satelliteReportsData = await getSatelliteReports(
      {
        ...queryParams,
        userId: req.user.id,
        reportTypes: BASIC_REPORT_TYPES,
        reportGroup: 'Crop Health Report',
      },
      false,
      lang
    );
    satelliteReportsData.rows = satelliteReportsData.rows.map(el =>{
      el.statusTranslated = simpleTranslate(lang, el.status)
      return el
    })
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

router.get('/export/:fileType', auth, translation, exportCropHealthReportListingRouteHandler);

router.post(
  '/',
  auth,
  translation,
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
