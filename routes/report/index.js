const express = require("express");
const moment = require("moment");
var momentTz = require("moment-timezone");
const router = express.Router();
const { isArray, isEmpty } = require("lodash");
var Sequelize = require("sequelize");

// loading models
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { langObj } = require(rootPath + "/helpers/consts");
const {
  errorResp,
  successRespSync,
  successResp,
  errorRespSync,
  serverError,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general"); // constant messages
// validation modules
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  deleteSatelliteReportCoordinates,
  calculateCenteroiPolygon,
  formatDatesDataAndGetSignedURL,
  gettingCropTypeDetails,
  checkExistingData,
  SendNotificationToMultipleDevices,
  insertExistingData,
  getReportTypesCountAndData,
  checkInProgressReports,
  sendMsgToSQS,
  composeDataForInserting,
  getExistingLocationData,
} = require("./utils");
const translation = require("../../middleware/translation");
const {
  validateFarmBelongsToUser,
  validateSegmentBelongsToUser,
} = require(rootPath + "/routes/irrigation/utils");


router.use("/recommendation", require("./recommendation"));
router.use('/crop-health-reports', require('./crop-health'));


router.get("/latest/grouped", auth, async (req, res) => {
  console.log(req.user.id);
  try {
    let latest = await db.satellite_report.findOne({
      attributes: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("createdAt"),
            "%Y-%m-%d 00:00:00"
          ),
          "latestCreatedDate",
        ],
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("createdAt"),
            "%Y-%m-%d 23:59:59"
          ),
          "latestCreatedDateEnd",
        ],
      ],
      group: ["createdAt"],
      where: {
        userId: req.user.id,
        status: ["COMPLETED", "IN-PROGRESS", "PENDING"],
        reportGroup: 'Satellite Report',
      },
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    if (latest?.latestCreatedDate != undefined) {
      // fetch data from the Reports table
      let repotrsData = await db.satellite_report.findAll({
        include: [
          {
            model: db.satellite_report_coordinates,
            attributes: ["latitude", "longitude"],
            as: "coordinates",
            required: true,
          },
        ],
        where: {
          userId: req.user.id,
          createdAt: {
            [db.Sequelize.Op.gte]: latest.latestCreatedDate,
            [db.Sequelize.Op.lte]: latest.latestCreatedDateEnd,
          },
          status: ["COMPLETED", "IN-PROGRESS", "PENDING"],
          reportGroup: 'Satellite Report',
        },
        order: [["createdAt", "DESC"]],
      });
      let response = await formatDatesDataAndGetSignedURL(repotrsData, "multi");

      // group by requestId
      let tmpObj = {},
        resArr = [];

      response.forEach((el) => {
        tmpObj[el.requestId] = [...(tmpObj[el.requestId] || []), el];
      });

      for (let key in tmpObj) {
        resArr.push(tmpObj[key]);
      }

      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            numRows: resArr.length,
            data: resArr,
          },
        })
      );
    } else {
      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            numRows: 0,
          },
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
router.get("/grouped", auth, async (req, res) => {
  try {
    let { page, limit, order } = req.query;
    let { id: user_id } = req.user;
    if (notEmpty(limit)) {
      limit = parseInt(limit);
    } else {
      limit = 10;
    }
    if (notEmpty(page)) {
      page = parseInt(page);
    } else {
      page = 1;
    }

    const membershipSql = `SELECT uump.user_id, SUM(um.satellite_report) totalSatelliteReports FROM user_membership um JOIN users_user_membership_map uump ON um.id=uump.membership_id where uump.user_id=? GROUP BY uump.user_id`;
    const satelliteSql = `SELECT COUNT(id) downloadedSatelliteReports, EXTRACT(YEAR_MONTH FROM createdAt) yearMonth FROM satellite_reports  where userId=? GROUP by yearMonth HAVING yearMonth=EXTRACT(YEAR_MONTH FROM UTC_DATE())`;
    const [userMemberships, satelliteData] = await Promise.all([
      db.sequelize.query(membershipSql, {
        plain: true,
        replacements: [user_id],
        type: db.sequelize.QueryTypes.SELECT,
      }),

      db.sequelize.query(satelliteSql, {
        plain: true,
        replacements: [user_id],
        type: db.sequelize.QueryTypes.SELECT,
      }),
    ]);
    const usage = {
      totalDownloads: userMemberships?.totalSatelliteReports || 0,
      usedDownloads: satelliteData?.downloadedSatelliteReports || 0,
    };

    let query = {
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ["latitude", "longitude"],
          as: "coordinates",
          required: true,
        },
      ],
      where: {
        userId: req.user.id,
        reportGroup: 'Satellite Report',
      },
    };

    if (notEmpty(order) && order === "asc") {
      query.order = [["createdAt", "asc"]];
    } else {
      query.order = [["createdAt", "desc"]];
    }

    query.offset = (page - 1) * limit;
    query.limit = limit;
    // query.group = "requestId"
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findAll(query);

    let response = await formatDatesDataAndGetSignedURL(repotrsData, "multi");

    // group by requestId
    let tmpObj = {},
      resArr = [];

    response.forEach((el) => {
      tmpObj[el.requestId] = [...(tmpObj[el.requestId] || []), el];
    });

    for (let key in tmpObj) {
      resArr.push(tmpObj[key]);
    }

    // console.log('after',response);
    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          usage,
          numRows: resArr.length,
          data: resArr,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/remainingReports", auth, async (req, res) => {
  let userId = req.user.id;
  try {
    // fetch data from the Reports table
    let userMembershipMapRes = [],
      satelliteRes = [],
      today = new Date(),
      thisMonthsReports = 0,
      remainingReports = process.env.SATELLITE_REPORT_LIMIT || 5;
    userMembershipMapRes = await db.UserMembershipMap.findOne({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: db.Membership,
          as: "membership",
        },
      ],
    });
    if (userMembershipMapRes) {
      satelliteRes = await db.satellite_report.findAll({
        where: {
          userId: req.user.id,
          reportGroup: 'Satellite Report',
        },
      });
      const allotedQuota =
        userMembershipMapRes?.dataValues?.membership?.dataValues
          ?.satellite_report;
      if (satelliteRes.length > 0) {
        satelliteRes.forEach((report) => {
          let monthCreated = new Date(report.createdAt).getMonth();
          let thisMonth = today.getMonth();
          if (monthCreated == thisMonth) {
            thisMonthsReports++;
          }
        });
        return res.json(
          await successResp({
            msg: success.FETCH,
            data: {
              allotedQuota,
              monthReportsUtlized: thisMonthsReports,
              remainingReports: parseInt(allotedQuota) - thisMonthsReports,
            },
          })
        );
      } else {
        return res.json(
          await successResp({
            msg: success.FETCH,
            data: {
              allotedQuota,
              monthReportsUtlized: 0,
              remainingReports: parseInt(allotedQuota),
            },
          })
        );
      }
    } else {
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            allotedQuota: remainingReports,
            monthReportsUtlized: 0,
            remainingReports,
          },
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report/sendNotification/{id}:
 *   get:
 *     summary: Send Notification
 *     description: Returns specific report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: report id
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 *
 */

