const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth.js');
const translationMiddleware = require('../../../../middleware/translation/translationEngine.js');
const {assessmentGetDataConfig} = require('../../../../middleware/translation/configs/assessmentQuestionConfig.js');
const esgGetDataQuestionController = require('../../../../controllers/esg/survey/questions/esgGetDataQuestionController.js');

/** 
 * @swagger
 * /api/esg-get-data:
 *   post:
 *     summary: Create a new Get Data Question
 *     description: Adds a new ESG Get Data question to the database
 *     tags: [ESG Get Data Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dataType, title, esgAssessmentQuestionId, orgId, createdBy]
 *             properties:
 *               dataType:
 *                 type: string
 *                 enum: ["text-field", "text-area", "numeric", "radio-button", "check-boxes", "measurement-unit", "attach-file", "digital-signature"]
 *                 example: "measurement-unit"
 *               title:
 *                 type: string
 *                 example: "Water Units Consumed"
 *               isMandatory:
 *                 type: boolean
 *                 example: true
 *               esgAssessmentQuestionId:
 *                 type: string
 *                 example: "60d9f1a9c45b0c0045c9b3c2"
 *               helpText:
 *                 type: string
 *                 example: "Select the appropriate measurement unit."
 *               additionalSettings:
 *                 type: object
 *                 example: { "unitCategory": "Volume", "unitType": "Liter", "allowChange": false }
 *               orgId:
 *                 type: integer
 *                 example: 101
 *               createdBy:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Get Data Question created successfully
 *       400:
 *         description: Validation error
 */
router.post('/',
    auth,
    translationMiddleware(assessmentGetDataConfig, ['esg', 'survey', 'question', 'option', 'get data']),
    esgGetDataQuestionController.createGetDataQuestion);


/** 
 * @swagger
 * /api/esg-get-data:
 *   get:
 *     summary: Get all ESG Get Data Questions
 *     description: Fetches all ESG Get Data questions from the database
 *     tags: [ESG Get Data Questions]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of Get Data Questions
 *       500:
 *         description: Internal Server Error
 */
router.get('/',auth, esgGetDataQuestionController.getAllGetDataQuestions);

/** 
 * @swagger
 * /api/esg-get-data/{id}:
 *   get:
 *     summary: Get a single ESG Get Data Question by ID
 *     description: Fetches an ESG Get Data question based on ID
 *     tags: [ESG Get Data Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG Get Data Question
 *       404:
 *         description: Get Data Question not found
 */
router.get('/:id', auth, esgGetDataQuestionController.getGetDataQuestionById);

/** 
 * @swagger
 * /api/esg-get-data/{id}:
 *   put:
 *     summary: Update an ESG Get Data Question
 *     description: Updates an ESG Get Data question based on ID
 *     tags: [ESG Get Data Questions]
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
 *         description: Get Data Question updated successfully
 *       404:
 *         description: Get Data Question not found
 */
router.put('/:id',
    auth,
    translationMiddleware(assessmentGetDataConfig, ['esg', 'survey', 'question', 'option', 'get data']),
    esgGetDataQuestionController.updateGetDataQuestion);


/** 
 * @swagger
 * /api/esg-get-data/{id}:
 *   delete:
 *     summary: Delete an ESG Get Data Question
 *     description: Deletes an ESG Get Data question based on ID
 *     tags: [ESG Get Data Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get Data Question deleted successfully
 *       404:
 *         description: Get Data Question not found
 */
router.delete('/:id', auth, esgGetDataQuestionController.deleteGetDataQuestion);

module.exports = router;