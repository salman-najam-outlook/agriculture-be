const express = require('express');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../../middleware/validation_error_handler');
const auth = require('../../middleware/auth');
const _ = require('lodash');
const { ESG_ISSUE_TYPE } = require('../../mongoose-models/EsgIssue');
const {
  createEsgIssueRouteHandler,
  reorderEsgIssuesRouteHandler,
  updateEsgIssueRouteHandler,
  deleteEsgIssueRouteHandler,
  getEsgIssueRouteHandler,
} = require('../../controllers/admin/esg/esg-issue');
const { esgIssuesConfig } = require('../../middleware/translation/configs/esgConfigs');
const translationMiddleware = require('../../middleware/translation/translationEngine.js');

const router = express.Router();

const esgIssueValidationSchema = {
  type: {
    isString: true,
    trim: true,
    notEmpty: true,
    isIn: {
      options: [ESG_ISSUE_TYPE],
    },
  },
  title: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  order: {
    isInt: { options: { min: 0 } },
    toInt: true,
    optional: { options: { nullable: true } },
  },
  protocolId: {
    isMongoId: true,
    notEmpty: true,
  },
};

/**
 * @swagger
 * /admin/esg/issues:
 *   post:
 *     summary: Create a new ESG Issue
 *     tags:
 *       - ESG Issue
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, title, protocolId]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Environmental, Social, Governance]
 *                 example: "Environmental"
 *               title:
 *                 type: string
 *                 example: "Climate Change"
 *               order:
 *                 type: number
 *                 example: 1
 *               protocolId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: ESG Issue created successfully
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
 */
router.post('/',
  auth,
  checkSchema(esgIssueValidationSchema),
  validation_error_handler,
  translationMiddleware(esgIssuesConfig, ['esg', 'standards', 'issues']),
  createEsgIssueRouteHandler
);

/**
 * @swagger
 * /admin/esg/issues/reorder:
 *   post:
 *     summary: Reorder ESG Issues
 *     tags:
 *       - ESG Issue
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [issues]
 *             properties:
 *               issues:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [_id, order]
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     order:
 *                       type: number
 *                       example: 1
 *     responses:
 *       200:
 *         description: ESG Issues reordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Saved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.post(
  '/reorder',
  auth,
  checkSchema({
    issues: {
      isArray: true,
      notEmpty: true,
    },
    'issues.*._id': {
      isMongoId: true,
      notEmpty: true,
    },
    'issues.*.order': {
      isInt: { options: { min: 0 } },
      notEmpty: true,
    },
  }),
  validation_error_handler,
  reorderEsgIssuesRouteHandler
);

/**
 * @swagger
 * /admin/esg/issues/{issueId}:
 *   post:
 *     summary: Update ESG Issue by ID
 *     tags:
 *       - ESG Issue
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: issueId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Climate Change"
 *               order:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: ESG Issue updated successfully
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
 */
router.post(
  '/:issueId',
  auth,
  checkSchema(_.pick(esgIssueValidationSchema, ['title', 'order'])),
  validation_error_handler,
  translationMiddleware(esgIssuesConfig, ['esg', 'standards', 'issues']),
  updateEsgIssueRouteHandler
);

/**
 * @swagger
 * /admin/esg/issues/{issueId}:
 *   delete:
 *     summary: Delete ESG Issue by ID
 *     tags:
 *       - ESG Issue
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: issueId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: ESG Issue deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Deleted successfully"
 */
router.delete('/:issueId', auth, deleteEsgIssueRouteHandler);

/**
 * @swagger
 * /admin/esg/issues/{issueId}:
 *   get:
 *     summary: Get ESG Issue by ID
 *     tags:
 *       - ESG Issue
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: issueId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: ESG Issue fetched successfully
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
router.get('/:issueId', auth, getEsgIssueRouteHandler);

module.exports = router;
