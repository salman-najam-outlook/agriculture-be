const express = require("express");
const moment = require("moment");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { langObj } = require("../../../helpers/consts");
const { error, success } = require(rootPath + "/helpers/language");
const { modulesApiExcludedText } = require("../../../helpers/consts");
const { deleteFileS3 } = require("../../../helpers/aws_s3");
const Queue = require("bull");
const {
  logErrorOccurred,
  removeEmptyValuesFromObject,
  notEmpty,
} = require(rootPath + "/helpers/general");
const { sendPushNotification } = require(rootPath +
  "/helpers/pushNotification");
const validationErrorHandler = require("../../../middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const db = require(rootPath + "/models");
const { createSurveyTitle } = require(rootPath + "/helpers/validation");
const { surveyQuestionValidator } = require(rootPath +
  "/helpers/validators/surveyBuilder");
const modulesModel = require("../../../models/admin/modules");
const multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
const { Op, Sequelize, where } = require("sequelize");
const { query } = require("express");
const _ = require("lodash");
const {
  getUserMemberships,
  getUserPermissionsByMemberships,
} = require(rootPath + "/helpers/controller/user-permissions");
const { publishSurvey, getUsers } = require("./utils/common");
const pdfGeneratorSurvey = require("../../../helpers/pdfGeneratorSurvey");
const generateResponsePDF = require("../../../helpers/responsePdfGenerator");
const s3 = require(rootPath + "/components/s3upload.js");
const surveyResponseDownloadQueue = new Queue("surveyResponseDownloadQueue", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});

surveyResponseDownloadQueue.process(async function (job, done) {
  try {
    const { req } = job.data;
    let { userId } = req;
    const { id } = req.params;
    const { download, type } = req.query; // download = response or question
    const downloadType = type;
    let where = {
      surveyId: id,
      isNestedQuestion: 0,
      isDisabled: 0,
    };

    if (download === "question") {
      let query = {
        where,
        distinct: "id",
        include: [
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            include: [
              {
                model: db.surveyQuestions,
                as: "nestedQuestions",
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "questionOptions",
                  },
                ],
              },
            ],
          },
        ],
      };
      const surveyQuestions = await db.surveyQuestions.findAll({
        ...query,
      });

      const surveyDetails = await db.surveysList.findOne({
        where: { id },
        attributes: [
          "title",
          "createdAt",
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions WHERE surveyId = ${id} and isNestedQuestion = 0 and isDisabled = 0)`
            ),
            "questions",
          ],
        ],
        raw: true,
      });
      const _data = {
        title: "PDF Survey Question",
        subHeader: {
          surveyTitle: surveyDetails.title,
          dateCreated: moment(surveyDetails.createdAt).format("DD/MM/YYYY"),
          questions: surveyDetails.questions,
        },
        tableData: surveyQuestions,
      };
      const pdfData = await pdfGeneratorSurvey(_data, req, "question");
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        let pdfFileName = `surveyQuestion/survey_question_${new Date().getTime()}.pdf`;
        let pdfFileStream = fs.createReadStream(pdfData.path);
        let s3Res = await s3.uploadFileStreamToS3(pdfFileStream, pdfFileName);
        await db.surveyResponseDownloadHistory.update(
          {
            surveyId: id,
            fileName: pdfFileName,
            fileUrl: s3Res,
            jobId: job.id,
            status: "done",
            userId: userId,
          },
          { where: { jobId: job.id } }
        );
        done();
      }
    } else if (download === "response") {
      if (downloadType === "pdf") {
        let query = {
          where: { id },
          attributes: [
            "title",
            "createdAt",
            [
              db.sequelize.literal(
                `(SELECT count(*) from survey_questions_response WHERE surveyId = ${id})`
              ),
              "responses",
            ],
          ],
          include: [
            {
              model: db.surveyQuestions,
              as: "surveyQuestions",
              where: { isDisabled: false, isNestedQuestion: false },
              include: [
                {
                  model: db.surveyQuestionOptions,
                  as: "questionOptions",
                  include: [
                    {
                      model: db.surveyQuestions,
                      as: "nestedQuestions",
                      where: { isDisabled: false },
                      required: false,
                      include: [
                        {
                          model: db.surveyQuestionOptions,
                          as: "questionOptions",
                          required: false,
                        },
                        {
                          model: db.surveyQuestionsResponse,
                          as: "surveyQuestionsResponse",
                          required: false,
                          include: [
                            {
                              attributes: [
                                "fullName",
                                "id",
                                "firstName",
                                "middleName",
                                "lastName",
                                "countryCode",
                                "mobile",
                                "email",
                              ],
                              model: db.user,
                              as: "user",
                            },
                            {
                              model: db.Option,
                              as: "crop",
                              attributes: ["id", "name"],
                            },
                            {
                              model: db.Geofence,
                              as: "geofence",
                              attributes: ["id", "geofenceName"],
                              include: [
                                {
                                  model: db.user_farm,
                                  attributes: ["farmName"],
                                  as: "farms"
                                }
                              ]
                            },
                            {
                              model: db.Equipment,
                              as: "equipment",
                              attributes: ["id", ["displayName", "name"]],
                            },
                            {
                              model: db.user,
                              as: "farm",
                              attributes: [
                                "id",
                                "firstName",
                                "middleName",
                                "lastName",
                                "fullName",
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: db.surveyQuestionsResponse,
                  as: "surveyQuestionsResponse",
                  include: [
                    {
                      attributes: [
                        "fullName",
                        "id",
                        "firstName",
                        "middleName",
                        "lastName",
                        "countryCode",
                        "mobile",
                        "email",
                      ],
                      model: db.user,
                      as: "user",
                    },
                    {
                      model: db.Equipment,
                      as: "equipment",
                      attributes: ["id", ["displayName", "name"]],
                    },
                    {
                      model: db.Option,
                      as: "crop",
                      attributes: ["id", "name"],
                    },
                    {
                      model: db.Geofence,
                      as: "geofence",
                      attributes: ["id", "geofenceName"],
                      include: [
                        {
                          model: db.user_farm,
                          attributes: ["farmName"],
                          as: "farms"
                        }
                      ]
                    },
                    {
                      model: db.user,
                      as: "farm",
                      attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                    },
                  ],
                },
              ],
            },
          ],
        };
        let surveyResponses = await db.surveysList.findOne({ ...query });
        let newSurveyQuestionsResponse = surveyResponses.surveyQuestions.map(
          (q) => {
            let response = _.groupBy(
              q.surveyQuestionsResponse,
              "surveyUserResponseEntityId"
            );
            let newQuestionOptions;
            if (q.questionOptions.length) {
              newQuestionOptions = q.questionOptions.map((nQ) => {
                if (nQ.nestedQuestions) {
                  let newResponse = _.groupBy(
                    nQ.nestedQuestions.surveyQuestionsResponse,
                    "surveyUserResponseEntityId"
                  );
                  return {
                    id: nQ.id,
                    questionId: nQ.questionId,
                    surveyId: nQ.surveyId,
                    text: nQ.text,
                    scores: nQ.scores,
                    isDisabled: nQ.isDisabled,
                    nestedQuestionId: nQ.nestedQuestionId,
                    createdAt: nQ.createdAt,
                    updatedAt: nQ.updatedAt,
                    nestedQuestions: {
                      question: nQ.nestedQuestions.question,
                      questionType: nQ.nestedQuestions.questionType,
                      isQuestionScore: nQ.nestedQuestions.isQuestionScore,
                      questionOptions: nQ.questionOptions,
                      scores: nQ.nestedQuestions.scores,
                      surveyQuestionsResponse: newResponse,
                    },
                  };
                } else {
                  return nQ;
                }
              });
            }
            let newQuestion = {
              question: q.question,
              questionType: q.questionType,
              isQuestionScore: q.isQuestionScore,
              questionOptions: newQuestionOptions,
              scores: q.scores,
              surveyQuestionsResponse: response,
            };
            return newQuestion;
          }
        );

        let newSurveyResponses = {
          title: surveyResponses.title,
          createdAt: surveyResponses.createdAt,
          responses: surveyResponses.dataValues.responses,
          surveyQuestions: newSurveyQuestionsResponse,
        };
        const _data = {
          title: "All Responses",
          subHeader: {
            surveyTitle: newSurveyResponses.title,
            dateCreated: moment(newSurveyResponses.createdAt).format(
              "DD/MM/YYYY"
            ),
            questions: newSurveyResponses.surveyQuestions.length,
            responses: newSurveyResponses.responses,
          },
          tableData: newSurveyResponses.surveyQuestions,
        };
        const pdfData = await pdfGeneratorSurvey(_data, req, "response");
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          let pdfFileName = `surveyResponse/survey_response_${new Date().getTime()}.pdf`;
          let pdfFileStream = fs.createReadStream(pdfData.path);
          let s3Res = await s3.uploadFileStreamToS3(pdfFileStream, pdfFileName);
          await db.surveyResponseDownloadHistory.update(
            {
              surveyId: id,
              fileName: pdfFileName,
              fileUrl: s3Res,
              jobId: job.id,
              status: "done",
              userId: userId,
            },
            { where: { jobId: job.id } }
          );
          done();
        }
      } else {
        const query = `
        SELECT
        surl.uuid,
        surl.surveyId,
        surl.surveyUserListId,
        surl.farmId,
        surl.submittedDate AS responseDate,
        sul.userId,
        CONCAT(u.firstName, '', u.lastName) AS user,
        u.id AS userId,
        uf.farmName,
        uf.farmerFirstName,
        uf.farmerMiddleName,
        uf.farmerLastName,
        sq.id as questionId,
        sq.question,
        sq.questionType,
        sq.isQuestionScore,
        sqr.text AS responseText,
        sqo.text AS questionOptionText,
        sqo.scores AS questionOptionScores,
        o.name AS cropName,
        g.geofenceName,
        g.id as geofenceId,
        e.displayName AS equipmentName,
        CONCAT(f.firstName, '', f.lastName) AS farmFarmer
        FROM
            survey_user_response_entiity surl
        JOIN
            survey_users_list sul ON sul.id = surl.surveyUserListId
        JOIN
            users u ON u.id = sul.userId
        LEFT JOIN
            user_farms uf ON uf.id = surl.farmId
        JOIN
            surveys_list sl ON sl.id = surl.surveyId
        LEFT JOIN
            survey_questions sq ON sq.surveyId = surl.surveyId AND sq.isDisabled = false
        LEFT JOIN
            survey_questions_response sqr ON sqr.surveyUserResponseEntityId = surl.uuid AND sqr.questionId = sq.id
        LEFT JOIN
            survey_question_options sqo ON sqr.questionId = sq.id AND sqr.optionId = sqo.id
        LEFT JOIN
            options o ON o.id = sqr.cropId
        LEFT JOIN
            geofences g ON g.id = sqr.geofenceId
        LEFT JOIN
            equipment e ON e.id = sqr.equipmentId
        LEFT JOIN
            users f ON f.id = sqr.farmId
        WHERE
            surl.surveyId = :surveyId
        `;

        const result = await db.sequelize.query(query, {
          replacements: { surveyId: id },
          type: Sequelize.QueryTypes.SELECT,
        });

        const formattedResults = result.reduce((accumulator, item) => {
          // Find an existing entry with the same UUID
          let uuidEntry = accumulator.find((entry) => entry.uuid === item.uuid);

          if (!uuidEntry) {
            // If UUID does not exist, create a new entry for this UUID
            uuidEntry = {
              uuid: item.uuid,
              farmName: item.farmName,
              farmer: `${item.farmerFirstName || ""} ${
                item.farmerMiddleName || ""
              } ${item.farmerLastName || ""}`,
              user: item.user,
              questionResponse: [],
            };
            accumulator.push(uuidEntry);
          }

          // Check if the question already exists under this UUID
          let questionEntry = uuidEntry.questionResponse.find(
            (qr) => qr.questionId === item.questionId
          );

          if (questionEntry) {
            switch (item.questionType) {
              case "radio":
                questionEntry.optionText += ", " + item.questionOptionText;
                break;
              case "checkbox":
                questionEntry.optionText += ", " + item.questionOptionText;
                break;
              case "dynamicGeoFence":
                questionEntry.geofenceName += ", " +  item.geofenceName ? item.geofenceName : `Geofence #${item.geofenceId}`;
                break;
              case "dynamicCrop":
                questionEntry.cropName += ", " + item.cropName;
                break;
              case "dynamicEquipment":
                questionEntry.equipmentName += ", " + item.equipmentName;
                break;
              case "dynamicFarmer":
                questionEntry.farmFarmer += ", " + item.farmFarmer;
                break;
            }
          } else {
            uuidEntry.questionResponse.push({
              questionId: item.questionId,
              question: item.question,
              questionType: item.questionType,
              isQuestionScore: item.isQuestionScore,
              responseText: item.responseText,
              optionText: item.questionOptionText,
              geofenceName: item.geofenceName,
              cropName: item.cropName,
              equipmentName: item.equipmentName,
              optionScores: item.questionOptionScores,
              farmFarmer: item.farmFarmer,
            });
          }
          return accumulator;
        }, []);

        let responseArray = [];

        formattedResults.map((item, index) => {
          let obj = {};
          obj["UUID"] = item.uuid;
          obj["Farm"] = item.farmName;
          obj["Farmer"] = item.farmer;
          obj["Survey By"] = item.user;
          item.questionResponse
            .sort((a, b) => a.questionId - b.questionId)
            .map((question, index) => {
              if (question.questionType === "radio") {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.optionText;
              } else if (question.questionType === "checkbox") {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.optionText;
              } else if (question.questionType === "dynamicFarmer") {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.farmFarmer;
              } else if (question.questionType === "dynamicGeoFence") {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.geofenceName;
              } else if (question.questionType === "dynamicCrop") {
                obj[`Q#${index + 1}: ${question.question}`] = question.cropName;
              } else if (question.questionType === "dynamicEquipment") {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.equipmentName;
              } else {
                obj[`Q#${index + 1}: ${question.question}`] =
                  question.responseText;
              }
            });

          responseArray.push(obj);
        });

        if (downloadType === "xls") {
          let filepath = await generateExcelReport("xlsx", responseArray);

          let xlsFileName = `surveyResponse/survey_response_${new Date().getTime()}.xlsx`;
          let xlsFileStream = fs.createReadStream(filepath);
          let s3Res = await s3.uploadFileStreamToS3(xlsFileStream, xlsFileName);
          await db.surveyResponseDownloadHistory.update(
            {
              surveyId: id,
              fileName: xlsFileName,
              fileUrl: s3Res,
              jobId: job.id,
              status: "done",
              userId: userId,
            },
            { where: { jobId: job.id } }
          );
          done();
        }
        if (downloadType === "csv") {
          let filepath = await generateExcelReport("csv", responseArray);

          let xlsFileName = `surveyResponse/survey_response_${new Date().getTime()}.csv`;
          let xlsFileStream = fs.createReadStream(filepath);
          let s3Res = await s3.uploadFileStreamToS3(xlsFileStream, xlsFileName);
          await db.surveyResponseDownloadHistory.update(
            {
              surveyId: id,
              fileName: xlsFileName,
              fileUrl: s3Res,
              jobId: job.id,
              status: "done",
              userId: userId,
            },
            { where: { jobId: job.id } }
          );
          done();
        }
      }
    }
  } catch (error) {
    job.progress("fail");
    await db.surveyResponseDownloadHistory.update(
      { status: "fail" },
      { where: { jobId: job.id } }
    );
    console.log(error, "csv upload job error");
    done();
  }
});

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