router.get("/sendNotification/:id", auth, async (req, res) => {
  let userId = req.user.id;
  let { id } = req.params;
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findOne({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ["latitude", "longitude"],
          as: "coordinates",
          required: true,
        },
      ],
      where: {
        id: id,
        userId: userId,
        status: "COMPLETED",
        reportGroup: 'Satellite Report',
      },
    });
    console.log(repotrsData);
    if (repotrsData != null) {
      // const notify = await SendNotificationToMultipleDevices(repotrsData);
      // console.log(notify);
      SendNotificationToMultipleDevices(repotrsData)
        .then((response) => {
          console.log(response);
          if (response) {
            return res.json(
              successRespSync({
                msg: success.FETCH,
                data: repotrsData,
              })
            );
          }
        })
        .catch((err) => {
          logErrorOccurred(__filename, err);
          return serverError(res, err);
        });
    } else {
      return res.json(
        await errorResp({
          code: success.code.INFORMATION,
          msg: "No Report Found to send Notification !!!! Testing IF THIS USER HAS COMPLETED STATUS IT WILL SEND NOTIFICATION",
        })
      );
    }

    // response to the client
    // return res.json(
    //   await successResp({
    //     msg: success.FETCH,
    //     data: {
    //       data: repotrsData,
    //     },
    //   })
    // );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report:
 *   post:
 *     summary: Add Report Data
 *     description: Add new Report data for a user
 *     tags: [Report]
 *     requestBody:
 *       description: Request body for creting new Report data
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                dateOfInterest:
 *                  type: string
 *                cropType:
 *                  type: integer
 *                cropVariety:
 *                  type: integer
 *                locationName:
 *                  type: string
 *                segment:
 *                  type: string
 *                locationInfo:
 *                  type: object
 *              required:
 *                - dateOfInterest
 *                - locationInfo
 *            example:
 *              {"dateOfInterest":"2022-02-15 06:37:24","locationName": "Sugarcane Farm","segment": "Top right segment", "locationInfo":{"type":"Polygon","coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Report data has been added successfully.
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Invalid data provided."}
 *        '409':
 *           description: CONFLICT - This occurs when reports are already in progress and user request for other reports
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example:
 *                    {"success": false,"code": 409,"message": "New report requests can be submitted after completing current report requests"}
 *
 */
router.post(
  "/",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const language = req.headers["lang"] || "en";
      let reqFields = ["dateOfInterest", "locationInfo"],
        userMembershipMapRes = [],
        satelliteRes = [],
        today = new Date(),
        thisMonthsReports = 0;
      let msg = null,
        satResGeoId = [],
        satResFarmId = [],
        ingestionDatePending = [];

      //check farm id
      if (req.body.farmId) {
        await validateFarmBelongsToUser(req.body.farmId, req.user.id);

        // get old report with same farmId
        satResFarmId = await db.satellite_report.findAll({
          where: {
            userId: req.user.id,
            farmId: req.body.farmId,
            status: "COMPLETED",
            reportGroup: 'Satellite Report',
          },
          order: [["createdAt", "DESC"]],
        });
      }

      // check segment id
      if (req.body.geofenceId) {
        await validateSegmentBelongsToUser(req.body.geofenceId, req.user.id);

        // get old report with same geofenceId
        satResGeoId = await db.satellite_report.findAll({
          where: {
            userId: req.user.id,
            geofenceId: req.body.geofenceId,
            status: "COMPLETED",
            reportGroup: 'Satellite Report',
          },
          order: [["createdAt", "DESC"]],
        });
      }

      ingestionDatePending = [...satResGeoId, ...satResFarmId].filter((el) => {
        if (el.status == "PENDING") {
          return true;
        }
      });

      const translatedErrorMsg = req.translateFunction(
        { msg: error.REPORTS_ALREADY_IN_PROGRESS },
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "error",
        }
      );

      if (ingestionDatePending.length > 0) {
        return res.json(
          errorRespSync({
            code: error.code.CONFLICT,
            msg: translatedErrorMsg.msg,
          })
        );
      }

      if (satResFarmId && satResFarmId.length && satResFarmId.length > 0) {
        // ingestionDate logic
        await ingestionDateLogic(req, satResFarmId[0], t);
      }
      if (satResGeoId && satResGeoId.length && satResGeoId.length > 0) {
        // ingestionDate logic
        await ingestionDateLogic(req, satResGeoId[0], t);
      }

      // check if user has membership
      satelliteRes = await db.satellite_report.findAll({
        where: {
          userId: req.user.id,
          status: "COMPLETED",
          reportGroup: 'Satellite Report',
        },
      });
      if (satelliteRes.length > 0) {
        satelliteRes.forEach((report) => {
          let monthCreated = new Date(report.createdAt).getMonth();
          let thisMonth = today.getMonth();
          if (monthCreated == thisMonth) {
            thisMonthsReports++;
          }
        });
        userMembershipMapRes = await db.UserMembershipMap.findOne({
          where: {
            user_id: req.user.id,
          },
          include: [
            {
              model: db.Membership,
              as: "membership",
            },
          ],
        });

        if (!userMembershipMapRes) {
          if (thisMonthsReports >= (process.env.SATELLITE_REPORT_LIMIT || 5)) {
            msg = `Your subscription only allows for ${
              userMembershipMapRes.membership.satellite_report || 5
            } set of satellite reports.  Please upgrade to get weekly reports.`;
          }
        } else if (
          userMembershipMapRes.membership.satellite_report >
          (process.env.SATELLITE_REPORT_LIMIT || 5)
        ) {
          if (
            thisMonthsReports >=
            userMembershipMapRes.membership.satellite_report
          ) {
            msg = `Your subscription only allows for ${
              userMembershipMapRes.membership.satellite_report || 5
            } set of satellite reports.  Please upgrade to get weekly reports.`;
          }
        } else if (
          thisMonthsReports >=
            userMembershipMapRes.membership.satellite_report ||
          thisMonthsReports >= (process.env.SATELLITE_REPORT_LIMIT || 5)
        ) {
          msg = `Your subscription only allows for ${
            userMembershipMapRes.membership.satellite_report || 5
          } set of satellite reports.  Please upgrade to get weekly reports.`;
        }
      }
      reqFields.forEach(async function (field) {
        if (!req.body[field]) {
          msg = field + " is required";
          return;
        }
      });

      if (msg) {
        return res.status(success.code.OK).json(
          await errorResp({
            msg: msg,
          })
        );
      }

      if (isEmpty(req.body.locationInfo)) {
        msg = "locationInfo should not be empty";
      } else {
        if (!isArray(req.body.locationInfo.coordinates)) {
          msg = "Coordinates should be an array!";
        } else {
          if (isEmpty(req.body.locationInfo.coordinates)) {
            msg = "Coordinates should not be empty";
          } else {
            if (req.body.locationInfo.coordinates.length < 3) {
              msg = "This farm does not have a geofence registered";
            }
          }
        }
      }

      if (msg) {
        return res.status(success.code.OK).json(
          await errorResp({
            msg: msg,
          })
        );
      }

      if (!moment(new Date(req.body.dateOfInterest)).isValid()) {
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Date of Interest must be date",
          })
        );
      }

      //Getting Server's TImeZone
      let tz = moment.tz.guess();

      // Changing User requested Date and time to server's time zone for future check
      let dateOfInterestLocalTimeZone = momentTz.tz(
        new Date(req.body.dateOfInterest),
        tz
      );

      if (moment(dateOfInterestLocalTimeZone).isAfter())
        return res.status(error.code.UNPROCESSABLE_ENTITY).json(
          await errorResp({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: "Date of Interest must be from past",
          })
        );

      //Check if the user has already report in-progress
      let checkInprogress = await checkInProgressReports(req.user.id, t);
      if (checkInprogress > 0) {
        return res.json(
          errorRespSync({
            code: error.code.CONFLICT,
            msg: translatedErrorMsg.msg,
          })
        );
      }

      let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      let dateOfInterestFormat = moment(
        new Date(req.body.dateOfInterest)
      ).format("YYYY-MM-DD");

      const {
        dateOfInterest,
        cropType,
        cropVariety,
        locationName,
        segment,
        farmId,
        geofenceId,
      } = req.body;

      let set = {
        userId: req.user.id,
        dateOfInterest: dateOfInterestFormat,
        cropType,
        cropVariety,
        locationName,
        segment,
        createdAt: currentDate,
        status: "PENDING",
        farmId,
        geofenceId,
      };

      // Checking if Records already exist with same center points
      if (notEmpty(req.body.locationInfo.coordinates)) {
        const centroidPolygon = await calculateCenteroiPolygon(
          req.body.locationInfo.coordinates
        );
        const reportDataWithCenterPoints = await checkExistingData(
          centroidPolygon,
          set.userId,
          set.dateOfInterest,
          t
        );

        if (reportDataWithCenterPoints.data != null) {
          // If record found but from other user
          if (!reportDataWithCenterPoints.isSameUser) {
            const reportDataToInsert = await composeDataForInserting(
              reportDataWithCenterPoints.data,
              set.userId,
              set.dateOfInterest,
              set.createdAt,
              set.farmId,
              set.geofenceId
            );
            const insertData = await insertExistingData(reportDataToInsert, t);
            if (insertData) {
              return res.json(
                await errorResp({
                  code: success.code.INFORMATION,
                  msg: success.REPORT_ALREADY_CREATED,
                })
              );
            }
          } else {
            // Record Forund for the same user so we don't have to insert again
            return res.json(
              await errorResp({
                code: success.code.INFORMATION,
                msg: success.REPORT_ALREADY_CREATED,
              })
            );
          }
        } else {
          const existingLocationData = await getExistingLocationData(
            centroidPolygon,
            set.userId
          );

          set.centerLatitude = centroidPolygon[0];
          set.centerLongitude = centroidPolygon[1];
          set.coordinates = req.body.locationInfo.coordinates;
          const reportTypes = await getReportTypesCountAndData(t);
          // Get Sowing date and harvesting date on base of croptype and crop variety
          if (cropType != undefined || cropType != null) {
            const cropTypeData = await gettingCropTypeDetails(
              cropType,
              cropVariety,
              t
            );
            if (cropTypeData != undefined || cropTypeData != null) {
              set.cropTypeName = cropTypeData.cropType.name;
              if (cropVariety != undefined || cropVariety != null) {
                set.cropVarietyName = cropTypeData.cropVariety[0].name;
              }
              if (cropTypeData.sowingDate != null) {
                set.sowingDate = cropTypeData.sowingDate;
              }
              if (cropTypeData.harvestingDate != null) {
                set.harvestingDate = cropTypeData.harvestingDate;
              }
            }
          }
          // Composing the insertion data on base of report type
          let reportDataToInsert = [];
          if (reportTypes.data != null) {
            for (const reportType of reportTypes.data) {
              let setNew = {
                ...set,
                language: langObj[language],
                reportType: reportType.name,
              };
              Object.keys(setNew).forEach((key) => {
                setNew[key] == undefined || setNew[key] == null
                  ? delete setNew[key]
                  : {};
              });
              reportDataToInsert.push(setNew);
            }
            const insertData = await insertExistingData(reportDataToInsert, t);

            if (insertData) {
              sendMsgToSQS(set.userId, currentDate, existingLocationData)
                .then((response) => {
                  if (response) {
                    return res.json(
                      successRespSync({
                        msg: success.REPORT_ADDED,
                        data: {},
                      })
                    );
                  }
                })
                .catch((err) => {
                  logErrorOccurred(__filename, err);
                  return serverError(res, err);
                });
            }
          }
        }
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      t?.rollback()
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /report/latest:
 *   get:
 *     summary: Get all latest reports list of a user --- ( For client-side )
 *     description: Returns all reports list
 *     tags: [Report]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 2, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 *
 */

router.get("/latest", auth, async (req, res) => {
  console.log(req.user.id);
  try {
    let latest = await db.satellite_report.findOne({
      attributes: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("createdAt"),
            "%Y-%m-%d 00:00:00"
          ),
          "latestCreatedDate",
        ],
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("createdAt"),
            "%Y-%m-%d 23:59:59"
          ),
          "latestCreatedDateEnd",
        ],
      ],
      group: ["createdAt"],
      where: {
        userId: req.user.id,
        status: ["COMPLETED", "IN-PROGRESS", "PENDING"],
        reportGroup: 'Satellite Report',
      },
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    if (latest?.latestCreatedDate != undefined) {
      // fetch data from the Reports table
      let repotrsData = await db.satellite_report.findAll({
        include: [
          {
            model: db.satellite_report_coordinates,
            attributes: ["latitude", "longitude"],
            as: "coordinates",
            required: true,
          },
        ],
        where: {
          userId: req.user.id,
          createdAt: {
            [db.Sequelize.Op.gte]: latest.latestCreatedDate,
            [db.Sequelize.Op.lte]: latest.latestCreatedDateEnd,
          },
          status: ["COMPLETED", "IN-PROGRESS", "PENDING"],
          reportGroup: 'Satellite Report',
        },
        order: [["createdAt", "DESC"]],
      });
      let response = await formatDatesDataAndGetSignedURL(repotrsData, "multi");
      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            numRows: response.length,
            data: response,
          },
        })
      );
    } else {
      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            numRows: 0,
          },
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Get all reports list of a user --- ( For client-side )
 *     description: Returns all reports list
 *     tags: [Report]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "usage": { "totalDownloads": "3", "usedDownloads": 2 }, "numRows": 3, "info": [ { "id": 3, "reportType": "RECI", "dateOfInterest": null, "cropType": null, "zoomLevel": 12, "userId": 17, "centerLatitude": null, "centerLongitude": null, "sowingDate": null, "harvestingDate": null, "satelliteSource": null, "inputImage": null, "inputImgS3Key": null, "geoImagePath": null, "shortImagePath": null, "reportPDFPath": null, "cropTypeName": null, "reportS3Key": null, "cropVariety": null, "cropVarietyName": null, "reportName": null, "locationName": null, "segment": null, "status": "IN-PROGRESS", "createdAt": "2022-08-20T02:39:51.000Z", "updatedAt": "2022-03-10T02:40:34.000Z", "coordinates": [ { "latitude": 19.627762, "longitude": 74.553147 }, { "latitude": 19.627692, "longitude": 74.554243 } ] } ] } }
 *
 *
 */

