const { default: axios } = require('axios');
const { Router } = require('express');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const translation = require(rootPath + '/middleware/translation');

const scoringRouter = Router();
const scoringApiInstance = axios.create({
  baseURL: process.env.SCORING_API_BASEURL || 'https://land-score-api-prod.dimitra.dev/',
});

function translateQuestions(questions, translateFn) {
  if (Array.isArray(questions)) {
    for (const question of questions) {
      // Translate question name
      if (typeof question.question === 'string') {
        question.question = translateFn(question.question);
      }

      if (typeof question.placeholder === 'string') {
        question.placeholder = translateFn(question.placeholder);
      }

      // Translate question options
      if (Array.isArray(question.options)) {
        for (const option of question.options) {
          if (typeof option.answer === 'string') {
            option.answer = translateFn(option.answer);
          }
        }
      }

      // Translate child questions
      translateQuestions(question.childQuestions, translateFn);
    }
  }
}

function translateQuestionGroups(questionGroups, translateFn) {
  if (!Array.isArray(questionGroups)) return;
  for (const questionGroup of questionGroups) {
    if (typeof questionGroup.topicName === 'string') {
      questionGroup.topicName = translateFn(questionGroup.topicName);
    }
    translateQuestions(questionGroup.questions, translateFn);
  }
}

/**
 * @swagger
 * /user/scoring/questions:
 *   get:
 *     summary: Get List of Scoring Questions
 *     tags: [Farmer-Scoring]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         questions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               answerDataType:
 *                                 type: string
 *                                 enum: ["string", "number"]
 *                               question:
 *                                 type: string
 *                               questionId:
 *                                 type: string
 *                               required:
 *                                 type: boolean
 *                               options:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     answer:
 *                                       type: string
 *                                     answerId:
 *                                       type: number
 *                               childQuestions:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     answerDataType:
 *                                       type: string
 *                                       enum: ["string", "number"]
 *                                     question:
 *                                       type: string
 *                                     questionId:
 *                                       type: string
 *                                     required:
 *                                       type: boolean
 *                                     options:
 *                                       type: array
 *                                       items:
 *                                         type: object
 *                                         properties:
 *                                           answer:
 *                                             type: string
 *                                           answerId:
 *                                             type: number
 */
scoringRouter.get('/questions', auth, translation, async (req, res) => {
  try {
    const result = await scoringApiInstance.get('/get-farmer-survey-questions');
    if (req.headers.lang && req.headers.lang != 'en') {
      translateQuestionGroups(result.data.questions, req.simpleTranslate);
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result.data.questions,
      })
    );
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return res.json(
        errorRespSync({
          code: err.response.status,
          msg: err.response.data?.message ?? err.message,
          data: err.response.data,
        })
      );
    }
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/scoring/status:
 *   get:
 *     summary: Get Completed Status of Scoring Survey for Current User
 *     tags: [Farmer-Scoring]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       hasCompleted:
 *                         type: boolean
 *                       score:
 *                         type: string
 *                         nullable: true
 */
scoringRouter.get('/status', auth, async (req, res) => {
  try {
    const userScore = await db.UserScore.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const data = {
      hasCompleted: !!userScore,
    };

    if (userScore) {
      data.score = userScore.score;
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /user/scoring:
 *   post:
 *     summary: Submit Scoring Survey for Current User
 *     tags: [Farmer-Scoring]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              questionAnswer:
 *                type: object
 *                example: {"q1":3,"q2":1,"q3":5,"q4":3,"q5":3,"q6":1,"q7":2,"q8":2,"q9":2,"q10":4,"q11":5,"q12":2,"q13":1,"q14":1,"q15":1,"q16":1,"q17":1,"q18":4}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       userId:
 *                         type: number
 *                       score:
 *                         type: string
 */
scoringRouter.post('/', auth, async (req, res) => {
  try {
    const user = req.user;

    let userScore = await db.UserScore.findOne({
      where: {
        userId: user.id,
      },
    });

    if (userScore) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.ALREADY_EXISTS,
          data: userScore,
        })
      );
    }

    const responseInput = req.body.questionAnswer;
    const result = await scoringApiInstance.post('/get-farmer-score', responseInput);

    if (!result.data.success) {
      return res.json(
        errorRespSync({
          code: result.status,
          msg: result.data?.message,
          data: result.data,
        })
      );
    }

    const responsesData = Object.keys(responseInput).map((questionId) => ({
      questionId,
      answerIdOrValue: responseInput[questionId],
    }));

    userScore = await db.UserScore.create(
      {
        userId: user.id,
        score: result.data.score,
        responses: responsesData,
        metadata:
          result.data.topic_scores && typeof result.data.topic_scores === 'object'
            ? {
                topic_scores: result.data.topic_scores,
              }
            : null,
      },
      {
        include: [
          {
            model: db.UserScoreSurveyResponse,
            as: 'responses',
          },
        ],
      }
    );

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: userScore,
      })
    );
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return res.json(
        errorRespSync({
          code: err.response.status,
          msg: err.response.data?.message ?? err.message,
          data: err.response.data,
        })
      );
    }
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = scoringRouter;
