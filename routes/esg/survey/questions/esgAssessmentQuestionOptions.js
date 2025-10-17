const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth.js');
const translationMiddleware = require('../../../../middleware/translation/translationEngine.js');
const {assessmentQuestionOptionConfig} = require('../../../../middleware/translation/configs/assessmentQuestionConfig.js');
const esgAssessmentQuestionOptionController = require('../../../../controllers/esg/survey/questions/esgAssessmentQuestionOptionsController');

/** 
 * @swagger
 * /api/esg-question-options:
 *   post:
 *     summary: Create a new ESG Assessment Question Option
 *     description: Adds a new ESG assessment question option to the database
 *     tags: [ESG Assessment Question Options]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label, esgAssessmentQuestionId, orgId, createdBy]
 *             properties:
 *               label:
 *                 type: string
 *                 example: "Strongly Agree"
 *               score:
 *                 type: integer
 *                 example: 10
 *               recommendation:
 *                 type: string
 *                 example: "This is a good choice for sustainability compliance."
 *               isDimitraModulesEnabled:
 *                 type: boolean
 *                 example: false
 *               isActionPlanEnabled:
 *                 type: boolean
 *                 example: true
 *               isGetDataEnabled:
 *                 type: boolean
 *                 example: true
 *               isRecommendationEnabled:
 *                 type: boolean
 *                 example: true
 *               actionPlanScore:
 *                 type: integer
 *                 example: 20
 *               getDataScore:
 *                 type: integer
 *                 example: 15
 *               esgAssessmentQuestionId:
 *                 type: string
 *                 example: "60d9f1a9c45b0c0045c9b3c2"
 *               orgId:
 *                 type: integer
 *                 example: 101
 *               createdBy:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: ESG Assessment Question Option created successfully
 *       400:
 *         description: Validation error
 */
router.post('/',
    auth,
    translationMiddleware(assessmentQuestionOptionConfig, ['esg', 'survey', 'question', 'option']),
    esgAssessmentQuestionOptionController.createQuestionOption);

/** 
 * @swagger
 * /api/esg-question-options:
 *   get:
 *     summary: Get all ESG Assessment Question Options
 *     description: Fetches all ESG assessment question options from the database
 *     tags: [ESG Assessment Question Options]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of question options
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth, esgAssessmentQuestionOptionController.getAllQuestionOptions);

/** 
 * @swagger
 * /api/esg-question-options/{id}:
 *   get:
 *     summary: Get a single ESG Assessment Question Option by ID
 *     description: Fetches an ESG assessment question option based on ID
 *     tags: [ESG Assessment Question Options]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG assessment question option
 *       404:
 *         description: Question option not found
 */
router.get('/:id', auth, esgAssessmentQuestionOptionController.getQuestionOptionById);

/** 
 * @swagger
 * /api/esg-question-options/{id}:
 *   put:
 *     summary: Update an ESG Assessment Question Option along with related GetData and Action Plans
 *     description: Updates an ESG assessment question option based on ID and cascades updates to related GetData and Action Plans
 *     tags: [ESG Assessment Question Options]
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
 *         description: Question option updated successfully
 *       404:
 *         description: Question option not found
 */
router.put('/:id', auth, esgAssessmentQuestionOptionController.updateQuestionOption);

/** 
 * @swagger
 * /api/esg-question-options/{id}:
 *   delete:
 *     summary: Delete an ESG Assessment Question Option along with related GetData and Action Plans
 *     description: Soft deletes an ESG assessment question option and cascades delete to related GetData and Action Plans
 *     tags: [ESG Assessment Question Options]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question option deleted successfully
 *       404:
 *         description: Question option not found
 */
router.delete('/:id', auth, esgAssessmentQuestionOptionController.deleteQuestionOption);

module.exports = router;