router.get("/", auth, async (req, res) => {
  try {
    let { page, limit, order } = req.query;
    let { id: user_id } = req.user;
    if (notEmpty(limit)) {
      limit = parseInt(limit);
    } else {
      limit = 10;
    }
    if (notEmpty(page)) {
      page = parseInt(page);
    } else {
      page = 1;
    }

    const membershipSql = `SELECT uump.user_id, SUM(um.satellite_report) totalSatelliteReports FROM user_membership um JOIN users_user_membership_map uump ON um.id=uump.membership_id where uump.user_id=? GROUP BY uump.user_id`;
    const satelliteSql = `SELECT COUNT(id) downloadedSatelliteReports, EXTRACT(YEAR_MONTH FROM createdAt) yearMonth FROM satellite_reports  where userId=? GROUP by yearMonth HAVING yearMonth=EXTRACT(YEAR_MONTH FROM UTC_DATE())`;
    const [userMemberships, satelliteData] = await Promise.all([
      db.sequelize.query(membershipSql, {
        plain: true,
        replacements: [user_id],
        type: db.sequelize.QueryTypes.SELECT,
      }),

      db.sequelize.query(satelliteSql, {
        plain: true,
        replacements: [user_id],
        type: db.sequelize.QueryTypes.SELECT,
      }),
    ]);
    const usage = {
      totalDownloads: userMemberships?.totalSatelliteReports || 0,
      usedDownloads: satelliteData?.downloadedSatelliteReports || 0,
    };

    let query = {
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ["latitude", "longitude"],
          as: "coordinates",
          required: true,
        },
      ],
      where: {
        userId: req.user.id,
        reportGroup: 'Satellite Report',
      },
    };

    if (notEmpty(order) && order === "asc") {
      query.order = [["createdAt", "asc"]];
    } else {
      query.order = [["createdAt", "desc"]];
    }

    query.offset = (page - 1) * limit;
    query.limit = limit;
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findAll(query);

    let response = await formatDatesDataAndGetSignedURL(repotrsData, "multi");
    // console.log('after',response);
    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          usage,
          numRows: response.length,
          data: response,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get specific report data
 *     description: Returns specific report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: report id
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 *
 */

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findOne({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ["latitude", "longitude"],
          as: "coordinates",
          required: true,
        },
      ],
      where: {
        id: id,
      },
    });

    //get area unit
    let userId = repotrsData.userId;
    let unitRes = await db.UserUnitConfiguration.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: "user_config_unitType",
          where: {
            name: "Area",
          },
        },
        {
          model: db.UnitsList,
          as: "user_config_unit",
        },
      ],
    });

    // formatting sowing date and harwesting date
    if (repotrsData != null) {
      repotrsData = await formatDatesDataAndGetSignedURL(repotrsData, "single");
    }
    repotrsData = JSON.parse(JSON.stringify(repotrsData));
    repotrsData.getHeatmap = true;
    repotrsData.areaUnit = unitRes.user_config_unit.abbvr;
    repotrsData.radiusInMeter = repotrsData.radius;
    repotrsData.radius = repotrsData.radius / 1000; // Python expects radius in KM
    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          data: repotrsData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Delete report data
 *     description: Delete report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Report data has been deleted successfully.
 *                   data: {}
 *        '404':
 *           description: Report data does not exist
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Report data does not exist."}
 *
 */