function getYearDifference(startDate, endDate) {
  return endDate.getFullYear() - startDate.getFullYear();
}

function addMonths(numOfMonths, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setMonth(date.getMonth() + numOfMonths);
  return returningDate;
}

function addWeeks(weeks, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + weeks * 7);
  return returningDate;
}

function addYears(years, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setFullYear(date.getFullYear() + years);
  return returningDate;
}

function adddays(days, date = new Date()) {
  const returningDate = new Date(date);
  returningDate.setDate(date.getDate() + days);
  return returningDate;
}

async function getAppUser(organization) {
  const users = await await db.user.findAll({
    where: { organization, active: 1 },
    attributes: ["id", "firstName","middleName" ,"lastName", "fullName", "email", "active"],
    include: [
      {
        model: db.Roles,
        as: "user_role_assoc",
        through: { model: db.UserRoles, attributes: [] },
        attributes: [],
        required: true,
        where: {
          id: {
            [Op.eq]: "end_user",
          },
        },
      },
    ],
  });
  return users;
}

async function getSurveys(id, userId) {
  let where = {
    id,
    isDeleted: false,
  };

  let query = {
    attributes: [
      "id",
      "isMultistep",
      "questionForEachStep",
      "isSelectedUsers",
      "linkedWithFarms",
    ],
    where,
    include: [
      {
        model: db.surveyUsersList,
        as: "surveySelectedUsers",
        attributes: ["id", "userId"],
      },
      {
        model: db.surveyQuestions,
        as: "surveyQuestions",
        required: false,
        where: { isDisabled: false, isNestedQuestion: false },
        order: [["id", "ASC"]],
        include: [
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            required: false,
            include: [
              {
                model: db.surveyQuestions,
                as: "nestedQuestions",
                required: false,
                where: { isDisabled: false },
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "questionOptions",
                    required: false,
                  },
                  {
                    model: db.surveyQuestionsResponse,
                    as: "surveyQuestionsResponse",
                    where: { userId },
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return await db.surveysList.findOne({ ...query });
}

/**
 * @swagger
 * /admin/surveys/list:
 *   get:
 *     summary: Get surveys list
 *     description: Get surveys list.
 *     tags: [Survey builder]
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "survey list retrieved",
 *                             "data": [
 *                               {
 *                                 "id": 11,
 *                                 "userId": 438,
 *                                 "title": "fgfgf",
 *                                 "description": "hjhjh",
 *                                 "isScheduled": true,
 *                                 "scheduledDate": "12345",
 *                                 "isMultistep": null,
 *                                 "questionForEachStep": 5,
 *                                 "surveyStatus": true,
 *                                 "isSelectedUsers": true,
 *                                 "linkedWithFarms": true,
 *                                 "isDeleted": false,
 *                                 "createdAt": "2022-10-27T11:32:56.000Z",
 *                                 "updatedAt": "2022-10-27T11:32:56.000Z",
 *                                 "CreatedBy": {
 *                                   "fullName": "Sandesh Koirala",
 *                                   "id": 438,
 *                                   "firstName": "Sandesh",
 *                                   "lastName": "Koirala",
 *                                   "countryCode": 977,
 *                                   "mobile": "9999999999",
 *                                   "email": "sandesh@dimitra.io"
 *                                 },
 *                                 "surveySelectedUsers": [
 *                                   {
 *                                     "id": 15,
 *                                     "userId": 246,
 *                                     "surveyId": 11,
 *                                     "users": {
 *                                       "fullName": "firstnasdasdame123123 B",
 *                                       "id": 246,
 *                                       "firstName": "firstnasdasdame123123",
 *                                       "lastName": "B",
 *                                       "countryCode": 977,
 *                                       "mobile": "",
 *                                       "email": "imsobna@gmail.com"
 *                                     }
 *                                   }
 *                                 ]
 *                               }
 *                             ]
 *                           }
 */

// get surveys list
router.get("/list", auth, async function (req, res) {
  try {
    let { organization } = req.user;
    let { searchPhrase, page, limit, orderField, order } = req.query;
    let where = {
      isDeleted: 0,
      organization,
    };
    if (searchPhrase) {
      where[Op.or] = {
        title: { [Op.like]: `%${searchPhrase}%` },
        description: { [Op.like]: `%${searchPhrase}%` },
      };
    }
    let query = {
      attributes: [
        "id",
        "title",
        "description",
        "surveyStatus",
        "status",
        "isScheduled",
        "scheduledDate",
        "scheduledEndDate",
        "parentId",
        "isMultistep",
        "questionForEachStep",
        "isSelectedUsers",
        "linkedWithFarms",
        "createdAt",
        [
          db.sequelize.literal(
            `(SELECT count(*) from survey_questions WHERE surveyId = surveysList.id and isNestedQuestion = 0 and isDisabled = 0)`
          ),
          "questions",
        ],
        [
          db.sequelize.literal(
            `(SELECT count(*) from survey_user_response_entiity WHERE surveyId = surveysList.id)`
          ),
          "responses",
        ],
      ],
      where,
      include: [
        {
          attributes: [
            "fullName",
            "id",
            "firstName",
            "middleName",
            "lastName",
            "countryCode",
            "mobile",
            "email",
          ],
          model: db.user,
          as: "CreatedBy",
        },
        {
          model: db.surveyUsersList,
          as: "surveySelectedUsers",
          attributes: ["id", "userId", "surveyId"],
          include: [
            {
              attributes: [
                "fullName",
                "id",
                "firstName",
                "middleName",
                "lastName",
                "countryCode",
                "mobile",
                "email",
              ],
              model: db.user,
              as: "users",
            },
          ],
        },
      ],
      paranoid: true,
    };

    const POSSIBLE_ORDER_FIELDS = [
      "title",
      "description",
      "responses",
      "questions",
      "status",
    ];
    const POSSIBLE_ORDERS = ["ASC", "DESC"];
    const formattedOrder = order ? order.toUpperCase() : null;
    if (
      POSSIBLE_ORDER_FIELDS.includes(orderField) &&
      POSSIBLE_ORDERS.includes(formattedOrder)
    ) {
      if (orderField === "responses" || orderField === "questions") {
        query.order = db.sequelize.literal(`${orderField} ${formattedOrder}`);
      } else {
        query.order = [[orderField, formattedOrder]];
      }
    } else {
      query.order = [["createdAt", "DESC"]];
    }

    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const getSurveysCount = await db.surveysList.count({ where });
    const getSurveys = await db.surveysList.findAll({ ...query });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { count: getSurveysCount, rows: getSurveys },
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/surveys/{id}:
 *   get:
 *     summary: Get surveys list
 *     description: Get surveys list.
 *     tags: [Survey builder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "survey list retrieved",
 *                             "data": [
 *                               {
 *                                 "id": 11,
 *                                 "userId": 438,
 *                                 "title": "fgfgf",
 *                                 "description": "hjhjh",
 *                                 "isScheduled": true,
 *                                 "scheduledDate": "12345",
 *                                 "isMultistep": null,
 *                                 "questionForEachStep": 5,
 *                                 "surveyStatus": true,
 *                                 "isSelectedUsers": true,
 *                                 "linkedWithFarms": true,
 *                                 "isDeleted": false,
 *                                 "createdAt": "2022-10-27T11:32:56.000Z",
 *                                 "updatedAt": "2022-10-27T11:32:56.000Z",
 *                                 "CreatedBy": {
 *                                   "fullName": "Sandesh Koirala",
 *                                   "id": 438,
 *                                   "firstName": "Sandesh",
 *                                   "lastName": "Koirala",
 *                                   "countryCode": 977,
 *                                   "mobile": "9999999999",
 *                                   "email": "sandesh@dimitra.io"
 *                                 },
 *                                 "surveySelectedUsers": [
 *                                   {
 *                                     "id": 15,
 *                                     "userId": 246,
 *                                     "surveyId": 11,
 *                                     "users": {
 *                                       "fullName": "firstnasdasdame123123 B",
 *                                       "id": 246,
 *                                       "firstName": "firstnasdasdame123123",
 *                                       "lastName": "B",
 *                                       "countryCode": 977,
 *                                       "mobile": "",
 *                                       "email": "imsobna@gmail.com"
 *                                     }
 *                                   }
 *                                 ]
 *                               }
 *                             ]
 *                           }
 */

// get single survey
router.get("/:id", auth, async function (req, res) {
  try {
    const userId = req.user.id;
    let { id } = req.params;
    let where = {
      id,
      organization: req.user.organization,
      isDeleted: false,
    };

    let query = {
      attributes: [
        "id",
        "title",
        "description",
        "surveyStatus",
        "isScheduled",
        "scheduledDate",
        "scheduledEndDate",
        "isMultistep",
        "questionForEachStep",
        "isSelectedUsers",
        "linkedWithFarms",
        "parentId",
        "status",
        "createdAt",
        [
          db.sequelize.literal(
            `(SELECT count(*) from survey_questions WHERE surveyId = surveysList.id and isDisabled = 0)`
          ),
          "questions",
        ],
        [
          db.sequelize.literal(
            `(SELECT count(*) from survey_questions_response WHERE surveyId = surveysList.id)`
          ),
          "responses",
        ],
      ],
      where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: [
            "fullName",
            "id",
            "firstName",
            "middleName",
            "lastName",
            "countryCode",
            "mobile",
            "email",
          ],
          model: db.user,
          as: "CreatedBy",
        },
        {
          model: db.surveyUsersList,
          as: "surveySelectedUsers",
          attributes: ["id", "userId", "surveyId"],
          include: [
            {
              attributes: [
                "fullName",
                "id",
                "firstName",
                "middleName",
                "lastName",
                "countryCode",
                "mobile",
                "email",
              ],
              model: db.user,
              as: "users",
            },
          ],
        },
      ],
    };

    const getSurveys = await db.surveysList.findOne({ ...query });
    if(!getSurveys) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.DOESNT_EXISTS,
        })
      );
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: getSurveys,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/surveys/users:
 *   get:
 *     summary: Get surveys users list
 *     description: Get surveys users list.
 *     tags: [Survey builder]
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
 *                             {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "users retrieved",
 *                               "data": [
 *                                 {
 *                                   "fullName": "Akash Bansal",
 *                                   "id": 123549,
 *                                   "firstName": "Akash",
 *                                   "lastName": "Bansal",
 *                                   "email": "akashbansal.mansainfotech@gmail.com",
 *                                   "user_role": [
 *                                     {
 *                                       "id": "end_user",
 *                                       "name": "App User",
 *                                       "role_type": "app_user",
 *                                       "description": "Mobile App users",
 *                                       "organization": 1,
 *                                       "createdAt": "2022-03-14T01:16:34.000Z",
 *                                       "updatedAt": "2022-05-10T05:44:58.000Z",
 *                                       "UserRoles": {
 *                                         "id": "123549_end_user",
 *                                         "role_id": "end_user",
 *                                         "user_id": 123549,
 *                                         "createdAt": "2022-09-14T06:50:30.000Z",
 *                                         "updatedAt": "2022-09-14T06:50:30.000Z"
 *                                       }
 *                                     }
 *                                   ],
 *                                   "user_membership": [
 *                                     {
 *                                       "id": 9,
 *                                       "membership_type": "Basic Global",
 *                                       "membership_duration": 10,
 *                                       "membership_duration_unit": "month(s)",
 *                                       "membershipMap": {
 *                                         "id": 345583,
 *                                         "membership_id": 9,
 *                                         "user_id": 123549,
 *                                         "createdAt": "2022-09-14T06:50:29.000Z",
 *                                         "updatedAt": "2022-09-14T06:50:29.000Z"
 *                                       },
 *                                       "UserMembershipMap": {
 *                                         "id": 345583,
 *                                         "membership_id": 9,
 *                                         "user_id": 123549,
 *                                         "createdAt": "2022-09-14T06:50:29.000Z",
 *                                         "updatedAt": "2022-09-14T06:50:29.000Z",
 *                                         "membershipExpiryDate": "2023-07-14T06:50:29.000Z"
 *                                       }
 *                                     }
 *                                   ]
 *                                 }
 *                               ]
 *                             }
 */

// get users
router.get(
  "/users/list",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let { membershipRole } = req.query;
      const { organization } = req.user;

      let getAppUsers = await getUsers(req.query, organization);

      getAppUsers.rows = await Promise.all(
        getAppUsers?.rows.map(async (item) => {
          let userMemberships = await getUserMemberships(item.id);
          let userPermissions = await getUserPermissionsByMemberships(
            userMemberships
          );

          const plainItems = item.toJSON();
          return {
            ...plainItems,
            userRoles: userPermissions.userRoles,
          };
        })
      );

      if (membershipRole) {
        getAppUsers.rows = getAppUsers.rows.filter((item) =>
          item.userRoles.some((role) => role.id === membershipRole)
        );
      }
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: getAppUsers
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);
/**
 * @swagger
 * /admin/surveys/auto-condition:
 *   post:
 *     summary: Create surveys user auto condition
 *     description: Create surveys user auto condition.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                        "user_id": 123,
 *                        "membershipTypeId": 51,
 *                        "membershipValidity": "10 days",
 *                        "remainingDays": 23,
 *                        "condtionStatus": true,
 *                        "accountProgress": 25
 *                       }
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
 *                             {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "Auto Condtion added",
 *                               "data":
 *                                 {
 *                                   "id": 123,
 *                                   "user_id": 123,
 *                                   "membershipTypeId": 51,
 *                                   "membershipValidity": "10 days",
 *                                   "remainingDays": 23,
 *                                   "condtionStatus": true,
 *                                    "accountProgress": 25
 *                                 }
 *                             }
 */

// create auto condition
router.post(
  "/auto-condition",
  auth,
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
      } = req.body;
      const set = {
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
        userId,
      };
      const createAutoCondition = await db.surveyAutoCondition.create(set, {
        transaction,
      });
      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: createAutoCondition,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);
/**
 * @swagger
 * /admin/surveys/auto-condition:
 *   post:
 *     summary: Create surveys user auto condition
 *     description: Create surveys user auto condition.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                        "user_id": 123,
 *                        "membershipTypeId": 51,
 *                        "membershipValidity": "10 days",
 *                        "remainingDays": 23,
 *                        "condtionStatus": true,
 *                        "accountProgress": 25
 *                       }
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
 *                             {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "Auto Condtion added",
 *                               "data":
 *                                 {
 *                                   "id": 123,
 *                                   "user_id": 123,
 *                                   "membershipTypeId": 51,
 *                                   "membershipValidity": "10 days",
 *                                   "remainingDays": 23,
 *                                   "condtionStatus": true,
 *                                    "accountProgress": 25
 *                                 }
 *                             }
 */

// create auto condition
router.post(
  "/auto-condition",
  auth,
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
      } = req.body;
      const set = {
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
        userId,
      };
      const createAutoCondition = await db.surveyAutoCondition.create(set, {
        transaction,
      });
      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: createAutoCondition,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);
/**
 * @swagger
 * /admin/surveys/auto-condition:
 *   put:
 *     summary: Create surveys user auto condition
 *     description: Create surveys user auto condition.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                        "ïd": 1,
 *                        "user_id": 123,
 *                        "membershipTypeId": 51,
 *                        "membershipValidity": "10 days",
 *                        "remainingDays": 23,
 *                        "condtionStatus": true,
 *                        "accountProgress": 25
 *                       }
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
 *                             {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "Auto Condtion added",
 *                               "data":
 *                                 {
 *                                   "id": 1,
 *                                   "user_id": 123,
 *                                   "membershipTypeId": 51,
 *                                   "membershipValidity": "10 days",
 *                                   "remainingDays": 23,
 *                                   "condtionStatus": true,
 *                                    "accountProgress": 25
 *                                 }
 *                             }
 */

// get auto condition
router.put(
  "/auto-condition",
  auth,
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        id,
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
      } = req.body;
      const set = {
        membershipTypeId,
        membershipValidity,
        remainingDays,
        condtionStatus,
        accountProgress,
        userId,
      };
      await db.surveyAutoCondition.update(set, { where: { id: id } });
      const autoCondition = await db.surveyAutoCondition.findOne({
        where: { id: id },
      });

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: autoCondition,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);
/**
 * @swagger
 * /admin/surveys/auto-condition/list:
 *   get:
 *     summary: Get surveys auto condition
 *     description: Get surveys auto condition.
 *     tags: [Survey builder]
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
 *                             {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "condtion created retrieved",
 *                               "data":
 *                                 {
 *                                   "id": 123,
 *                                   "user_id": 123,
 *                                   "membershipTypeId": 51,
 *                                   "membershipValidity": "10 days",
 *                                   "remainingDays": 23,
 *                                   "condtionStatus": true,
 *                                   "accountProgress": 25
 *                                 }
 *                             }
 */

// get auto condition
router.get(
  "/auto-condition/list",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const userId = req.user.id;
      const condition = await db.surveyAutoCondition.findOne({
        where: { userId },
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: condition,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys:
 *   post:
 *     summary: Create survey.
 *     description: Create survey.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                         "title": "New title",
 *                         "description": "New title",
 *                         "scheduledDate": "12345",
 *                         "isMultistep": true,
 *                         "questionForEachStep": 5,
 *                         "surveyStatus": true,
 *                         "users": [
 *                             246,
 *                             118
 *                         ],
 *                         "linkedWithFarms": false
 *                       }
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "Survey title created",
 *                             "data": {
 *                                 "id": 12,
 *                                 "title": "New title",
 *                                 "description": "New title",
 *                                 "isScheduled": true,
 *                                 "scheduledDate": "12345",
 *                                 "questionForEachStep": 5,
 *                                 "surveyStatus": true,
 *                                 "userId": 438,
 *                                 "isSelectedUsers": true,
 *                                 "linkedWithFarms": true,
 *                                 "updatedAt": "2022-10-28T09:37:01.429Z",
 *                                 "createdAt": "2022-10-28T09:37:01.429Z"
 *                             }
 *                           }
 */

// create survey Title
router.post(
  "/",
  auth,
  createSurveyTitle(),
  validationErrorHandler,
  async function (req, res) {
    const { organization } = req.user;
    const transaction = await db.sequelize.transaction();
    try {
      let userId = req.user.id,
        surveyUsersObj = [];
      let {
        title,
        description,
        scheduledDate,
        scheduledEndDate,
        isSelectedUsers,
        isScheduled,
        isMultistep,
        questionForEachStep,
        surveyStatus,
        users = [],
        linkedWithFarms,
        parentId,
        isfFilteredUserSelected,
        unselectedUser,
        filterParams,
      } = req.body;
      const set = {
        title,
        description,
        scheduledDate,
        scheduledEndDate,
        isMultistep,
        questionForEachStep,
        surveyStatus,
        linkedWithFarms,
        userId,
        isSelectedUsers,
        isScheduled,
        organization,
        parentId,
      };

      let lstStatus = false;
      var currentDate = moment().format("YYYY-MM-DD");
      if (scheduledDate && moment(scheduledDate).isSame(currentDate, "day")) {
        lstStatus = true;
      }

      const createSurveyTitle = await db.surveysList.create(set, {
        transaction,
      });
      if (createSurveyTitle) {
        if (isfFilteredUserSelected) {
          let getAppUsers = await getUsers(filterParams, organization);
          if (unselectedUser.length > 0) {
            getAppUsers = getAppUsers.rows.filter(
              (u) => !unselectedUser.includes(u.id)
            );
          }
          getAppUsers.forEach((u) => {
            surveyUsersObj.push({
              userId: u.id,
              surveyId: createSurveyTitle.id,
              status: false,
              surveyListStatus: lstStatus,
            });
          });
          await db.surveyUsersList.bulkCreate(surveyUsersObj, { transaction });
        } else if (users.length > 0) {
          users.forEach((id) => {
            surveyUsersObj.push({
              userId: id,
              surveyId: createSurveyTitle.id,
              status: false,
              surveyListStatus: lstStatus,
            });
          });
          await db.surveyUsersList.bulkCreate(surveyUsersObj, { transaction });
        } else if (!isSelectedUsers) {
          let userObj = [];
          const getUserList = await getAppUser(organization);
          getUserList.forEach((item) => {
            userObj.push({
              userId: item.id,
              surveyId: createSurveyTitle.id,
              status: false,
              surveyListStatus: lstStatus,
            });
          });
          await db.surveyUsersList.bulkCreate(userObj, { transaction });
        }
      }

      await transaction.commit();
      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: createSurveyTitle,
        })
      );
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/{id}:
 *   delete:
 *     summary: delete survey
 *     description: delete survey.
 *     tags: [Survey builder]
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
 *                          {"success": true,"code": 200,"message": "Survey title deleted","data": {}}
 */

// delete survey
router.delete("/:id", auth, validationErrorHandler, async function (req, res) {
  try {
    let userId = req.user.id;
    let { id } = req.params;
    const set = {
      isDeleted: true,
    };
    await db.surveysList.destroy({ where: { id }, force: false });

    const userSurveyLists = await db.surveyUsersList.findAll({
      where: { surveyId: id },
    });
    for (const usersSurvey of userSurveyLists) {
      await db.surveyUsersList.update(
        { ...set },
        { where: { id: usersSurvey.id } }
      );
    }
    return res.json(
      successRespSync({
        msg: success.DELETED,
        data: {},
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/surveys/{id}:
 *   put:
 *     summary: Update survey.
 *     description: Update survey.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                         "title": "New title",
 *                         "description": "New title",
 *                         "scheduledDate": "12345",
 *                         "isMultistep": true,
 *                         "questionForEachStep": 5,
 *                         "surveyStatus": true,
 *                         "users": [
 *                             246,
 *                             118
 *                         ],
 *                         "linkedWithFarms": false
 *                       }
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "Survey title updated",
 *                             "data": {
 *                               "id": 9,
 *                               "userId": 438,
 *                               "title": "abcd",
 *                               "description": "abcd",
 *                               "isScheduled": true,
 *                               "scheduledDate": "2022-04-04",
 *                               "isMultistep": null,
 *                               "questionForEachStep": 15,
 *                               "surveyStatus": true,
 *                               "isSelectedUsers": true,
 *                               "linkedWithFarms": true,
 *                               "isDeleted": false,
 *                               "createdAt": "2022-10-19T12:28:29.000Z",
 *                               "updatedAt": "2022-10-28T09:43:07.000Z",
 *                               "CreatedBy": {
 *                                 "fullName": "Sandesh Koirala",
 *                                 "id": 438,
 *                                 "firstName": "Sandesh",
 *                                 "lastName": "Koirala",
 *                                 "countryCode": 977,
 *                                 "mobile": "9999999999",
 *                                 "email": "sandesh@dimitra.io"
 *                               },
 *                               "surveySelectedUsers": [
 *                                 {
 *                                   "id": 5,
 *                                   "userId": 246,
 *                                   "surveyId": 9,
 *                                   "users": {
 *                                     "fullName": "firstnasdasdame123123 B",
 *                                     "id": 246,
 *                                     "firstName": "firstnasdasdame123123",
 *                                     "lastName": "B",
 *                                     "countryCode": 977,
 *                                     "mobile": "",
 *                                     "email": "imsobna@gmail.com"
 *                                   }
 *                                 }
 *                               ]
 *                             }
 *                           }
 */

// update survey Title
router.put("/:id", auth, validationErrorHandler, async function (req, res) {
  try {
    const { id } = req.params;
    const { organization } = req.user;
    let userId = req.user.id,
      surveyUsersObj = [];
    let {
      title,
      description,
      scheduledDate,
      scheduledEndDate,
      isMultistep,
      questionForEachStep,
      surveyStatus,
      users = [],
      isScheduled,
      isSelectedUsers,
      linkedWithFarms,
      parentId,
    } = req.body;
    const set = {
      title,
      description,
      isScheduled,
      scheduledDate,
      isMultistep,
      questionForEachStep,
      surveyStatus,
      linkedWithFarms,
      userId,
      isScheduled,
      isSelectedUsers,
      organization,
      parentId,
      scheduledEndDate,
    };
    const updateSurveyTitle = await db.surveysList.update(set, {
      where: { id },
    });
    const surveyUpdated = await db.surveysList.findOne({ where: { id } });
    let surveyUsers = await db.surveyUsersList.findAll({
      where: { surveyId: id },
    });
    surveyUsers = surveyUsers.map((item) => item.userId);
    if (users.length > 0) {
      users.forEach((userId) => {
        if (surveyUsers.includes(userId)) return null;
        surveyUsersObj.push({
          userId,
          surveyId: id,
          status: false,
        });
      });
      await db.surveyUsersList.bulkCreate(surveyUsersObj);
    } else if (!isSelectedUsers) {
      if (surveyUpdated.status === "Inactive") {
        await db.surveyUsersList.destroy(
          { where: { surveyId: id } }
        );
      }
      let userObj = [];
      const getUserList = await getAppUser(organization);
      getUserList.forEach((item) => {
        userObj.push({
          userId: item.id,
          surveyId: id,
          status: false,
          surveyListStatus: false,
        });
      });
      await db.surveyUsersList.bulkCreate(userObj);
    }
    if (users && users.length > 0) {
      const userToBeRemove = surveyUsers.filter((n) => !users.includes(n));
      await db.surveyUsersList.destroy(
        { where: { surveyId: id, userId: userToBeRemove } }
      );
    }


    let getUpdatedData;
    if (updateSurveyTitle) {
      getUpdatedData = await db.surveysList.findOne({
        where: {
          id,
        },
        include: [
          {
            attributes: [
              "fullName",
              "id",
              "firstName",
              "middleName",
              "lastName",
              "countryCode",
              "mobile",
              "email",
            ],
            model: db.user,
            as: "CreatedBy",
          },
          {
            model: db.surveyUsersList,
            as: "surveySelectedUsers",
            attributes: ["id", "userId", "surveyId"],
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "users",
              },
            ],
          },
        ],
      });
    }
    // check if survey starts today
    const today = moment().format("YYYY-MM-DD");
    if (
      surveyStatus &&
      isScheduled &&
      scheduledDate === today &&
      getUpdatedData.status === "Inactive"
    ) {
      const survey = await db.surveysList.findOne({
        where: {
          id,
          isScheduled: true,
          scheduledDate: today,
          surveyStatus: true,
          status: "Inactive",
        },
      });
      await publishSurvey(survey);
    }

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: getUpdatedData,
      })
    );
  } catch (error) {

    return serverError(res, error);
  }
});

/**
 * @swagger
 * /admin/surveys/user/{id}:
 *   delete:
 *     summary: delete survey selected user
 *     description: delete survey selected user
 *     tags: [Survey builder]
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
 *                          {"success": true,"code": 200,"message": "user deleted","data": {}}
 */

// delete survey users
router.delete(
  "/user/:id",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let userId = req.user.id;
      let { id } = req.params;
      await db.surveyUsersList.destroy({ where: { id } });
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: {},
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question:
 *   post:
 *     summary: post survey question and options.
 *     description: post survey question and options.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                         "surveyId": 8,
 *                         "data":
 *                             {
 *                                 "answerTempId": null,
 *                                 "question": "what is the question",
 *                                 "mandatory": true,
 *                                 "questionType": "radio",
 *                                 "isQuestionScore": true,
 *                                 "isDisabled": true,
 *                                 "answer": [
 *                                     {
 *                                         "answerTempId": null,
 *                                         "text": "ssas",
 *                                         "scores": 34,
 *                                         "isDisabled": true
 *                                     },
 *                                     {
 *                                         "text": "ssas",
 *                                         "scores": 34,
 *                                         "isDisabled": true,
 *                                         "answerTempId": "hjhj"
 *                                     }
 *                                 ]
 *                             }
 *                     }
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
 *                          { "success": true, "code": 200, "message": "Survey questions added", "data": {} }
 */

// add survey question
router.post(
  "/question",
  auth,
  surveyQuestionValidator(),
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      let userId = req.user.id;
      let { surveyId, data } = req.body;
      if (!surveyId) throw new Error("Survey ID is required");
      if (!data) throw new Error("data is required");
      const getSurveyDetail = await db.surveysList.findOne({
        where: { id: surveyId },
      });
      if (!getSurveyDetail) throw new Error("Survey not found");
      const surveyQuestionsList = {
        surveyId,
        question: data.question,
        mandatory: data.mandatory,
        isQuestionScore: data.isQuestionScore,
        questionType: data.questionType,
        isDisabled: false,
        answerTempId: null,
        resource: data.resource,
        isMultiSelection:
          data.questionType === "checkbox" ? true : data.isMultiSelection,
        scores:
          data.questionType !== "radio" && data.questionType !== "checkbox"
            ? data.scores
            : null,
      };
      const createSurveyQuestion = await db.surveyQuestions.create(
        surveyQuestionsList,
        {}
      );
      for (const answerObj of data?.questionOptions || []) {
        let answerObjList = {
          questionId: createSurveyQuestion.id,
          surveyId,
          isDisabled: false,
          text: answerObj.text,
          scores: answerObj.scores,
          answerTempId: answerObj.answerTempId,
        };

        if (answerObj.nestedQuestions) {
          const nestedQuestionList = {
            surveyId,
            question: answerObj.nestedQuestions.question,
            mandatory: false,
            isQuestionScore: createSurveyQuestion.isQuestionScore,
            scores: answerObj.nestedQuestions.scores,
            questionType: answerObj.nestedQuestions.questionType,
            isDisabled: false,
            answerTempId: null,
            isNestedQuestion: true,
            resource: answerObj.nestedQuestions.resource,
            isMultiSelection:
              answerObj.nestedQuestions.questionType === "checkbox"
                ? true
                : answerObj.nestedQuestions.isMultiSelection,
          };

          const nestedQuestion = await db.surveyQuestions.create(
            nestedQuestionList,
            {}
          );
          answerObjList.nestedQuestionId = nestedQuestion.id;
          let nestedAnswerObjList = [];
          for (const nestedAnswerObj of answerObj?.nestedQuestions
            ?.questionOptions || []) {
            nestedAnswerObjList.push({
              questionId: nestedQuestion.id,
              surveyId,
              isDisabled: false,
              text: nestedAnswerObj.text,
              scores: nestedAnswerObj.scores,
              answerTempId: nestedAnswerObj.answerTempId,
            });
          }
          await db.surveyQuestionOptions.bulkCreate(nestedAnswerObjList, {});
        }

        console.log(answerObj);
        await db.surveyQuestionOptions.create(answerObjList, {});
      }
      await transaction.commit();
      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: {
            question: createSurveyQuestion,
          },
        })
      );
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/{questionId}:
 *   delete:
 *     summary: delete survey question
 *     description: delete survey question.
 *     tags: [Survey builder]
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
 *                          {"success": true,"code": 200,"message": "Survey question deleted","data": {}}
 */

// delete survey question
router.delete(
  "/question/:questionId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let { questionId: id } = req.params;
      let userId = req.user.id;
      // check if this survey have other multiple question
      const questionInfo = await db.surveyQuestions.findOne({ where: { id } });

      const getSurveyDetail = await db.surveysList.findOne({
        where: { id: questionInfo.surveyId },
        include: [
          {
            model: db.surveyQuestions,
            as: "surveyQuestions",
            where: {
              isDisabled: {
                [db.Sequelize.Op.not]: true,
              },
            },
          },
        ],
      });
      if (
        getSurveyDetail.surveyStatus &&
        getSurveyDetail.surveyQuestions.length === 1
      ) {
        return serverError(res, {
          message: "At least one question is required for published survey",
        });
      }

      let set = { isDisabled: true };
      const deleteSurveyQuestions = await db.surveyQuestions.update(
        { ...set },
        { where: { id } }
      );
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: {},
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/{questionId}:
 *   put:
 *     summary: update survey question
 *     description: update survey question.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                 {
 *                   "question": "new question",
 *                   "type": "qwerty",
 *                   "mandatory": false,
 *                   "options": [
 *                       {
 *                           "id": 1,
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": null
 *                       },
 *                       {
 *                           "id": 2,
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": "hjhj"
 *                       },
 *                       {
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": ""
 *                       },
 *                       {
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": ""
 *                       }
 *                   ]
 *               }
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
 *                          {"success": true,"code": 200,"message": "Survey question deleted","data": {}}
 */

// update survey question
router.put(
  "/question/:questionId",
  auth,
  surveyQuestionValidator(),
  validationErrorHandler,
  async function (req, res) {
    try {
      let userId = req.user.id;
      let { questionId: id } = req.params;
      let { surveyId, data } = req.body;
      const set = {
        question: data.question,
        questionType: data.questionType,
        mandatory: data.mandatory,
        answerTempId: data.answerTempId,
        isQuestionScore: data.isQuestionScore,
        resource: data.resource,
        isMultiSelection: data.isMultiSelection,
        scores:
          data.questionType !== "radio" && data.questionType !== "checkbox"
            ? data.scores
            : null,
      };
      await db.surveyQuestions.update({ ...set }, { where: { id } });
      const newOptions = data?.questionOptions?.filter((obj) => {
        if (!obj.hasOwnProperty("id")) {
          obj.questionId = id;
          obj.surveyId = surveyId;
          return obj;
        }
      });
      data?.questionOptions
        ?.filter((obj) => obj.id)
        .forEach(async (item) => {
          await db.surveyQuestionOptions.update(
            { ...item },
            { where: { id: item.id } }
          );
        });
      if (newOptions) {
        await db.surveyQuestionOptions.bulkCreate(newOptions);
      }
      data?.questionOptions?.forEach(async (answerObj) => {
        if (answerObj.nestedQuestions) {
          if (answerObj.nestedQuestionId) {
            const updatedQuestion = {
              question: answerObj.nestedQuestions.question,
              questionType: answerObj.nestedQuestions.questionType,
              mandatory: false,
              isQuestionScore: answerObj.nestedQuestions.isQuestionScore,
              surveyId,
              answerTempId: null,
              resource: answerObj.nestedQuestions.resource,
              isMultiSelection: answerObj.nestedQuestions.isMultiSelection,
              scores: answerObj.nestedQuestions.scores,
            };

            await db.surveyQuestions.update(
              { ...updatedQuestion },
              { where: { id: answerObj.nestedQuestionId } }
            );

            answerObj.nestedQuestions.questionOptions
              .filter((obj) => obj.id)
              .forEach(async (nestedAnswerObj) => {
                await db.surveyQuestionOptions.update(
                  { ...nestedAnswerObj },
                  { where: { id: nestedAnswerObj.id } }
                );
              });

            const newNestedOptions =
              answerObj.nestedQuestions.questionOptions.filter((obj) => {
                if (!obj.hasOwnProperty("id")) {
                  obj.questionId = answerObj.nestedQuestionId;
                  obj.surveyId = surveyId;
                  return obj;
                }
              });

            if (newNestedOptions) {
              await db.surveyQuestionOptions.bulkCreate(newNestedOptions);
            }
          } else {
            const nestedQuestionList = {
              surveyId,
              question: answerObj.nestedQuestions.question,
              mandatory: false,
              isQuestionScore: answerObj.nestedQuestions.isQuestionScore,
              questionType: answerObj.nestedQuestions.questionType,
              isDisabled: false,
              answerTempId: answerObj.nestedQuestions.answerTempId,
              resource: answerObj.nestedQuestions.resource,
              isMultiSelection: answerObj.nestedQuestions.isMultiSelection,
              isNestedQuestion: true,
              scores: answerObj.nestedQuestions.scores,
            };

            const nestedQuestion = await db.surveyQuestions.create(
              nestedQuestionList,
              {}
            );
            let nestedAnswerObjList = [];
            answerObj.nestedQuestions?.questionOptions?.forEach(
              async (nestedAnswerObj) => {
                nestedAnswerObjList.push({
                  questionId: nestedQuestion.id,
                  surveyId,
                  isDisabled: false,
                  text: nestedAnswerObj.text,
                  scores: nestedAnswerObj.scores,
                  answerTempId: nestedAnswerObj.answerTempId,
                });
              }
            );
            await db.surveyQuestionOptions.bulkCreate(nestedAnswerObjList, {});
            await db.surveyQuestionOptions.update(
              { nestedQuestionId: nestedQuestion.id },
              { where: { id: answerObj.id } }
            );
          }
        }
      });
      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: {},
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/option/{optionId}:
 *   delete:
 *     summary: delete survey question option
 *     description: delete survey question option.
 *     tags: [Survey builder]
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
 *                          {"success": true,"code": 200,"message": "Deleted successfully","data": {}}
 */

// delete survey question
router.delete(
  "/question/option/:optionId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let userId = req.user.id;
      let { optionId: id } = req.params;
      const deleteSurveyQuestionOptions =
        await db.surveyQuestionOptions.destroy({ where: { id } });
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: {},
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/response/{surveyId}:
 *     get:
 *       summary: Get survey responses list.
 *       description: Get survey responses list.
 *       tags: [Survey builder]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *               example:
 *                 { "surveyId": 8 }
 *       responses:
 *           '200':
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: string
 *                     code:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     data:
 *                       type: object
 *                   example:
 *                             {
 *                                 "success": true,
 *                                 "code": 200,
 *                                 "message": "Fetched successfully.",
 *                                 "data": {
 *                                     "responsesCount": 3,
 *                                     "rows": [
 *                                         {
 *                                             "questionAttemptedCount": 2,
 *                                             "responseDate": "2022-10-27T04:50:22.000Z",
 *                                             "survey": {
 *                                                 "id": 8,
 *                                                 "userId": 123199,
 *                                                 "title": "fgfgf",
 *                                                 "description": "hjhjh",
 *                                                 "isScheduled": true,
 *                                                 "scheduledDate": "12345",
 *                                                 "isMultistep": null,
 *                                                 "questionForEachStep": 5,
 *                                                 "surveyStatus": true,
 *                                                 "isSelectedUsers": true,
 *                                                 "linkedWithFarms": true,
 *                                                 "isDeleted": false,
 *                                                 "createdAt": "2022-10-19T12:27:54.000Z",
 *                                                 "updatedAt": "2022-10-19T12:27:54.000Z"
 *                                             },
 *                                             "user": {
 *                                                 "fullName": "Rohit Chanpak lal gada",
 *                                                 "id": 12,
 *                                                 "firstName": "Rohit",
 *                                                 "lastName": "Chanpak lal gada",
 *                                                 "countryCode": 91,
 *                                                 "mobile": "70178116641",
 *                                                 "email": null
 *                                             },
 *                                             "farm": {
 *                                                 "createdAt": "10/05/2021",
 *                                                 "id": 1,
 *                                                 "userId": 17,
 *                                                 "address": "Nainital, uttarakhand",
 *                                                 "zipCode": "",
 *                                                 "farmName": "corbett farm",
 *                                             }
 *                                         },
 *                                         {
 *                                             "questionAttemptedCount": 1,
 *                                             "responseDate": "2022-10-27T04:50:22.000Z",
 *                                             "survey": {
 *                                                 "id": 8,
 *                                                 "userId": 123199,
 *                                                 "title": "fgfgf",
 *                                                 "description": "hjhjh",
 *                                                 "isScheduled": true,
 *                                                 "scheduledDate": "12345",
 *                                                 "isMultistep": null,
 *                                                 "questionForEachStep": 5,
 *                                                 "surveyStatus": true,
 *                                                 "isSelectedUsers": true,
 *                                                 "linkedWithFarms": true,
 *                                                 "isDeleted": false,
 *                                                 "createdAt": "2022-10-19T12:27:54.000Z",
 *                                                 "updatedAt": "2022-10-19T12:27:54.000Z"
 *                                             },
 *                                             "user": {
 *                                                 "fullName": "Rohit Chanpak lal gada",
 *                                                 "id": 12,
 *                                                 "firstName": "Rohit",
 *                                                 "lastName": "Chanpak lal gada",
 *                                                 "countryCode": 91,
 *                                                 "mobile": "70178116641",
 *                                                 "email": null
 *                                             },
 *                                             "farm": {
 *                                                 "createdAt": "10/05/2021",
 *                                                 "id": 1,
 *                                                 "userId": 17,
 *                                                 "address": "Nainital, uttarakhand",
 *                                                 "zipCode": "",
 *                                                 "farmName": "corbett farm",
 *                                             }
 *                                         }
 *                                     ]
 *                                 }
 *                             }
 */

// get survey responses list
router.get(
  "/response/:surveyId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let userId = req.user.id;
      const { surveyId } = req.params;
      if (!surveyId) throw new Error("Survey ID is required");

      const surveyList = await db.surveysList.findOne({
        where: {
          id: surveyId,
          organization: req.user.organization,
        },
        attributes: ['id'],
      });
      if(!surveyList) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.DOESNT_EXISTS,
          })
        );
      }

      let { searchPhrase, page, limit, order, orderField } = req.query;
      let userWhere = {};
      if (searchPhrase) {
        userWhere[Op.or] = {
          firstName: { [Op.like]: `%${searchPhrase}%` },
          lastName: { [Op.like]: `%${searchPhrase}%` },
        };
      }
      let query = {
        where: { surveyId },
        attributes: [
          "id",
          "surveyId",
          "surveyUserListId",
          "farmId",
          "uuid",
          ["submittedDate", "responseDate"],
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions_response WHERE survey_questions_response.surveyUserResponseEntityId = surveyUserResponseEntityList.uuid and survey_questions_response.deletedAt IS NULL)`
            ),
            "questionAttemptedCount",
          ],
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions WHERE survey_questions.surveyId = surveyUserResponseEntityList.surveyId)`
            ),
            "totalQuestion",
          ],
        ],
      };
      let getSurveyResponses = await db.surveyUserResponseEntityList.findAll({
        ...query,
      });
      if (orderField) {
        switch (orderField) {
          case "userName":
            query.order = [["surveyEntity", "users", "id", order]];
            break;

          case "farmName":
            query.order = [["farms", "farmName", order]];
            break;

          case "farmerName":
            query.order = [
              // [db.sequelize.fn('SUBSTR', db.sequelize.col('farms.farmerFirstName'), 1), order]
              ["farms", "farmerFirstName", order],
            ];
            break;

          case "responseDate":
            query.order = [["responseDate", order]];
            break;

          case "question":
            query.order = [["questionAttemptedCount", order]];
            break;

          case "scores":
            //           query.order = [
            //     ['survey', 'scoreSum', order]
            //  ]
            break;
        }
      }
      if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        query.offset = (page - 1) * limit;
        query.limit = limit;
        query.include = [
          {
            attributes: ["userId"],
            model: db.surveyUsersList,
            as: "surveyEntity",
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "users",
              },
            ],
          },
          {
            model: db.user_farm,
            as: "farms",
          },
          {
            model: db.surveysList,
            as: "survey",
            attributes: [
              "title",
              "description",
              "status",
              [
                db.sequelize.literal(
                  `(SELECT
                sum(sqo.scores) as sqo_score
              from
                survey_questions_response sqr
              inner join survey_question_options sqo on
                sqr.optionId = sqo.id
              where
                sqr.surveyId = survey.id and sqr.surveyUserResponseEntityId = surveyUserResponseEntityList.uuid             
                  )`
                ),
                "scoreSum",
              ],
            ],
            // include: [
            //   {
            //     model: db.surveyQuestions,
            //     as: "surveyQuestions",
            //     required: true,
            //     where: { isDisabled: false },
            //     include: [
            //       {
            //         model: db.surveyQuestionsResponse,
            //         as: "surveyQuestionsResponse",
            //         required: true,
            //         include: [
            //           {
            //             model: db.surveyQuestionOptions,
            //             as: "option",
            //             attributes: ["id", "text", "scores"],
            //           },
            //         ],
            //       },
            //     ],
            //   },
            // ],
          },
        ];
      }
      let getPaginatedResponse =
        await db.surveyUserResponseEntityList.findAndCountAll({
          ...query,
        });
      let responsesCount = 0;
      getSurveyResponses.map((obj) => {
        responsesCount =
          responsesCount + parseInt(obj.dataValues.questionAttemptedCount);
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            responsesCount,
            totalCount: getSurveyResponses.length,
            rows: getPaginatedResponse.rows,
          },
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/response/{surveyUserResponseEntityId}/{surveyId}:
 *   get:
 *     summary: Get survey response for particular user.
 *     description: Get survey response for particular user.
 *     tags: [Survey builder]
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "list retrevied",
 *                             "data": {
 *                               "count": 1,
 *                               "rows": [
 *                                 {
 *                                   "id": 13,
 *                                   "surveyId": 8,
 *                                   "question": "what is the sub question",
 *                                   "questionType": "true",
 *                                   "isDisabled": true,
 *                                   "mandatory": true,
 *                                   "answerTempId": "hjhj",
 *                                   "createdAt": "2022-10-27T04:52:31.000Z",
 *                                   "updatedAt": "2022-10-27T04:52:31.000Z",
 *                                   "surveyQuestionsResponse": [
 *                                     {
 *                                       "id": 3,
 *                                       "userId": 12,
 *                                       "questionId": 13,
 *                                       "surveyId": 8,
 *                                       "optionId": 1,
 *                                       "farmId": null,
 *                                       "createdAt": "2022-10-27T04:50:22.000Z",
 *                                       "updatedAt": "2022-10-27T04:50:22.000Z",
 *                                       "user": {
 *                                         "fullName": "Rohit Chanpak lal gada",
 *                                         "id": 12,
 *                                         "firstName": "Rohit",
 *                                         "lastName": "Chanpak lal gada",
 *                                         "countryCode": 91,
 *                                         "mobile": "70178116641",
 *                                         "email": null
 *                                       },
 *                                       "farm": null,
 *                                       "option": {
 *                                         "id": 1,
 *                                         "questionId": 11,
 *                                         "surveyId": 8,
 *                                         "text": "ssas",
 *                                         "scores": 34,
 *                                         "isDisabled": true,
 *                                         "answerTempId": null,
 *                                         "createdAt": "2022-10-27T04:50:22.000Z",
 *                                         "updatedAt": "2022-10-27T04:50:22.000Z"
 *                                       }
 *                                     }
 *                                   ],
 *                                   "surveysTitle": {
 *                                     "surveyTitleId": 8,
 *                                     "title": "fgfgf",
 *                                     "description": "hjhjh",
 *                                     "isScheduled": true,
 *                                     "scheduledDate": "12345"
 *                                   }
 *                                 }
 *                               ],
 *                               "scores": 34
 *                             }
 *                           }
 */

