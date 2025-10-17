const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const {
    createReportSettingValidation,
  } = require(rootPath + "/helpers/validation");
  const validationErrorHandler = require(rootPath +
    "/middleware/validation_error_handler");

router.put('/', auth,
 createReportSettingValidation(), validationErrorHandler, async (req, res) => {
    try {
        const { dataType, cropReports, cropReportTypeIds, weatherReport, satelliteReport, scheduleReportDownload,specificNumber, specificNumberUnits, startingDate, specificDaysInWeek, specificDaysReportInterval } = req.body;
        const userId = req.user.id;
        const getReportStored = await db.ReportSettings.findOne({ where: {
            userId
        },
        raw: true
    });
        if(getReportStored){
            await db.ReportSettings.update({ userId, dataType, cropReports, cropReportTypeIds: JSON.stringify(cropReportTypeIds), weatherReport, satelliteReport, scheduleReportDownload,specificNumber, specificNumberUnits, startingDate, specificDaysInWeek: JSON.stringify(specificDaysInWeek), specificDaysReportInterval }, { where: { userId }})
        }else{
            await db.ReportSettings.create({ userId, dataType, cropReports, cropReportTypeIds: JSON.stringify(cropReportTypeIds), weatherReport, satelliteReport, scheduleReportDownload,specificNumber, specificNumberUnits, startingDate, specificDaysInWeek: JSON.stringify(specificDaysInWeek), specificDaysReportInterval });
        }
        return res.json(
            successRespSync({
            msg: success.UPDATED,
            data: {},
            })
        );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  });

  router.get('/', auth,
  async (req, res) => {
     try {
        const userId = req.user.id;
         const getReportStored = await db.ReportSettings.findOne({ where: {
             userId
         },
         raw: true
     });        
     getReportStored.cropReportTypeIds = JSON.parse(getReportStored.cropReportTypeIds)
     getReportStored.specificDaysInWeek = JSON.parse(getReportStored.specificDaysInWeek)
         return res.json(
             successRespSync({
             msg: success.FETCHED,
             data: getReportStored,
             })
         );
     } catch (err) {
       logErrorOccurred(__filename, err);
       return serverError(res, err);
     }
   });


  module.exports = router;