router.delete("/:id", auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const id = req.params.id;
    const report = await db.satellite_report.findOne({
      where: {
        id,
      },
    });
    if (report === null) {
      return res.json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: error.REPORT_DATA_DOESNOT_EXISTS,
        })
      );
    }
    await db.satellite_report.destroy(
      {
        where: {
          id,
        },
      },
      { transaction: t }
    );

    await deleteSatelliteReportCoordinates(id, t);

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.REPORT_DELETED,
        data: {},
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc Report update
 */
/** @swagger
 * /report/{id}:
 *   put:
 *     summary: Update report data
 *     description: Update report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: report id
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Request body for updating report data
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               inputImage:
 *                 type: string
 *                 example: "s3 storage path"
 *               geoImagePath:
 *                 type: string
 *                 example: "s3 storage path"
 *               shortImagePath:
 *                 type: string
 *                 example: "s3 storage path"
 *               reportPDFPath:
 *                 type: string
 *                 example: "s3 storage path"
 *               reportS3Key:
 *                 type: string
 *                 example: "example.pdf"
 *               reportName:
 *                 type: string
 *                 example: "createdAt_reportType"
 *               status:
 *                 type: string
 *                 example: "PENDING | IN-PROGRESS | COMPLETED"
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Report data has been updated successfully.
 *        '404':
 *           description: Report data does not exist
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Report data doesnot exist."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 */
router.put("/:id", async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const reportDataFromDB = await db.satellite_report.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (reportDataFromDB === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.REPORT_DATA_DOESNOT_EXISTS,
        })
      );
    }
    const {
      inputImage,
      geoImagePath,
      shortImagePath,
      reportPDFPath,
      reportS3Key,
      reportName,
      status,
      ingestionDate,
      pngS3Key,
      message,
    } = req.body;

    let set = {
      satelliteSource: "Santinel",
      inputImage,
      geoImagePath,
      shortImagePath,
      reportPDFPath,
      reportS3Key,
      reportName,
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      status,
      ingestionDate,
      pngS3Key,
      message,
    };

    // Updating report data by Python script
    await db.satellite_report.update(
      set,
      {
        where: { id: req.params.id },
      },
      {
        transaction: t,
      }
    );

    await t.commit();
    // checking If transaction is commited then getting the current updated record for notify
    if (t.finished == "commit") {
      var repotrsData = await db.satellite_report.findOne({
        include: [
          {
            model: db.satellite_report_coordinates,
            attributes: ["latitude", "longitude"],
            as: "coordinates",
          },
        ],
        where: { id: req.params.id },
      });
      if (repotrsData != null && status == "COMPLETED" && repotrsData.reportGroup === 'Satellite Report') {
        SendNotificationToMultipleDevices(repotrsData)
          .then((response) => {
            console.log(response);
            if (response) {
              return res.json(
                successRespSync({
                  msg: success.REPORT_UPDATED,
                  // data: repotrsData
                })
              );
            }
          })
          .catch((err) => {
            logErrorOccurred(__filename, err);
            return serverError(res, err);
          });
      }
    }
    return res.json(
        successRespSync({
            msg: success.REPORT_UPDATED,
            // data: set
        })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    if (err?.msg && err?.customValidationError) {
      return res.json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: err.msg,
        })
      );
    }
    return serverError(res, err);
  }
});

