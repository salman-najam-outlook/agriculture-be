const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth.js');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const translationMiddleware = require('../../../middleware/translation/translationEngine.js');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');
const translationResponseMiddleware = require('../../../middleware/translation/translationResponseMiddleware.js');
const esgAssessmentQuestionHeadingService = require('../../../services/esg/survey/esgAssessmentQuestionHeadingService.js');
const { assessmentQuestionHeadingConfig } = require('../../../middleware/translation/configs/assessmentQuestionConfig.js');

/** 
 * @swagger
 * /api/esg-assessment-question-headings:
 *   post:
 *     summary: Create a new ESG Assessment Question Heading
 *     description: Adds a new question heading linked to an assessment
 *     tags: [ESG Assessment Question Headings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, esgAssessmentId, createdBy, orgId, order]
 *             properties:
 *               esgAssessmentId:
 *                 type: string
 *                 example: "65f8ab9a5c1d2f001c8f7c50"
 *               title:
 *                 type: string
 *                 example: "Water Usage Policies"
 *               order:
 *                 type: number
 *                 example: 1
 *               createdBy:
 *                 type: number
 *                 example: 5
 *               orgId:
 *                 type: number
 *                 example: 101
 *     responses:
 *       201:
 *         description: ESG Assessment Question Heading created successfully
 *       400:
 *         description: Validation error
 */
router.post('/',
    auth,
    translationMiddleware(assessmentQuestionHeadingConfig, ['esg', 'survey', 'question heading']),
    async (req, res) => {
    try {
        const newHeading = await esgAssessmentQuestionHeadingService.createQuestionHeading(req.body);
        return res.status(201).json(
            await successRespSync({
                msg: success.CREATED,
                data: newHeading,
                statusCode: 201
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/** 
 * @swagger
 * /api/esg-assessment-question-headings:
 *   get:
 *     summary: Get all ESG Assessment Question Headings
 *     description: Fetches all question headings
 *     tags: [ESG Assessment Question Headings]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of ESG Assessment Question Headings
 *       500:
 *         description: Internal Server Error
 */
router.get('/',auth, async (req, res) => {
    try {
        const headings = await esgAssessmentQuestionHeadingService.getAllQuestionHeadings();
        return res.json(await successResp({ msg: success.FETCH, data: headings }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/** 
 * @swagger
 * /api/esg-assessment-question-headings/{id}:
 *   get:
 *     summary: Get a single ESG Assessment Question Heading by ID
 *     description: Fetches a question heading based on ID
 *     tags: [ESG Assessment Question Headings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ESG Assessment Question Heading
 *       404:
 *         description: Heading not found
 */
router.get('/:id', auth, async (req, res, next) => {
    try {
        const heading = await esgAssessmentQuestionHeadingService.getQuestionHeadingById(req.params.id);
        if (!heading) {
            return res.status(404).json(await errorResp({ msg: error.NOT_FOUND, code: 404 }));
        }
        res.locals.data = heading;
        next();
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
},
    translationResponseMiddleware(assessmentQuestionHeadingConfig)
);

/** 
 * @swagger
 * /api/esg-assessment-question-headings/{id}:
 *   put:
 *     summary: Update an ESG Assessment Question Heading
 *     description: Updates a question heading based on ID
 *     tags: [ESG Assessment Question Headings]
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
 *         description: Question heading updated successfully
 *       404:
 *         description: Heading not found
 */
router.put('/:id',
    auth,
    translationMiddleware(assessmentQuestionHeadingConfig,  ['esg', 'survey', 'question heading']),
    async (req, res) => {
    try {
        const updatedHeading = await esgAssessmentQuestionHeadingService.updateQuestionHeading(req.params.id, req.body);
        if (!updatedHeading) {
            return res.status(404).json(await errorResp({ msg: error.NOT_FOUND, code: 404 }));
        }
        return res.json(await successResp({ msg: success.UPDATED, data: updatedHeading, code: 201 }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});

/** 
 * @swagger
 * /api/esg-assessment-question-headings/{id}:
 *   delete:
 *     summary: Delete an ESG Assessment Question Heading
 *     description: Deletes a question heading based on ID
 *     tags: [ESG Assessment Question Headings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question heading deleted successfully
 *       404:
 *         description: Heading not found
 */
router.delete('/:id',auth, async (req, res) => {
    try {
        const deletedHeading = await esgAssessmentQuestionHeadingService.deleteQuestionHeading(req.params.id);
        if (!deletedHeading) {
            return res.status(404).json(await errorResp({ msg: error.NOT_FOUND, code: 404 }));
        }
        return res.json(await successRespSync({ msg: success.DELETED }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
});



module.exports = router;