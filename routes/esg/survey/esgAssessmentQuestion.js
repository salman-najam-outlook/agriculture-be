const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth.js');
const translationMiddleware = require('../../../middleware/translation/translationEngine.js');
const translationResponseMiddleware = require('../../../middleware/translation/translationResponseMiddleware.js');
const { assessmentQuestionConfig } = require('../../../middleware/translation/configs/assessmentQuestionConfig.js');
const esgAssessmentQuestionController = require('../../..//controllers/esg/survey/esgAssessmentQuestionController.js');



/** 
 * @swagger
 * /api/esg-assessment-questions:
 *   post:
 *     summary: Create a new ESG Assessment Question
 *     description: Adds a new ESG assessment question
 *     tags: [ESG Assessment Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [esgAssessmentId, esgHeadingId, title, questionType, respondentType, orgId, createdBy, order]
 *             properties:
 *               esgAssessmentId:
 *                 type: string
 *               esgHeadingId:
 *                 type: string
 *               order:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *               title:
 *                 type: string
 *               questionType:
 *                 type: string
 *               isMandatory:
 *                 type: boolean
 *               respondentType:
 *                 type: string
 *               orgId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: ESG Assessment Question created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', auth, esgAssessmentQuestionController.createQuestion);

/** 
 * @swagger
 * /api/esg-assessment-questions:
 *   get:
 *     summary: Get all ESG Assessment Questions
 *     description: Fetches all ESG assessment questions, excluding soft-deleted ones
 *     tags: [ESG Assessment Questions]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of questions
 *       500:
 *         description: Internal Server Error
 */
router.get('/',auth, esgAssessmentQuestionController.getAllQuestions);

/** 
 * @swagger
 * /api/esg-assessment-questions/{id}:
 *   get:
 *     summary: Get a single ESG Assessment Question by ID
 *     description: Fetches an ESG assessment question based on ID
 *     tags: [ESG Assessment Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG Assessment Question
 *       404:
 *         description: Assessment Question not found
 */
router.get('/:id',
    auth,
    esgAssessmentQuestionController.getQuestionById,
    translationResponseMiddleware(assessmentQuestionConfig));

/** 
 * @swagger
 * /api/esg-assessment-questions/{id}:
 *   put:
 *     summary: Update an ESG Assessment Question
 *     description: Updates an ESG assessment question details
 *     tags: [ESG Assessment Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Assessment Question updated successfully
 *       404:
 *         description: Assessment Question not found
 */
router.put('/:id',
    auth,
    translationMiddleware(assessmentQuestionConfig, ['esg', 'survey', 'question']),
    esgAssessmentQuestionController.updateQuestion);

/** 
 * @swagger
 * /api/esg-assessment-questions/{id}:
 *   delete:
 *     summary: Delete an ESG Assessment Question
 *     description: Soft deletes an ESG assessment question and all its related data
 *     tags: [ESG Assessment Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment Question deleted successfully
 *       404:
 *         description: Assessment Question not found
 */
router.delete('/:id', auth, esgAssessmentQuestionController.deleteQuestion);

/**
 * @swagger
 * /api/esg/assessments/questions/submit:
 *   post:
 *     summary: Submit a complete ESG Assessment Question
 *     description: Creates a new ESG assessment question along with its options, GetData fields, and updates assessment count.
 *     tags: [ESG Assessment Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionData]
 *             properties:
 *               questionData:
 *                 type: object
 *                 description: Base assessment question data.
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Array of options linked to the question.
 *               getDataFields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Array of GetData fields linked to the question.
 *     responses:
 *       201:
 *         description: Successfully created question and linked data
 *       400:
 *         description: Bad request, validation errors
 *       500:
 *         description: Internal server error
 */
router.post("/submit",
    auth,
    translationMiddleware(assessmentQuestionConfig, ['esg', 'survey', 'question']),
    esgAssessmentQuestionController.submitAssessmentQuestion);

module.exports = router;