// Api's for front end

/**
 * @swagger
 * /report/reportbyuser/{id}:
 *   get:
 *     summary: Get specific report data --- ( For Client-side )
 *     description: Returns specific report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: report id
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"numRows" : 1, "info": [ {"id": 1, "reportType":"NDVI","dateOfInterest":"2022-02-15 06:37:24","zoomLevel": 12, "cropType": "", "userId": 1, "centerLatitude": 12.222, "centerLongitude": 12.222,"sowingDate": {"start": "02/07/2022","end": "02/10/2022"},"harvestingDate": {"start": "02/07/2022","end": "02/10/2022"},"satelliteSource":"Santinel","inputImage":"S3 Path", "geoImagePath":"S3 Path", "shortImagePath":"S3 Path", "reportPDFPath":"S3 Path", "cropTypeName":"S3 Path", "reportS3Key":"S3 Path To Download the Report", "cropVariety": 12, "cropVarietyName":"Name of Crop Variety", "locationName":"Location Name Here", "Segment":"Segment Name Here", "reportName":"reportType + current Date", "status": "PENDING | IN-PROGRESS | COMPLETED", "coordinates":[{"latitude": 0.8989,"longitude": 1.3232},{"latitude": 0.8989,"longitude": 1.3232}]}]}
 *
 *
 */

