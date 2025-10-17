const express = require("express");
const moment = require("moment");
const _ = require("lodash");
const { Op, Sequelize } = require("sequelize");
const xlsx = require("xlsx");
const { uploadToS3 } = require(rootPath + "/helpers/aws_s3");
const router = express.Router();
const stream = require("stream");
const generateResponsePDF = require("../../../helpers/responsePdfGenerator");
const fs = require("fs");
const path = require("path");
const { request } = require("http");

const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { success } = require(rootPath + "/helpers/language");
const { errorRespSync, successRespSync, serverError } = require(rootPath +
  "/helpers/api");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

const chunk = (arr, size) => {
  return arr?.reduce((acc, val) => {
    if (acc.length === 0 || acc[acc.length - 1].length === size) {
      acc.push([val]);
    } else {
      acc[acc.length - 1].push(val);
    }
    return acc;
  }, []);
};

/**
 * @swagger
 * /user/survey:
 *     get:
 *       summary: Get survey questions options.
 *       description: Get survey questions options.
 *       tags: [Survey-User]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *         - in: query
 *           name: searchPhrase
 *           required: false
 *           schema:
 *             type: string
 *         - in: query
 *           name: sortBy
 *           required: false
 *           schema:
 *             type: string
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully.",
 *                       "data":
 *                          {
 *                                "id": 5,
 *                                "userId": 17,
 *                                "surveyId": 18,
 *                                "isDisabled": false,
 *                                "status": "active",
 *                                "startDate": null,
 *                                "createdAt": "2022-11-14T07:28:28.000Z",
 *                                "updatedAt": "2022-11-14T07:28:28.000Z",
 *                                "survey": { "id": 1, "title": "Test", "description": "test", "surveyQuestionsCount": 1, "surveyResponseCount": 1 }
 *                          }}
 *
 */