router.get(
  "/response/:surveyUserResponseEntityId/:surveyId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let { surveyUserResponseEntityId, surveyId } = req.params;
      if (!surveyUserResponseEntityId)
        throw new Error("User Entity id is required");
      if (!surveyId) throw new Error("Survey ID is required");
      let query = {
        where: {
          surveyId,
          uuid: surveyUserResponseEntityId,
          status: "submitted",
        },
        attributes: [
          "id",
          "surveyId",
          "surveyUserListId",
          "farmId",
          ["submittedDate", "responseDate"],
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions_response WHERE survey_questions_response.surveyUserResponseEntityId = surveyUserResponseEntityList.uuid  and survey_questions_response.deletedAt IS NULL)`
            ),
            "questionAttemptedCount",
          ],
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions WHERE survey_questions.surveyId = surveyUserResponseEntityList.surveyId)`
            ),
            "totalQuestion",
          ],
        ],
        include: [
          {
            model: db.surveysList,
            as: "survey",
            attributes: ["id", "title", "description"],
            required: true,
            include: [
              {
                model: db.surveyQuestions,
                as: "surveyQuestions",
                required: true,
                where: { isDisabled: false },
                include: [
                  {
                    model: db.surveyQuestionsResponse,
                    as: "surveyQuestionsResponse",
                    where: {
                      surveyUserResponseEntityId: surveyUserResponseEntityId,
                    },
                    required: true,
                    include: [
                      {
                        model: db.surveyQuestionOptions,
                        as: "option",
                        attributes: ["id", "text", "scores"],
                      },
                      {
                        model: db.Option,
                        as: "crop",
                        attributes: ["id", "name"],
                      },
                      {
                        model: db.Geofence,
                        as: "geofence",
                        attributes: ["id", "geofenceName"],
                        include: [
                          {
                            model: db.user_farm,
                            attributes: ["farmName"],
                            as: "farms"
                          }
                        ]
                      },
                      {
                        attributes: [
                          "fullName",
                          "id",
                          "firstName",
                          "middleName",
                          "lastName",
                          "countryCode",
                          "mobile",
                          "email",
                        ],
                        model: db.user,
                        as: "user",
                      },
                      {
                        model: db.Equipment,
                        as: "equipment",
                        attributes: ["id", ["displayName", "name"]],
                      },
                      {
                        model: db.user,
                        as: "farm",
                        attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            attributes: ["userId"],
            model: db.surveyUsersList,
            as: "surveyEntity",
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "users",
              },
            ],
          },
          {
            model: db.user_farm,
            as: "farms",
            attributes: ["id", ["farmName", "name"]],
          },
        ],
      };
      let getSurveyResponses = {};
      getSurveyResponses = await db.surveyUserResponseEntityList.findOne({
        ...query,
      });
      let scores = 0;
      getSurveyResponses.survey.surveyQuestions.map((obj) => {
        scores += obj.surveyQuestionsResponse[0].option?.scores ?? 0;
      });
      getSurveyResponses = JSON.parse(JSON.stringify(getSurveyResponses));
      getSurveyResponses.survey.surveyQuestions =
        getSurveyResponses.survey.surveyQuestions
          .sort((a, b) => a.id - b.id)
          .map((el) => el);
      getSurveyResponses.scores = scores;
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            result: getSurveyResponses,
            scores,
          },
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

router.get(
  "/question/responses-summary/:surveyId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const { surveyId } = req.params;
      if (!surveyId) throw new Error("Survey ID is required");

      let { page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      // Count the total survey questions
      const totalCount = await db.surveyQuestions.count({
        where: { surveyId, isDisabled: false, isNestedQuestion: false },
      });

      // Paginate survey questions
      const paginatedSurveyQuestions = await db.surveyQuestions.findAll({
        where: {
          surveyId: surveyId,
          isDisabled: false,
          isNestedQuestion: false,
        },
        offset: (page - 1) * limit,
        limit: limit,
        include: [
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            include: [
              {
                model: db.surveyQuestions,
                as: "nestedQuestions",
                where: { isDisabled: false },
                required: false,
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "questionOptions",
                    required: false,
                  },
                  {
                    model: db.surveyQuestionsResponse,
                    as: "surveyQuestionsResponse",
                    required: false,
                    include: [
                      {
                        attributes: [
                          "fullName",
                          "id",
                          "firstName",
                          "middleName",
                          "lastName",
                          "countryCode",
                          "mobile",
                          "email",
                        ],
                        model: db.user,
                        as: "user",
                      },
                      {
                        model: db.Option,
                        as: "crop",
                        attributes: ["id", "name"],
                      },
                      {
                        model: db.Geofence,
                        as: "geofence",
                        attributes: ["id", "geofenceName"],
                      },
                      {
                        model: db.Equipment,
                        as: "equipment",
                        attributes: ["id", ["displayName", "name"]],
                      },
                      {
                        model: db.user,
                        as: "farm",
                        attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.surveyQuestionsResponse,
            as: "surveyQuestionsResponse",
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "user",
              },
              {
                model: db.Equipment,
                as: "equipment",
                attributes: ["id", ["displayName", "name"]],
              },
              {
                model: db.Option,
                as: "crop",
                attributes: ["id", "name"],
              },
              {
                model: db.Geofence,
                as: "geofence",
                attributes: ["id", "geofenceName"],
              },
              {
                model: db.user,
                as: "farm",
                attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
              },
            ],
          },
        ],
      });

      return res.json({
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        data: paginatedSurveyQuestions,
      });
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/response/{surveyId}:
 *     get:
 *       summary: Get survey questions options.
 *       description: Get survey questions options.
 *       tags: [Survey builder]
 *       responses:
 *           '200':
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: string
 *                     code:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     data:
 *                       type: object
 *                   example:
 *                            {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "list retrevied",
 *                               "data": [
 *                                 {
 *                                   "id": 8,
 *                                   "userId": 123199,
 *                                   "title": "fgfgf",
 *                                   "description": "hjhjh",
 *                                   "isScheduled": true,
 *                                   "scheduledDate": "12345",
 *                                   "isMultistep": null,
 *                                   "questionForEachStep": 5,
 *                                   "surveyStatus": true,
 *                                   "isSelectedUsers": true,
 *                                   "linkedWithFarms": true,
 *                                   "isDeleted": false,
 *                                   "createdAt": "2022-10-19T12:27:54.000Z",
 *                                   "updatedAt": "2022-10-19T12:27:54.000Z",
 *                                   "surveyQuestions": [
 *                                     {
 *                                       "id": 11,
 *                                       "surveyId": 8,
 *                                       "question": "what is the question",
 *                                       "type": "true",
 *                                       "isDisabled": true,
 *                                       "mandatory": true,
 *                                       "answerTempId": null,
 *                                       "createdAt": "2022-10-27T04:50:21.000Z",
 *                                       "updatedAt": "2022-10-27T04:50:21.000Z",
 *                                       "questionOptions": [
 *                                         {
 *                                           "id": 1,
 *                                           "questionId": 11,
 *                                           "surveyId": 8,
 *                                           "text": "ssas",
 *                                           "scores": 34,
 *                                           "isDisabled": true,
 *                                           "answerTempId": null,
 *                                           "createdAt": "2022-10-27T04:50:22.000Z",
 *                                           "updatedAt": "2022-10-27T04:50:22.000Z"
 *                                         },
 *                                         {
 *                                           "id": 2,
 *                                           "questionId": 11,
 *                                           "surveyId": 8,
 *                                           "text": "ssas",
 *                                           "scores": 34,
 *                                           "isDisabled": true,
 *                                           "answerTempId": "hjhj",
 *                                           "createdAt": "2022-10-27T04:50:22.000Z",
 *                                           "updatedAt": "2022-10-27T04:50:22.000Z"
 *                                         }
 *                                       ]
 *                                     }
 *                                   ]
 *                                 }
 *                               ]
 *                             }
 */

router.get(
  "/question/response/:surveyId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const { surveyId } = req.params;
      if (!surveyId) throw new Error("Survey ID is required");

      let { page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      // Fetch the overall survey response
      const surveyResponse = await db.surveysList.findOne({
        where: { id: surveyId },
        include: [
          {
            model: db.surveyQuestions,
            as: "surveyQuestions",
            where: { isDisabled: false, isNestedQuestion: false },
            include: [
              {
                model: db.surveyQuestionOptions,
                as: "questionOptions",
                include: [
                  {
                    model: db.surveyQuestions,
                    as: "nestedQuestions",
                    where: { isDisabled: false },
                    required: false,
                    include: [
                      {
                        model: db.surveyQuestionOptions,
                        as: "questionOptions",
                        required: false,
                      },
                      {
                        model: db.surveyQuestionsResponse,
                        as: "surveyQuestionsResponse",
                        required: false,
                        include: [
                          {
                            attributes: [
                              "fullName",
                              "id",
                              "firstName",
                              "middleName",
                              "lastName",
                              "countryCode",
                              "mobile",
                              "email",
                            ],
                            model: db.user,
                            as: "user",
                          },
                          {
                            model: db.Option,
                            as: "crop",
                            attributes: ["id", "name"],
                          },
                          {
                            model: db.Geofence,
                            as: "geofence",
                            attributes: ["id", "geofenceName"],
                          },
                          {
                            model: db.Equipment,
                            as: "equipment",
                            attributes: ["id", ["displayName", "name"]],
                          },
                          {
                            model: db.user,
                            as: "farm",
                            attributes: [
                              "id",
                              "firstName",
                              "middleName",
                              "lastName",
                              "fullName",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                model: db.surveyQuestionsResponse,
                as: "surveyQuestionsResponse",
                include: [
                  {
                    attributes: [
                      "fullName",
                      "id",
                      "firstName",
                      "middleName",
                      "lastName",
                      "countryCode",
                      "mobile",
                      "email",
                    ],
                    model: db.user,
                    as: "user",
                  },
                  {
                    model: db.Equipment,
                    as: "equipment",
                    attributes: ["id", ["displayName", "name"]],
                  },
                  {
                    model: db.Option,
                    as: "crop",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.Geofence,
                    as: "geofence",
                    attributes: ["id", "geofenceName"],
                  },
                  {
                    model: db.user,
                    as: "farm",
                    attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                  },
                ],
              },
            ],
          },
        ],
      });

      // Count the total survey questions
      const totalCount = await db.surveyQuestions.count({
        where: { surveyId, isDisabled: false, isNestedQuestion: false },
      });

      // Paginate survey questions
      const paginatedSurveyQuestions = await db.surveyQuestions.findAll({
        where: {
          surveyId: surveyId,
          isDisabled: false,
          isNestedQuestion: false,
        },
        offset: (page - 1) * limit,
        limit: limit,
        include: [
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            include: [
              {
                model: db.surveyQuestions,
                as: "nestedQuestions",
                where: { isDisabled: false },
                required: false,
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "questionOptions",
                    required: false,
                  },
                  {
                    model: db.surveyQuestionsResponse,
                    as: "surveyQuestionsResponse",
                    required: false,
                    include: [
                      {
                        attributes: [
                          "fullName",
                          "id",
                          "firstName",
                          "middleName",
                          "lastName",
                          "countryCode",
                          "mobile",
                          "email",
                        ],
                        model: db.user,
                        as: "user",
                      },
                      {
                        model: db.Option,
                        as: "crop",
                        attributes: ["id", "name"],
                      },
                      {
                        model: db.Geofence,
                        as: "geofence",
                        attributes: ["id", "geofenceName"],
                      },
                      {
                        model: db.Equipment,
                        as: "equipment",
                        attributes: ["id", ["displayName", "name"]],
                      },
                      {
                        model: db.user,
                        as: "farm",
                        attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.surveyQuestionsResponse,
            as: "surveyQuestionsResponse",
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "user",
              },
              {
                model: db.Equipment,
                as: "equipment",
                attributes: ["id", ["displayName", "name"]],
              },
              {
                model: db.Option,
                as: "crop",
                attributes: ["id", "name"],
              },
              {
                model: db.Geofence,
                as: "geofence",
                attributes: ["id", "geofenceName"],
              },
              {
                model: db.user,
                as: "farm",
                attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
              },
            ],
          },
        ],
      });

      // Attach the paginated surveyQuestions to the surveyResponse
      if (surveyResponse) {
        surveyResponse.dataValues.surveyQuestions = paginatedSurveyQuestions;
      }

      return res.json({
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        data: surveyResponse,
      });
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/response/question/{questionId}:
 *     get:
 *       summary: Get survey questions options by particular question.
 *       description: Get survey questions options by particular question.
 *       tags: [Survey builder]
 *       responses:
 *           '200':
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: string
 *                     code:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     data:
 *                       type: object
 *                   example:
 *                               {
 *                                 "success": true,
 *                                 "code": 200,
 *                                 "message": "list retrevied",
 *                                 "data": {
 *                                   "id": 11,
 *                                   "surveyId": 8,
 *                                   "question": "what is the question",
 *                                   "type": "true",
 *                                   "isDisabled": true,
 *                                   "mandatory": true,
 *                                   "answerTempId": null,
 *                                   "createdAt": "2022-10-27T04:50:21.000Z",
 *                                   "updatedAt": "2022-10-27T04:50:21.000Z",
 *                                   "surveysTitle": {
 *                                     "surveyTitleId": 8,
 *                                     "title": "fgfgf",
 *                                     "description": "hjhjh",
 *                                     "isScheduled": true,
 *                                     "scheduledDate": "12345",
 *                                     "surveyQuestionsCount": 18
 *                                   },
 *                                   "questionOptions": [
 *                                     {
 *                                       "id": 1,
 *                                       "questionId": 11,
 *                                       "surveyId": 8,
 *                                       "text": "ssas",
 *                                       "scores": 34,
 *                                       "isDisabled": true,
 *                                       "answerTempId": null,
 *                                       "createdAt": "2022-10-27T04:50:22.000Z",
 *                                       "updatedAt": "2022-10-27T04:50:22.000Z",
 *                                       "surveyQuestionsResponse": [
 *                                         {
 *                                           "id": 3,
 *                                           "userId": 12,
 *                                           "questionId": 13,
 *                                           "surveyId": 8,
 *                                           "optionId": 1,
 *                                           "farmId": null,
 *                                           "createdAt": "2022-10-27T04:50:22.000Z",
 *                                           "updatedAt": "2022-10-27T04:50:22.000Z",
 *                                           "user": {
 *                                             "fullName": "Rohit Chanpak lal gada",
 *                                             "id": 12,
 *                                             "firstName": "Rohit",
 *                                             "lastName": "Chanpak lal gada",
 *                                             "countryCode": 91,
 *                                             "mobile": "70178116641",
 *                                             "email": null
 *                                           }
 *                                         }
 *                                       ]
 *                                     }
 *                                   ]
 *                                 }
 *                               }
 */

// get question wise responses
router.get(
  "/question/response/question/:questionId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      let { questionId } = req.params;
      if (!questionId) throw new Error("Question ID is required");
      const getSurveyResponses = await db.surveyQuestions.findOne({
        where: { id: questionId, isDisabled: false },
        include: [
          {
            model: db.surveysList,
            as: "surveysTitle",
            attributes: [
              ["id", "surveyTitleId"],
              "title",
              "description",
              "isScheduled",
              "scheduledDate",
              [
                db.sequelize.literal(
                  `(SELECT count(*) from survey_questions WHERE surveyId = surveyQuestions.surveyId)`
                ),
                "surveyQuestionsCount",
              ],
            ],
          },
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            include: [
              {
                model: db.surveyQuestionsResponse,
                as: "surveyQuestionsResponse",
                include: [
                  {
                    model: db.user,
                    as: "user",
                    attributes: [
                      "fullName",
                      "id",
                      "firstName",
                      "middleName",
                      "lastName",
                      "countryCode",
                      "mobile",
                      "email",
                    ],
                  },
                  {
                    model: db.Equipment,
                    as: "equipment",
                    attributes: ["id", ["displayName", "name"]],
                  },
                  {
                    model: db.Option,
                    as: "crop",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.Geofence,
                    as: "geofence",
                    attributes: ["id", "geofenceName"],
                  },
                  {
                    model: db.user,
                    as: "farm",
                    attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: getSurveyResponses,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/questions/{surveyId}:
 *     get:
 *       summary: Get survey questions options.
 *       description: Get survey questions options.
 *       tags: [Survey builder]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: surveyId
 *           required: true
 *           schema:
 *             type: number
 *       responses:
 *           '200':
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: string
 *                     code:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     data:
 *                       type: object
 *                   example:
 *                            {
 *                               "success": true,
 *                               "code": 200,
 *                               "message": "list retrevied",
 *                               "data": [
 *                                      {
 *                                       "id": 11,
 *                                       "surveyId": 8,
 *                                       "question": "what is the question",
 *                                       "type": "true",
 *                                       "isDisabled": true,
 *                                       "mandatory": true,
 *                                       "answerTempId": null,
 *                                       "createdAt": "2022-10-27T04:50:21.000Z",
 *                                       "updatedAt": "2022-10-27T04:50:21.000Z",
 *                                       "questionOptions": [
 *                                         {
 *                                           "id": 1,
 *                                           "questionId": 11,
 *                                           "surveyId": 8,
 *                                           "text": "ssas",
 *                                           "scores": 34,
 *                                           "isDisabled": true,
 *                                           "answerTempId": null,
 *                                           "createdAt": "2022-10-27T04:50:22.000Z",
 *                                           "updatedAt": "2022-10-27T04:50:22.000Z"
 *                                         },
 *                                         {
 *                                           "id": 2,
 *                                           "questionId": 11,
 *                                           "surveyId": 8,
 *                                           "text": "ssas",
 *                                           "scores": 34,
 *                                           "isDisabled": true,
 *                                           "answerTempId": "hjhj",
 *                                           "createdAt": "2022-10-27T04:50:22.000Z",
 *                                           "updatedAt": "2022-10-27T04:50:22.000Z"
 *                                         }
 *                                       ]
 *                                     }
 *                                   ]
 *                             }
 */

// get all survey question list
router.get(
  "/questions/:surveyId",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const { surveyId } = req.params;
      if (!surveyId) throw new Error("Survey ID is required");
      let { search, page, limit, orderField, order } = req.query;
      let where = {
        surveyId: surveyId,
        isNestedQuestion: 0,
        isDisabled: 0,
      };
      if (search) {
        where[Op.or] = {
          question: { [Op.like]: `%${search}%` },
        };
      }
      let query = {
        where,
        distinct: "id",
        include: [
          {
            model: db.surveyQuestionOptions,
            as: "questionOptions",
            include: [
              {
                model: db.surveyQuestions,
                as: "nestedQuestions",
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "questionOptions",
                  },
                ],
              },
            ],
          },
          {
            model: db.surveyQuestionsResponse,
            as: "surveyQuestionsResponse",
            include: [
              {
                attributes: [
                  "fullName",
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "countryCode",
                  "mobile",
                  "email",
                ],
                model: db.user,
                as: "user",
              },
            ],
          },
        ],
      };
      const POSSIBLE_ORDER_FIELDS = ["question", "questionType"];
      const POSSIBLE_ORDERS = ["ASC", "DESC"];
      const formattedOrder = order ? order.toUpperCase() : null;
      if (
        POSSIBLE_ORDER_FIELDS.includes(orderField) &&
        POSSIBLE_ORDERS.includes(formattedOrder)
      ) {
        if (orderField === "responses" || orderField === "question") {
          query.order = db.sequelize.literal(
            `${
              orderField === "question" ? "createdAt" : orderField
            } ${formattedOrder}`
          );
        } else {
          query.order = [[orderField, formattedOrder]];
        }
      } else {
        query.order = [
          ["createdAt", "ASC"],
          ["id", "ASC"],
        ];
      }
      if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        query.offset = (page - 1) * limit;
        query.limit = limit;
      }
      const getSurveyResponses = await db.surveyQuestions.findAndCountAll({
        ...query,
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: getSurveyResponses,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/copy:
 *   post:
 *     summary: Create survey copy.
 *     description: Create survey copy.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                      {
 *                         "title": "New title",
 *                         "description": "New title",
 *                         "scheduledDate": "12345",
 *                         "isMultistep": true,
 *                         "questionForEachStep": 5,
 *                         "surveyStatus": true,
 *                         "users": [
 *                             246,
 *                             118
 *                         ],
 *                         "linkedWithFarms": false
 *                       }
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
 *                          {
 *                             "success": true,
 *                             "code": 200,
 *                             "message": "Survey title created",
 *                             "data": {
 *                                 "id": 12,
 *                                 "title": "New title",
 *                                 "description": "New title",
 *                                 "isScheduled": true,
 *                                 "scheduledDate": "12345",
 *                                 "questionForEachStep": 5,
 *                                 "surveyStatus": true,
 *                                 "userId": 438,
 *                                 "isSelectedUsers": true,
 *                                 "linkedWithFarms": true,
 *                                 "updatedAt": "2022-10-28T09:37:01.429Z",
 *                                 "createdAt": "2022-10-28T09:37:01.429Z"
 *                             }
 *                           }
 */

// create survey copy
router.post(
  "/copy",
  auth,
  createSurveyTitle(),
  validationErrorHandler,
  async function (req, res) {
    const { organization } = req.user;

    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;

      const {
        title,
        description,
        parentId, // From Survey Id
      } = req.body;

      const survey = await getSurveys(parentId, userId);

      const surveySet = {
        title,
        description,
        scheduledDate: null,
        scheduledEndDate: null,
        isMultistep: survey.isMultistep,
        questionForEachStep: survey.questionForEachStep,
        surveyStatus: false,
        linkedWithFarms: survey.linkedWithFarms,
        userId,
        isSelectedUsers: survey.isSelectedUsers,
        isScheduled: false,
        organization,
        parentId,
      };

      const createSurveyTitle = await db.surveysList.create(surveySet, {
        transaction,
      });

      if (createSurveyTitle) {
        const surveyUsersObj = survey.surveySelectedUsers.map((item) => ({
          userId: item.userId,
          surveyId: createSurveyTitle.id,
          isDisabled: false,
        }));

        const uniqueUserMap = new Map();
        surveyUsersObj.forEach((item) => {
          if (!uniqueUserMap.has(item.userId)) {
            uniqueUserMap.set(item.userId, item);
          }
        });

        const uniqueSurveyUsersObj = Array.from(uniqueUserMap.values());

        await db.surveyUsersList.bulkCreate(uniqueSurveyUsersObj, {
          transaction,
        });

        const surveyId = createSurveyTitle.id;

        for (const item of survey.surveyQuestions) {
          const surveyQuestionsList = {
            surveyId,
            question: item.question,
            mandatory: item.mandatory,
            isQuestionScore: item.isQuestionScore,
            questionType: item.questionType,
            scores: item.scores,
            isDisabled: false,
            answerTempId: null,
          };

          const createSurveyQuestion = await db.surveyQuestions.create(
            surveyQuestionsList,
            { transaction }
          );

          for (const answerObj of item.questionOptions) {
            const answerObjList = {
              questionId: createSurveyQuestion.id,
              surveyId,
              isDisabled: false,
              text: answerObj.text,
              scores: answerObj.scores,
              answerTempId: answerObj.answerTempId,
            };

            if (answerObj.nestedQuestions) {
              const nestedQuestionList = {
                surveyId,
                question: answerObj.nestedQuestions.question,
                mandatory: false,
                isQuestionScore: createSurveyQuestion.isQuestionScore,
                scores: answerObj.nestedQuestions.scores,
                questionType: answerObj.nestedQuestions.questionType,
                isDisabled: false,
                answerTempId: answerObj.nestedQuestions.answerTempId,
                isNestedQuestion: true,
              };

              const nestedQuestion = await db.surveyQuestions.create(
                nestedQuestionList,
                { transaction }
              );

              answerObjList.nestedQuestionId = nestedQuestion.id;

              for (const nestedAnswerObj of answerObj.nestedQuestions
                .questionOptions) {
                const nestedAnswerObjList = {
                  questionId: nestedQuestion.id,
                  surveyId,
                  isDisabled: false,
                  text: nestedAnswerObj.text,
                  scores: nestedAnswerObj.scores,
                  answerTempId: nestedAnswerObj.answerTempId,
                };
                await db.surveyQuestionOptions.create(nestedAnswerObjList, {
                  transaction,
                });
              }
            }

            await db.surveyQuestionOptions.create(answerObjList, {
              transaction,
            });
          }
        }
      }

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: createSurveyTitle,
        })
      );
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /admin/surveys/question/{questionId}/future:
 *   post:
 *     summary: update survey question
 *     description: update survey question.
 *     tags: [Survey builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *                 {
 *                   "question": "new question",
 *                   "type": "qwerty",
 *                   "mandatory": false,
 *                   "options": [
 *                       {
 *                           "id": 1,
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": null
 *                       },
 *                       {
 *                           "id": 2,
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": "hjhj"
 *                       },
 *                       {
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": ""
 *                       },
 *                       {
 *                           "text": "ssas",
 *                           "scores": 34,
 *                           "answerTempId": ""
 *                       }
 *                   ]
 *               }
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
 *                          {"success": true,"code": 200,"message": "Survey question deleted","data": {}}
 */

// update future question
router.post(
  "/question/:questionId/future",
  auth,
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const { organization } = req.user;
      const userId = req.user.id;
      const { questionId: id } = req.params;
      const { question, title, description, parentId } = req.body;

      const survey = await getSurveys(parentId, userId);
      const surveySet = {
        title,
        description,
        scheduledDate: null,
        scheduledEndDate: null,
        isMultistep: survey.isMultistep,
        questionForEachStep: survey.questionForEachStep,
        surveyStatus: false,
        linkedWithFarms: survey.linkedWithFarms,
        userId,
        isSelectedUsers: survey.isSelectedUsers,
        isScheduled: false,
        organization,
        parentId,
      };

      const createSurveyTitle = await db.surveysList.create(surveySet, {
        transaction,
      });

      if (createSurveyTitle) {
        const surveyId = createSurveyTitle.id;

        const surveyUsersObj = survey.surveySelectedUsers.map((item) => ({
          userId: item.userId,
          surveyId,
          isDisabled: false,
        }));

        const uniqueUserMap = new Map();
        surveyUsersObj.forEach((item) => {
          if (!uniqueUserMap.has(item.userId)) {
            uniqueUserMap.set(item.userId, item);
          }
        });

        const uniqueSurveyUsersObj = Array.from(uniqueUserMap.values());

        await db.surveyUsersList.bulkCreate(uniqueSurveyUsersObj, {
          transaction,
        });

        await Promise.all(
          survey.surveyQuestions.map(async (item) => {
            let surveyQuestionsList = {
              surveyId,
              question: item.question,
              mandatory: item.mandatory,
              isQuestionScore: item.isQuestionScore,
              questionType: item.questionType,
              isDisabled: false,
              answerTempId: null,
            };

            let questionOptions = item.questionOptions;

            if (item.dataValues.id === Number(id)) {
              surveyQuestionsList = {
                question: question.question,
                questionType: question.questionType,
                mandatory: question.mandatory,
                answerTempId: null,
                isQuestionScore: question.isQuestionScore,
                surveyId,
                isDisabled: false,
              };

              questionOptions = question.options;
            }

            const createSurveyQuestion = await db.surveyQuestions.create(
              surveyQuestionsList,
              { transaction }
            );

            await Promise.all(
              questionOptions.map(async (answerObj) => {
                const answerObjList = {
                  questionId: createSurveyQuestion.id,
                  surveyId,
                  isDisabled: false,
                  text: answerObj.text,
                  scores: answerObj.scores,
                  answerTempId: answerObj.answerTempId,
                };

                if (answerObj.nestedQuestions) {
                  const nestedQuestionList = {
                    surveyId,
                    question: answerObj.nestedQuestions.question,
                    mandatory: false,
                    isQuestionScore: createSurveyQuestion.isQuestionScore,
                    questionType: answerObj.nestedQuestions.questionType,
                    isDisabled: false,
                    answerTempId: answerObj.nestedQuestions.answerTempId,
                    isNestedQuestion: true,
                  };

                  const nestedQuestion = await db.surveyQuestions.create(
                    nestedQuestionList,
                    { transaction }
                  );

                  answerObjList.nestedQuestionId = nestedQuestion.id;

                  const nestedAnswerObjList =
                    answerObj.nestedQuestions.questionOptions.map(
                      (nestedAnswerObj) => ({
                        questionId: nestedQuestion.id,
                        surveyId,
                        isDisabled: false,
                        text: nestedAnswerObj.text,
                        scores: nestedAnswerObj.scores,
                        answerTempId: nestedAnswerObj.answerTempId,
                      })
                    );

                  await db.surveyQuestionOptions.bulkCreate(
                    nestedAnswerObjList,
                    { transaction }
                  );
                }
                await db.surveyQuestionOptions.create(answerObjList, {
                  transaction,
                });
              })
            );
          })
        );
      }

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: createSurveyTitle,
        })
      );
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

router.get("/download/:id", auth, async function (req, res) {
  try {
    const jobId = uuidv4();
    await db.surveyResponseDownloadHistory.create({
      status: "started",
      surveyId: req.params.id,
      jobId,
    });

    surveyResponseDownloadQueue.add(
      { req: { params: req.params, query: req.query, userId: req.user.id } },
      { jobId }
    );

    return res.json(
      successRespSync({
        msg: "Survey response download successfully queued",
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

//publish a survey
router.post("/publish/:id", auth, async function (req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (status === "publish") {
      let where = {
        id,
        isScheduled: false,
        surveyStatus: true,
        status: "Inactive",
      };
      const survey = await db.surveysList.findOne({ where });
      if (!survey) throw new Error("Survey not found");
      const questions = await db.surveyQuestions.findAll({
        where: {
          surveyId: id,
        },
      });

      if (questions.length < 1) throw new Error("Cannot publish empty survey");

      await publishSurvey(survey);
    } else if (status === "end") {
      let where = {
        id,
        isScheduled: false,
        surveyStatus: true,
        status: "Active",
      };
      const survey = await db.surveysList.findOne({ where });
      if (!survey) throw new Error("Survey not found");

      await db.surveysList.update(
        {
          surveyStatus: false,
          status: "Completed",
        },
        {
          where: { id: survey.id },
        }
      );

      await db.surveyUsersList.update(
        { status: false },
        {
          where: {
            surveyId: survey.id,
          },
        }
      );

      await db.surveyUserResponseEntityList.update(
        { surveyStatus: false },
        {
          where: {
            surveyId: survey.id,
          },
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Survey updated successfully",
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

const generateExcelReport = async (csvOrXlsx, response) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Response All");

    const filePath = path.resolve(
      __dirname,
      `../../../files/survey-all-response.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../../files/survey-all-response.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};

router.get("/single/download/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let where = { uuid: id, status: "submitted" };
    let include = [
      {
        model: db.surveysList,
        as: "survey",
        attributes: [
          "id",
          "title",
          "description",
          "surveyStatus",
          "isMultistep",
          "questionForEachStep",
          "linkedWithFarms",
        ],
        required: true,
        include: [
          {
            model: db.surveyQuestions,
            as: "surveyQuestions",
            required: true,
            where: { isDisabled: false },
            include: [
              {
                model: db.surveyQuestionsResponse,
                as: "surveyQuestionsResponse",
                where: { surveyUserResponseEntityId: id },
                required: true,
                include: [
                  {
                    model: db.surveyQuestionOptions,
                    as: "option",
                    attributes: ["id", "text"],
                  },
                  {
                    model: db.Option,
                    as: "crop",
                    attributes: ["id", "name"],
                  },
                  {
                    model: db.Geofence,
                    as: "geofence",
                    attributes: ["id", "geofenceName"],
                    include: [
                      {
                        model: db.user_farm,
                        attributes: ["farmName"],
                        as: "farms"
                      }
                    ]
                  },
                  {
                    model: db.Equipment,
                    as: "equipment",
                    attributes: ["id", ["displayName", "name"]],
                  },
                  {
                    model: db.user,
                    as: "farm",
                    attributes: ["id", "firstName","middleName" ,"lastName", "fullName"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        model: db.user_farm,
        as: "farms",
        attributes: ["id", ["farmName", "name"]],
      },
    ];

    let query = {
      where,
      include,
    };
    let surveys = await db.surveyUserResponseEntityList.findOne({ ...query });
    let questions = surveys.survey.surveyQuestions;
    questions.sort((a, b) => a.id - b.id);
    const surveyRes = questions.map((q) => {
      let answer = 1;
      if (q.questionType.includes("dynamic")) {
        let answerArray = q.surveyQuestionsResponse;
        if (q.questionType === "dynamicEquipment") {
          answer = answerArray
            .map((r) => r?.equipment?.dataValues?.name)
            .join(", ");
        }
        if (q.questionType === "dynamicFarmer") {
          answer = answerArray.map((r) => r?.farm?.fullName).join(", ");
        }
        if (q.questionType === "dynamicGeoFence") {
          answer = answerArray.map((r) => {
            return r.geofence.geofenceName ? `${r.geofence.farms.farmName} - ${r.geofence.geofenceName}` : `${r.geofence.farms.farmName} - Geofence #${r.geofence.id}`
          }).join(", ");
        }
        if (q.questionType === "dynamicCrop") {
          answer = answerArray.map((r) => r?.crop?.name).join(", ");
        }
      } else if (q.questionType === "checkbox") {
        answer = q.surveyQuestionsResponse
          .map((response) => response?.option?.text || response?.text)
          .join(", ");
      } else {
        answer =
          q.questionType === "radio"
            ? q.surveyQuestionsResponse[0].option.text
            : q.surveyQuestionsResponse[0].text;
      }
      return {
        surveyName: surveys.survey.title,
        submittedDate: moment(surveys.submittedDate).format("DD/MM/YY"),
        question: q.question,
        answer: answer,
      };
    });
    const surveyData = {
      surveyName: surveys.survey.title,
      submittedDate: moment(surveys.submittedDate).format("DD/MM/YY"),
      farmName: surveys.survey.linkedWithFarms
        ? surveys.farms.dataValues.name
        : "N/A",
      surveyRes,
    };
    let pdfData = await generateResponsePDF(surveyData);
    if (!pdfData) {
      return res.json(
        errorRespSync({
          msg: "PDF report generation failed.",
        })
      );
    } else {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + pdfData.fileName,
      });
      await fs.createReadStream(pdfData.path).pipe(res);
      fs.unlink(
        path.resolve(rootPath + `/views/reports/${pdfData.fileName}`),
        (err) => {
          if (err) {
            console.log(err, "While deleting survey reponse file");
            return;
          }
        }
      );
      return;
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.get("/download-survey-histories/:id", auth, async (req, res) => {
  const { id } = req.params;
  let { limit, page, searchPhrase } = req.query;
  const query = {};
  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    query.offset = (page - 1) * limit;
    query.limit = limit;
  }
  try {
    const surveyList = await db.surveysList.findOne({
      where: {
        id,
        organization: req.user.organization,
      },
      attributes: ['id'],
    });
    if(!surveyList) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.DOESNT_EXISTS,
        })
      );
    }
    const surveyDownloadHistories =
      await db.surveyResponseDownloadHistory.findAndCountAll({
        order: [["createdAt", "DESC"]],
        where: {
          surveyId: id,
        },
        ...query,
      });
    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: surveyDownloadHistories,
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

module.exports = router;