router.get("/reportbyuser/:id", auth, async (req, res) => {
  let { id } = req.params;
  let userId = req.user.id;
  try {
    // fetch data from the Reports table
    let repotrsData = await db.satellite_report.findOne({
      include: [
        {
          model: db.satellite_report_coordinates,
          attributes: ["latitude", "longitude"],
          as: "coordinates",
          required: true,
        },
      ],
      where: {
        id: id,
        userId: userId,
        reportGroup: 'Satellite Report',
      },
    });

    if (repotrsData != null) {
      repotrsData = await formatDatesDataAndGetSignedURL(repotrsData, "single");
    }

    // response to the client
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          data: repotrsData,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc Report update
 */
/** @swagger
 * /report/reportbyuser/{id}:
 *   put:
 *     summary: Update report data --- ( For Client-side )
 *     description: Update report data
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: report id
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Request body for updating report data
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               dateOfInterest:
 *                 type: string
 *                 example: "2022-02-15 06:37:24"
 *               cropType:
 *                 type: integer
 *               cropVariety:
 *                 type: integer
 *               locationName:
 *                 type: string
 *               segment:
 *                 type: string
 *               locationInfo:
 *                 type: object
 *                 example: { "type": "Polygon", "coordinates": [{ "latitude": 0.8899, "longitude": 1.222},{ "latitude": 0.8899, "longitude": 1.222},{ "latitude": 0.8899, "longitude": 1.222}]}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Report data has been updated successfully.
 *        '404':
 *           description: Report data does not exist
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Report data doesnot exist."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 */
router.put("/reportbyuser/:id", auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let msg = null;
    const reportDataFromDB = await db.satellite_report.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    console.log(reportDataFromDB);
    // Checking if status is in progress or completed
    if (
      reportDataFromDB != null &&
      (reportDataFromDB.status === "IN-PROGRESS" ||
        reportDataFromDB.status === "COMPLETED")
    ) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg:
            reportDataFromDB.status === "IN-PROGRESS"
              ? error.UPDATE_REPORT_IN_PROGRESS
              : error.UPDATE_REPORT_COMPLETED,
        })
      );
    }
    if (reportDataFromDB === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.REPORT_DATA_DOESNOT_EXISTS,
        })
      );
    }

    // Checking if coordinates array is valid
    if (isEmpty(req.body.locationInfo)) {
      msg = "locationInfo should not be empty";
    } else {
      if (!isArray(req.body.locationInfo.coordinates)) {
        msg = "Coordinates should be an array!";
      } else {
        if (isEmpty(req.body.locationInfo.coordinates)) {
          msg = "Coordinates should not be empty";
        } else {
          if (req.body.locationInfo.coordinates.length < 3) {
            msg = "Please give polygon coordinates";
          }
        }
      }
    }

    if (msg) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: msg,
        })
      );
    }

    // Validations for dates
    if (!moment(new Date(req.body.dateOfInterest)).isValid()) {
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        await errorResp({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Date of Interest must be date",
        })
      );
    }

    //Getting Server's TImeZone
    let tz = moment.tz.guess();

    // Changing User requested Date and time to server's time zone for future check
    let dateOfInterestLocalTimeZone = momentTz.tz(
      new Date(req.body.dateOfInterest),
      tz
    );

    if (moment(dateOfInterestLocalTimeZone).isAfter())
      return res.status(error.code.UNPROCESSABLE_ENTITY).json(
        await errorResp({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: "Date of Interest must be from past",
        })
      );

    const { dateOfInterest, cropType, cropVariety, locationName, segment } =
      req.body;
    let dateOfInterestFormat = moment(new Date(req.body.dateOfInterest)).format(
      "YYYY-MM-DD"
    );
    let set = {
      userId: req.user.id,
      dateOfInterest: dateOfInterestFormat,
      cropType,
      cropVariety,
      locationName,
      segment,
      updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    // remove undefined values before inserting
    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null || set[key] == ""
        ? delete set[key]
        : {};
    });

    let satelliteReportId = req.params.id;

    //Check in case of update if report already exist
    if (notEmpty(req.body.locationInfo.coordinates)) {
      await deleteSatelliteReportCoordinates(satelliteReportId, t);
      const centroidPolygon = await calculateCenteroiPolygon(
        req.body.locationInfo.coordinates
      );
      const reportDataWithCenterPoints = await checkExistingData(
        centroidPolygon,
        req.params.id,
        set.dateOfInterest,
        t
      );
      console.log(reportDataWithCenterPoints);
      let coordinatesArr;
      if (reportDataWithCenterPoints.data != null) {
        set.centerLatitude = reportDataWithCenterPoints.centerLatitude;
        set.centerLongitude = reportDataWithCenterPoints.centerLongitude;
        set.sowingDate = reportDataWithCenterPoints.sowingDate;
        set.harvestingDate = reportDataWithCenterPoints.harvestingDate;
        set.satelliteSource = reportDataWithCenterPoints.satelliteSource;
        set.inputImage = reportDataWithCenterPoints.inputImage;
        set.geoImagePath = reportDataWithCenterPoints.geoImagePath;
        set.shortImagePath = reportDataWithCenterPoints.shortImagePath;
        set.reportPDFPath = reportDataWithCenterPoints.reportPDFPath;
        set.status = reportDataWithCenterPoints.status;
        set.locationName = reportDataWithCenterPoints.locationName;
        set.segment = reportDataWithCenterPoints.segment;
        set.reportName = reportDataWithCenterPoints.reportName;
        coordinatesArr = reportDataWithCenterPoints.coordinates;
      } else {
        set.centerLatitude = centroidPolygon[0];
        set.centerLongitude = centroidPolygon[1];
        set.status = "PENDING";
        coordinatesArr = req.body.locationInfo.coordinates;
        //Getting harvesting date and sowing date if report does not exist
        if (cropType != undefined || cropType != null) {
          const cropTypeData = await gettingCropTypeDetails(
            cropType,
            cropVariety,
            t
          );
          if (cropTypeData != undefined || cropTypeData != null) {
            set.cropTypeName = cropTypeData.cropType.name;
            if (cropVariety != undefined || cropVariety != null) {
              set.cropVarietyName = cropTypeData.cropVariety[0].name;
            }
            if (cropTypeData.sowingDate != null) {
              set.sowingDate = cropTypeData.sowingDate;
            }
            if (cropTypeData.harvestingDate != null) {
              set.harvestingDate = cropTypeData.harvestingDate;
            }
          }
        }
      }
      // await deleteSatelliteReportCoordinates(satelliteReportId, t);
      var reportCoordinates = coordinatesArr.map((data) => {
        const { latitude, longitude } = data;
        return {
          satelliteReportId,
          latitude,
          longitude,
        };
      });
    }

    // Updating report data by User
    await db.satellite_report.update(
      set,
      {
        where: { id: req.params.id },
      },
      {
        transaction: t,
      }
    );

    // insert data into the report coordinates
    await db.satellite_report_coordinates.bulkCreate(reportCoordinates, {
      transaction: t,
    });

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.REPORT_UPDATED,
        // data: set
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    if (err?.msg && err?.customValidationError) {
      return res.json(
        errorRespSync({
          code: error.code.UNPROCESSABLE_ENTITY,
          msg: err.msg,
        })
      );
    }
    return serverError(res, err);
  }
});

