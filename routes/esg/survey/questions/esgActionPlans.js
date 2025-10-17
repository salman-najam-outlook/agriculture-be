const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth.js');
const translationMiddleware = require('../../../../middleware/translation/translationEngine.js');
const esgActionPlanController = require('../../../../controllers/esg/survey/questions/esgActionPlanController.js');
const {assessmentActionPlanConfig} = require('../../../../middleware/translation/configs/assessmentQuestionConfig.js');

/** 
 * @swagger
 * /api/esg-action-plans:
 *   post:
 *     summary: Create a new ESG Action Plan
 *     description: Adds a new ESG Action Plan to the database
 *     tags: [ESG Action Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, esgAssessmentQuestionId, orgId, createdBy]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Reduce carbon footprint"
 *               isFileRequired:
 *                 type: boolean
 *                 example: true
 *               esgAssessmentQuestionId:
 *                 type: string
 *                 example: "60d9f1a9c45b0c0045c9b3c2"
 *               esgAssessmentQuestionOptionId:
 *                 type: string
 *                 example: "60d9f1a9c45b0c0045c9b3d5"
 *               orgId:
 *                 type: integer
 *                 example: 101
 *               createdBy:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: ESG Action Plan created successfully
 *       400:
 *         description: Validation error
 */
router.post('/',
    auth,
    translationMiddleware(assessmentActionPlanConfig, ['esg', 'survey', 'question', 'option', 'action plan']),
    esgActionPlanController.createActionPlan);

/** 
 * @swagger
 * /api/esg-action-plans:
 *   get:
 *     summary: Get all ESG Action Plans
 *     description: Fetches all ESG Action Plans from the database
 *     tags: [ESG Action Plans]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of ESG Action Plans
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth, esgActionPlanController.getAllActionPlans);

/** 
 * @swagger
 * /api/esg-action-plans/{id}:
 *   get:
 *     summary: Get a single ESG Action Plan by ID
 *     description: Fetches an ESG Action Plan based on ID
 *     tags: [ESG Action Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG Action Plan
 *       404:
 *         description: Action Plan not found
 */
router.get('/:id', auth, esgActionPlanController.getActionPlanById);

/** 
 * @swagger
 * /api/esg-action-plans/{id}:
 *   put:
 *     summary: Update an ESG Action Plan
 *     description: Updates an ESG Action Plan based on ID
 *     tags: [ESG Action Plans]
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
 *         description: Action Plan updated successfully
 *       404:
 *         description: Action Plan not found
 */
router.put('/:id',
    auth,
    translationMiddleware(assessmentActionPlanConfig, ['esg', 'survey', 'question', 'option', 'action plan']),
    esgActionPlanController.updateActionPlan);

/** 
 * @swagger
 * /api/esg-action-plans/{id}:
 *   delete:
 *     summary: Delete an ESG Action Plan
 *     description: Soft deletes an ESG Action Plan based on ID
 *     tags: [ESG Action Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action Plan deleted successfully
 *       404:
 *         description: Action Plan not found
 */
router.delete('/:id', auth, esgActionPlanController.deleteActionPlan);

module.exports = router;