router.get("/", auth, translation, validationErrorHandler, async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { searchPhrase, sortBy, farmerId } = req.query;

    const userId = farmerId ? farmerId : loggedInUserId;

    let where = { userId, surveyListStatus: true };

    let userWhere = {};
    if (searchPhrase) {
      userWhere = { title: { [Op.like]: `%${searchPhrase}%` } };
    }

    let include = [
      {
        model: db.surveysList,
        as: "survey",
        attributes: [
          "id",
          "title",
          "userId",
          "description",
          "surveyStatus",
          "isMultistep",
          "questionForEachStep",
          "linkedWithFarms",
          "status",
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions WHERE surveyId = survey.id and isDisabled = 0)`
            ),
            "surveyQuestionsCount",
          ],
          [
            db.sequelize.literal(`(
              SELECT COUNT(*) FROM survey_questions_response WHERE
              userId = surveyUsersList.userId AND
              surveyId = survey.id AND
              deletedAt IS NULL
            )`),
            "surveyResponseCount",
          ],
        ],
        where: userWhere,
        required: true,
      },
      {
        model: db.surveyUserResponseEntityList,
        as: "surveyEntity",
        required: false,
        attributes: [
          "id",
          "uuid",
          "surveyId",
          "surveyUserListId",
          "farmId",
          "surveyStatus",
          "status",
          "startDate",
          "submittedDate",
          "createdAt",
          "updatedAt",
          [
            db.sequelize.literal(
              `(SELECT count(*) from survey_questions WHERE surveyId = survey.id and isDisabled = 0)`
            ),
            "totalQuestion",
          ],
          [
            db.sequelize.literal(
              `(SELECT recordId from user_farms WHERE id = surveyEntity.farmId)`
            ),
            "farmRecordId",
          ],
          [
            db.sequelize.literal(
              `(SELECT farmName from user_farms WHERE id = surveyEntity.farmId)`
            ),
            "farmName",
          ],
          [
            db.sequelize.literal(`(
              SELECT COUNT(DISTINCT(questionId)) FROM survey_questions_response WHERE survey_questions_response.surveyId = survey.id AND survey_questions_response.surveyUserResponseEntityId = surveyEntity.uuid AND deletedAt IS NULL
            )`),
            "responded",
          ],
        ],
        order: [["createdAt", "DESC"]],
      },
    ];

    let query = {
      where,
      include,
    };

    if (sortBy) {
      query = {
        ...query,
        order: [[db.Sequelize.literal(`status = ${sortBy}`), "ASC"]],
      };
    }

    let surveys = await db.surveyUsersList.findAll({ ...query });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: surveys,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});
/**
 * @swagger
 * /user/survey/{surveyId}/{surveyEntityId}:
 *     get:
 *       summary: Get individual survey questions and options.
 *       description: Get individual survey questions options.
 *       tags: [Survey-User]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: id
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully.",
 *                       "data": [
 *                          {
 *                                "id": 5,
 *                                "userId": 17,
 *                                "surveyId": 18,
 *                                "isDisabled": false,
 *                                "status": "active",
 *                                "startDate": null,
 *                                "createdAt": "2022-11-14T07:28:28.000Z",
 *                                "updatedAt": "2022-11-14T07:28:28.000Z",
 *                                "survey": { "id": 1, "title": "Test", "description": "test", "surveyQuestions": [] }
 *                          }]}
 *
 */

router.get(
  "/:surveyId",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { surveyId } = req.params;
      const { entityId } = req.query;
      let where = { uuid: entityId };
      let include, response;

      if (surveyId && entityId) {
        // when both are provided
        include = [
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
                required: false,
                where: { isDisabled: false, isNestedQuestion: false },
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
                            where: { surveyUserResponseEntityId: entityId },
                            required: false,
                            include: [
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
                                  "lastName",
                                  "middleName",
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
                    where: { surveyUserResponseEntityId: entityId },
                    required: false,
                  },
                ],
              },
            ],
          },
        ];
        let query = {
          where,
          include,
        };

        let surveys = await db.surveyUserResponseEntityList.findOne({
          ...query,
        });

        if (surveys === null) {
          return res.json(
            errorRespSync({
              msg: `No surveys found for entity ${entityId}`,
            })
          );
        }

        const questions = surveys.survey.surveyQuestions;
        const stepSize = surveys.survey.questionForEachStep;
        let chunks = [];
        if (surveys.survey.isMultistep) {
          chunks = chunk(questions, stepSize);
        } else {
          chunks = chunk(questions, 0);
        }

        const jsonString = JSON.stringify(surveys, (key, value) => {
          // If the value is an object with a "parent" property, it's a circular reference
          if (key === "parent" && typeof value === "object" && value !== null) {
            return; // return undefined to remove the circular reference
          }
          return value; // return the original value for other properties
        });

        // Parse the JSON string back into an object
        response = JSON.parse(jsonString);
        response.survey.surveyQuestions = chunks;
      } else {
        // when only surveyId is provided
        include = [
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
              "status",
              [
                db.sequelize.literal(
                  `(SELECT count(*) from survey_questions WHERE surveyId = survey.id and isDisabled = 0)`
                ),
                "surveyQuestionsCount",
              ],
              [
                db.sequelize.literal(`(
                  SELECT COUNT(*) FROM survey_questions_response WHERE
                  userId = surveyUsersList.userId AND
                  surveyId = survey.id AND
                  deletedAt IS NULL
                )`),
                "surveyResponseCount",
              ],
            ],
            include: [
              {
                model: db.surveyQuestions,
                as: "surveyQuestions",
                required: false,
                where: { isDisabled: false, isNestedQuestion: false },
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
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            required: true,
          },
        ];
        let query = {
          where: { surveyId },
          include,
        };
        let surveys = await db.surveyUsersList.findOne({ ...query });
        const questions = surveys.survey.surveyQuestions;
        const stepSize = surveys.survey.questionForEachStep;
        let chunks = [];
        if (surveys.survey.isMultistep) {
          chunks = chunk(questions, stepSize);
        } else {
          chunks = chunk(questions, 0);
        }

        const jsonString = JSON.stringify(surveys, (key, value) => {
          // If the value is an object with a "parent" property, it's a circular reference
          if (key === "parent" && typeof value === "object" && value !== null) {
            return; // return undefined to remove the circular reference
          }
          return value; // return the original value for other properties
        });

        // Parse the JSON string back into an object
        response = JSON.parse(jsonString);
        response.survey.surveyQuestions = chunks;
      }
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: response,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /user/survey/start:
 *     post:
 *       summary: Start survey.
 *       description: Start survey.
 *       tags: [Survey-User]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *              example:
 *                      {
 *                        "status": "inprogress",
 *                        "surveyId": 1,
 *                       }
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully.",
 *                       "data": [
 *                          {
 *                                "id": 5,
 *                                "userId": 17,
 *                                "surveyId": 18,
 *                                "isDisabled": false,
 *                                "status": "active",
 *                                "startDate": null,
 *                                "createdAt": "2022-11-14T07:28:28.000Z",
 *                                "updatedAt": "2022-11-14T07:28:28.000Z",
 *                          }]}
 *
 */

router.post(
  "/start",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let { status, surveyId, farmId, surveyUserListId } = req.body;
      let set = {
        status,
        surveyUserListId,
        surveyId,
        userId,
        farmId: farmId ?? null,
        surveyStatus: true,
        startDate: moment(),
      };
      const survey = await db.surveysList.findOne({
        where: { id: surveyId },
        attributes: ["id", "linkedWithFarms"],
      });
      let entityWhere = {
        surveyId,
        surveyUserListId,
      };
      let farm = null;
      if (farmId) {
        farm = await db.user_farm.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [{ id: farmId }, { recordId: farmId }],
              },
              {
                [Op.or]: [{ userId: userId }, { technicianId: userId }],
              },
              { isDeleted: 0 },
            ],
          },
        });
        console.log(farm);
        if (farm) set.farmId = farm.id;
      }
      if (survey.dataValues.linkedWithFarms) {
        if (!set.farmId) {
          return res.json(
            errorRespSync({
              msg: "This is a Farm Based Survey. FarmId is required",
            })
          );
        }
        entityWhere.farmId = farm.id;
      }
      const existingOne = await db.surveyUserResponseEntityList.findOne({
        where: entityWhere,
      });

      if (existingOne) {
        if (survey.dataValues.linkedWithFarms) {
          const surveyUserResponse =
            await db.surveyUserResponseEntityList.create(set);
          return res.json(
            successRespSync({
              msg: success.FETCH,
              data: surveyUserResponse,
            })
          );
        } else {
          return res.json(
            errorRespSync({
              msg: "Survey Already Started",
            })
          );
        }
      } else {
        const surveyUserResponse = await db.surveyUserResponseEntityList.create(
          set
        );
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: surveyUserResponse,
          })
        );
      }
    } catch (error) {
      console.log(error);
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /user/survey/status/{id}:
 *     put:
 *       summary: Update survey.
 *       description: Update survey.
 *       tags: [Survey-User]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: number
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *              example:
 *                      {
 *                        "status": "inprogress",
 *                        "surveyId": 1,
 *                       }
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully.",
 *                       "data": [
 *                          {
 *                                "id": 5,
 *                                "userId": 17,
 *                                "surveyId": 18,
 *                                "isDisabled": false,
 *                                "status": "active",
 *                                "startDate": null,
 *                                "createdAt": "2022-11-14T07:28:28.000Z",
 *                                "updatedAt": "2022-11-14T07:28:28.000Z",
 *                          }]}
 *
 */

const submitSurvey = async (userId, id, body, res) => {
  try {
    let { status } = body;
    let set = { status };

    const surveyUserResponse = await db.surveyUserResponseEntityList.findOne({
      where: { uuid: id },
    });

    if (!surveyUserResponse) {
      return res.json(
        errorRespSync({
          msg: `Survey with ${id} not found`,
        })
      );
    }

    if (surveyUserResponse.status == "submitted")
      return res.json(
        errorRespSync({
          msg: "Submitted Survey cannot be updated",
        })
      );

    let where = {
      surveyId: surveyUserResponse.surveyId,
      userId,
      surveyUserResponseEntityId: id,
    };

    const existingOne = await db.surveyQuestionsResponse.findOne({
      where,
    });

    if (status === "submitted" && !existingOne)
      return res.json(
        errorRespSync({
          msg: "Survey cannot be submitted without any answer",
        })
      );

    // Adding Validation to Frontend of the application

    // if (status === "submitted") {
    //   const questions = await db.surveyQuestions.findAll({
    //     where: {
    //       surveyId: surveyUserResponse.surveyId,
    //     },
    //   });

    //   if (questions !== null) {
    //     try {
    //       await Promise.all(
    //         questions.map(async (question) => {
    //           if (question.mandatory) {
    //             let where = {
    //               questionId: question.id,
    //               userId: userId,
    //               surveyUserResponseEntityId: id,
    //             };

    //             const response = await db.surveyQuestionsResponse.findOne({
    //               where,
    //             });

    //             if (
    //               question.questionType === "radio" ||
    //               question.questionType === "checkbox"
    //             ) {
    //               if (!response.optionId) {
    //                 throw Error();
    //               }
    //             } else if (question.questionType.includes("dynamic")) {
    //               const dynamicFieldMap = {
    //                 dynamicFarmer: "farmId",
    //                 dynamicGeoFence: "geofenceId",
    //                 dynamicEquipment: "equipmentId",
    //                 dynamicCrop: "cropId",
    //               };

    //               if (!response[dynamicFieldMap[question.questionType]]) {
    //                 throw Error();
    //               }
    //             } else {
    //               if (!response.text) {
    //                 throw Error();
    //               }
    //             }
    //           }
    //         })
    //       );
    //     } catch (error) {
    //       return res.json(
    //         errorRespSync({
    //           msg: "Mandatory question needs to be answered",
    //         })
    //       );
    //     }
    //   }
    // }

    if (status === "submitted") {
      set.submittedDate = moment();
    }

    await db.surveyUserResponseEntityList.update(
      { ...set },
      { where: { uuid: id } }
    );

    const _surveyUserResponse = await db.surveyUserResponseEntityList.findOne({
      where: { uuid: id },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: _surveyUserResponse,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
};

router.put(
  "/status/:id",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    return submitSurvey(userId, id, req.body, res);
  }
);

/**
 * @swagger
 * /user/survey/question/{surveyId}/{surveyUserResponseEntityId}:
 *     post:
 *       summary: Answer the survey question.
 *       description: Answer the survey question.
 *       tags: [Survey-User]
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
 *         - in: path
 *           name: surveyUserResponseEntityId
 *           required: true
 *           schema:
 *             type: number
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *              example:
 *                      {
 *                        "questionId": 123,
 *                        "optionId": 123,
 *                         "text": "Only if question type is answerable"
 *                       }
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully." }
 *
 */

router.post(
  "/question/:surveyId",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const loggedInUserId = req.user.id;
      const { surveyId } = req.params;

      let {
        options,
        recordId,
        surveyEntityId: surveyUserResponseEntityId,
        farmId,
        surveyUserListId,
        shouldSubmit,
        farmerId,
      } = req.body;

      const userId = farmerId ? farmerId : loggedInUserId;

      let surveyEntity = await db.surveyUserResponseEntityList.findOne({
        where: { uuid: surveyUserResponseEntityId },
      });

      if (!surveyEntity) {
        let farm = null;
        if (farmId) {
          farm = await db.user_farm.findOne({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [{ id: farmId }, { recordId: farmId }],
                },
                {
                  [Op.or]: [{ userId: userId }, { technicianId: userId }],
                },
                { isDeleted: 0 },
              ],
            },
          });
        }
        surveyEntity = await db.surveyUserResponseEntityList.create({
          status: "inprogress",
          uuid: surveyUserResponseEntityId,
          surveyUserListId,
          surveyId,
          userId,
          farmId: farmId ? farm.id : null,
          surveyStatus: !shouldSubmit,
          startDate: moment(),
        });
      } else {
        if (surveyEntity.dataValues.status === "submitted")
          return res.json(
            errorRespSync({
              msg: "This survey has already been submitted",
            })
          );
      }

      // Before processing the new response, delete any previous response for the question
      // that is not included in the current submission, including nested responses
      await db.surveyQuestionsResponse.destroy({
        where: {
          surveyId,
          userId,
          questionId: { [Op.in]: options.map((option) => option.questionId) },
          surveyUserResponseEntityId,
        },
        force: true,
        transaction,
      });

      let responseSet = [];
      options.map((element) => {
        const {
          questionId,
          optionId,
          text,
          farmId,
          geofenceId,
          equipmentId,
          cropId,
        } = element;

        responseSet.push({
          surveyUserResponseEntityId,
          surveyId,
          userId,
          questionId,
          optionId: +optionId === 0 ? null : optionId,
          text,
          farmId: +farmId === 0 ? null : farmId,
          geofenceId: +geofenceId === 0 ? null : geofenceId,
          equipmentId: +equipmentId === 0 ? null : equipmentId,
          cropId: +cropId === 0 ? null : cropId,
          submittedBy: loggedInUserId,
        });
      });
      // Since we've already deleted previous responses, we can directly insert the new response
      const responseData = await db.surveyQuestionsResponse.bulkCreate(
        responseSet,
        { transaction }
      );

      await transaction.commit();

      if (shouldSubmit) {
        return submitSurvey(
          userId,
          surveyUserResponseEntityId,
          {
            status: "submitted",
            recordId: surveyUserResponseEntityId,
          },
          res
        );
      }

      return res.json(
        successRespSync({
          msg: "Success",
          data: {
            response: responseData,
            recordId,
          },
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
 * /user/survey/response/{id}:
 *     get:
 *       summary: Get survey response.
 *       description: Get survey response.
 *       tags: [Survey-User]
 *       parameters:
 *         - in: header
 *           name: oauth-token
 *           required: true
 *           schema:
 *             type: string
 *         - in: path
 *           name: id
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
 *                   example: {
 *                       "success": true,
 *                       "code": 200,
 *                       "message": "Fetched successfully.",
 *                       "data": [
 *                          {
 *                                "id": 5,
 *                                "userId": 17,
 *                                "surveyId": 18,
 *                                "isDisabled": false,
 *                                "status": "active",
 *                                "startDate": null,
 *                                "createdAt": "2022-11-14T07:28:28.000Z",
 *                                "updatedAt": "2022-11-14T07:28:28.000Z",
 *                                "survey": { "id": 1, "title": "Test", "description": "test", "surveyQuestions": [] }
 *                          }]}
 *
 */

router.get(
  "/response/:id",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
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
              required: false,
              where: { isDisabled: false },
              include: [
                {
                  model: db.surveyQuestionsResponse,
                  as: "surveyQuestionsResponse",
                  where: { surveyUserResponseEntityId: id },
                  required: false,
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
                          as: "farms",
                        },
                      ],
                    },
                    {
                      model: db.user,
                      as: "farm",
                      attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "middleName",
                        "fullName",
                      ],
                    },
                    {
                      model: db.Equipment,
                      as: "equipment",
                      attributes: ["id", ["displayName", "name"]],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      let query = {
        where,
        include,
      };
      let surveys = await db.surveyUserResponseEntityList.findOne({ ...query });
      let questions = surveys?.survey?.surveyQuestions;
      questions?.sort((a, b) => a.id - b.id);

      const stepSize = surveys?.survey?.questionForEachStep;
      let chunks = [];
      if (surveys?.survey?.isMultistep) {
        chunks = chunk(questions, stepSize);
      } else {
        chunks = chunk(questions, 0);
      }

      const jsonString = JSON.stringify(surveys, (key, value) => {
        // If the value is an object with a "parent" property, it's a circular reference
        if (key === "parent" && typeof value === "object" && value !== null) {
          return; // return undefined to remove the circular reference
        }
        return value; // return the original value for other properties
      });

      // Parse the JSON string back into an object
      const response = JSON.parse(jsonString);
      response.survey.surveyQuestions = chunks;
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: response,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

router.get("/response/download/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { type } = req.query;
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
                        as: "farms",
                      },
                    ],
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
                      "lastName",
                      "middleName",
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
    // return res.json(
    //   successRespSync({
    //     msg: success.FETCH,
    //     data: {
    //       result: surveys,
    //     },
    //   })
    // );
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
          answer = answerArray
            .map((r) => {
              return r.geofence.geofenceName
                ? `${r.geofence.farms.farmName} - ${r.geofence.geofenceName}`
                : `Geofence #${r.geofence.id}`;
            })
            .join(", ");
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
    const workbook = xlsx.utils.book_new();
    const surveyResponseSheet = xlsx.utils.json_to_sheet(surveyRes);
    xlsx.utils.book_append_sheet(workbook, surveyResponseSheet);
    var readStream = new stream.PassThrough();
    if (type === "csv") {
      let csvBuffer = xlsx.write(workbook, { type: "buffer", bookType: "csv" });
      res.set(
        "Content-disposition",
        "attachment; filename=" + "surveyResponse.csv"
      );
      res.set("Content-Type", "text/csv");
      readStream.end(csvBuffer);
      readStream.pipe(res);
      return;
    }
    if (type === "xlsx") {
      let csvBuffer = xlsx.write(workbook, { type: "buffer" });
      res.set(
        "Content-disposition",
        "attachment; filename=" + "surveyResponse.xlsx"
      );
      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      readStream.end(csvBuffer);
      readStream.pipe(res);
      return;
    }
    if (type === "pdf") {
      // TODO: need to show score even if one quesion has score enabled
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
    }
  } catch (error) {
    return serverError(res, error);
  }
});

router.get(
  "/individual/:id",
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      let where = { surveyId: id, userId };
      let include = [
        {
          model: db.surveysList,
          as: "survey",
          attributes: [
            "id",
            "title",
            "description",
            "linkedWithFarms",
            "status",
          ],
          required: true,
        },
        {
          model: db.user,
          as: "users",
          attributes: ["id"],
          required: false,
          include: [
            {
              model: db.user_farm,
              as: "farms",
              attributes: ["id"],
              required: false,
            },
          ],
        },
        {
          model: db.surveyUserResponseEntityList,
          as: "surveyEntity",
          attributes: [
            "id",
            "status",
            "surveyId",
            "surveyUserListId",
            "farmId",
            "surveyStatus",
          ],
          required: false,
        },
      ];

      let query = {
        where,
        include,
      };
      const survey = await db.surveyUsersList.findOne({ ...query });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: survey,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

module.exports = router;