async function ingestionDateLogic(req, satResFarmId, t) {
  //Getting Server's TImeZone
  let tz = moment.tz.guess();

  // Changing User requested Date and time to server's time zone for future check
  let dateOfInterestLocalTimeZone = momentTz.tz(
    new Date(req.body.dateOfInterest),
    tz
  );

  if (moment(dateOfInterestLocalTimeZone).isAfter())
    return res.status(error.code.UNPROCESSABLE_ENTITY).json(
      await errorResp({
        code: error.code.UNPROCESSABLE_ENTITY,
        msg: "Date of Interest must be from past",
      })
    );

  // check date of interest is same
  let formattedDateOfInterest = moment(req.body.dateOfInterest).format(
    "YYYY-MM-DD"
  );

  if (formattedDateOfInterest != satResFarmId.dateOfInterest) {
    return;
  } else if (!satResFarmId.ingestionDate) {
    return;
  } else if (satResFarmId.ingestionDate) {
    // check if ingestionDate is within last 5 days
    let fiveDaysBefore = moment().subtract(5, "days");
    let ingestionDateUsable = moment(satResFarmId.ingestionDate).isAfter(
      fiveDaysBefore
    );

    if (ingestionDateUsable) {
      let existingSatelliteRes = await db.satellite_report.findAll({
        where: {
          requestId: satResFarmId.requestId,
        },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["id"],
        },
      });

      let newInserts = JSON.parse(JSON.stringify(existingSatelliteRes));

      newInserts = newInserts.map((el) => {
        el.cropType = req.body.cropType;
        el.cropVariety = req.body.cropVariety;
        return el;
      });

      await db.satellite_report.bulkCreate(newInserts, {
        transaction: t,
      });

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.REPORT_ADDED,
          data: {},
        })
      );
    }
  }

  return;
}

module.exports = router;
