const express = require('express');
const auth = require('../../middleware/auth');
const { listUserActivityLogsRouteHandler } = require('../../controllers/admin/logs/user-activity');

const router = express.Router();

/**
 * @swagger
 * /admin/user-activity:
 *   get:
 *     summary: Get a list of User Activity Logs
 *     tags:
 *       - User Activity Logs
 *     parameters:
 *       - in: query
 *         name: action
 *         required: false
 *         schema:
 *           type: string
 *           enum: [created, deleted, updated]
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
 *       - in: query
 *         name: taggedModel
 *         required: false
 *         schema:
 *           type: string
 *           example: EsgProtocol
 *       - in: query
 *         name: taggedDocId
 *         required: false
 *         schema:
 *           type: string
 *           example: ID of tagged model
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: List of ESG Protocols retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalItems:
 *                       type: number
 *                     currentPage:
 *                       type: number
 *                     totalPage:
 *                       type: number
 *                     limit:
 *                       type: number
 */
router.get('/', auth, listUserActivityLogsRouteHandler);
module.exports = router;
