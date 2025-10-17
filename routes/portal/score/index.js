const { default: axios } = require('axios');
const { Router } = require('express');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const userScoreRouter = Router();
const scoringApiInstance = axios.create({
  baseURL: process.env.SCORING_API_BASEURL || 'https://land-score-api-prod.dimitra.dev/',
});

/**
 * @swagger
 * /portal/user-scores/{userId}:
 *   get:
 *     summary: Get Score of User if User have completed the survey
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: userId
 *        required: true
 *        description: ID of User
 *        schema:
 *          type: integer
 *          example: 1
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
 *                       userScore:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           score:
 *                             type: string
 *                           metadata:
 *                             type: object
 *                           userId:
 *                             type: integer
 *                             example: 1
 */
userScoreRouter.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userScore = await db.UserScore.findOne({
      where: {
        userId,
      },
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          userScore,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

function getQuestionResponses(question, userScoreResponses, responses = []) {
  const userScoreResponse = userScoreResponses.find(
    (res) => res.questionId.toString() === question.questionId.toString()
  );
  if (userScoreResponse) {
    const response = {
      question: question.question,
      questionId: question.questionId,
      required: question.required,
      answerDataType: question.answerDataType,
    };
    if (question.options && Array.isArray(question.options)) {
      const selectedOption = question.options.find(
        (option) => option.answerId.toString() === userScoreResponse.answerIdOrValue.toString()
      );
      if (selectedOption) {
        response.answer = selectedOption.answer;
        response.answerId = selectedOption.answerId;
        responses.push(response);
      }
    } else {
      response.answer =
        question.answerDataType === 'number'
          ? Number(userScoreResponse.answerIdOrValue)
          : userScoreResponse.answerIdOrValue.toString();
      responses.push(response);
    }
  }

  if (question.childQuestions && Array.isArray(question.childQuestions)) {
    for (const childQuestion of question.childQuestions) {
      getQuestionResponses(childQuestion, userScoreResponses, responses);
    }
  }

  return responses;
}

/**
 * @swagger
 * /portal/user-scores/{userId}/responses:
 *   get:
 *     summary: Get responses of User for the survey
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: userId
 *        required: true
 *        description: ID of User
 *        schema:
 *          type: integer
 *          example: 1
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
 *                       score:
 *                         type: string
 *                       metadata:
 *                         type: object
 *                       responses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             question:
 *                               type: string
 *                             questionId:
 *                               type: string
 *                             required:
 *                               type: boolean
 *                             answerDataType:
 *                               type: string
 *                               enum: ['string', 'number']
 *                             answer:
 *                               oneOf:
 *                                 - type: string
 *                                 - type: number
 *                             topicName:
 *                               type: string
 */
userScoreRouter.get('/:userId/responses', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userScore = await db.UserScore.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: db.UserScoreSurveyResponse,
          as: 'responses',
        },
      ],
    });

    if (!userScore) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: 404,
          data: userId,
        })
      );
    }

    const result = await scoringApiInstance.get('/get-farmer-survey-questions');
    const topics = result.data.questions;
    const userScoreResponses = userScore.responses;

    const responses = [];
    for (const topic of topics) {
      for (const question of topic.questions) {
        const questionResponses = getQuestionResponses(question, userScoreResponses).map((response) => ({
          ...response,
          topicName: topic.topicName,
        }));
        responses.push(...questionResponses);
      }
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          responses,
          score: userScore.score,
          metadata: userScore.metadata,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = userScoreRouter;
