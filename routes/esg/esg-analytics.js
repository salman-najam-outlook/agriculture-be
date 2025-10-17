const express = require('express');
const auth = require('../../middleware/auth');
const { getEsgProgressOfRespondentForProtocolRouteHandler, getEsgRecommendationOfRespondentForProtocolRouteHandler, getRecommendedUsersOfSubOrganizationByOptionIdRouteHandler, updateEsgProtocolResponseStatusHandler} = require('../../controllers/admin/esg/esg-analytics');

const router = express.Router();
const translationResponseMiddleware = require('../../middleware/translation/translationResponseMiddleware');
const { esgProgressOfRespondentConfig } = require('../../middleware/translation/configs/esgAnalyticsConfig');


/**
 * @swagger
 * /admin/esg/analytics/{esgProtocolId}/{submittedByType}/{submittedById}:
 *   get:
 *     summary: Get an ESG Protocol Analytic for a respondent
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to retrieve
 *       - in: path
 *         name: submittedByType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of respondent (e.g., "sub-organization", "supplier", "farmer")
 *       - in: path
 *         name: submittedById
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the respondent
 *       - in: query
 *         name: includeFarmerAndSupplier
 *         schema:
 *           type: boolean
 *         description: Include farmer and supplier progress in the response
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: ESG Protocol retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Fetched successfully"
 *                 data:
 *                   type: object
 */
router.get('/:esgProtocolId/:submittedByType/:submittedById', auth, getEsgProgressOfRespondentForProtocolRouteHandler, translationResponseMiddleware(esgProgressOfRespondentConfig));

router.post('/:esgProtocolId/:submittedByType/:submittedById/updateStatus', auth, updateEsgProtocolResponseStatusHandler);

/**
 * @swagger
 * /admin/esg/analytics/{esgProtocolId}/{submittedByType}/{submittedById}/recommendations:
 *   get:
 *     summary: Get an ESG Protocol recommendation for a respondent
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to retrieve
 *       - in: path
 *         name: submittedByType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of respondent (e.g., "sub-organization", "supplier", "farmer")
 *       - in: path
 *         name: submittedById
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the respondent
 *       - in: query
 *         name: includeFarmerAndSupplier
 *         schema:
 *           type: boolean
 *         description: Include farmer and supplier progress in the response
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: ESG Protocol retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Fetched successfully"
 *                 data:
 *                   type: object
 */
router.get('/:esgProtocolId/:submittedByType/:submittedById/recommendations', auth, getEsgRecommendationOfRespondentForProtocolRouteHandler);

/**
 * @swagger
 * /admin/esg/analytics/{esgProtocolId}/sub-organization/{subOrganizationId}/recommendations/{questionOptionId}/users:
 *   get:
 *     summary: Get an ESG Protocol Recommended Users by Option ID
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to retrieve
 *       - in: path
 *         name: subOrganizationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the sub organization
 *       - in: path
 *         name: questionOptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Question option
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: ESG Protocol retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Fetched successfully"
 *                 data:
 *                   type: object
 */
router.get('/:esgProtocolId/sub-organization/:subOrganizationId/recommendations/:questionOptionId/users', auth, getRecommendedUsersOfSubOrganizationByOptionIdRouteHandler);

module.exports = router;
