const express = require('express');
const { checkSchema } = require('express-validator');
const validation_error_handler = require('../../middleware/validation_error_handler');
const auth = require('../../middleware/auth');
const _ = require('lodash');
const esgAssessment = require('../../mongoose-models/survey/assessments/esgAssessment');
const {
  createEsgGoalRouteHandler,
  updateEsgGoalsStatusRouteHandler,
  reorderEsgGoalsRouteHandler,
  updateEsgGoalRouteHandler,
  deleteEsgGoalRouteHandler,
  getEsgGoalRouteHandler,
} = require('../../controllers/admin/esg/esg-goal');
const { esgGoalsConfig } = require('../../middleware/translation/configs/esgConfigs');
const translationMiddleware = require('../../middleware/translation/translationEngine.js');

const router = express.Router({
  mergeParams: true,
});

const esgGoalValidationSchema = {
  title: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  targetYears: {
    isInt: { options: { min: 1 } },
    notEmpty: true,
    toInt: true,
  },
  order: {
    isInt: { options: { min: 0 } },
    toInt: true,
    optional: { options: { nullable: true } },
  },
  issueId: {
    isMongoId: true,
    notEmpty: true,
  },
  esgAssessmentId: {
    isMongoId: true,
    optional: { options: { nullable: true } },
    custom: {
      options: async (value) => {
        if (value) {
          const exists = await esgAssessment.exists({
            _id: value,
            deletedAt: null,
          });
          if (!exists) {
            return Promise.reject('ESG Assessment does not exist');
          }
        }
        return true;
      },
    },
  },
};

/**
 * @swagger
 * /admin/esg/goals:
 *   post:
 *     summary: Create a new ESG Goal
 *     tags:
 *       - ESG Goal
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
 *             required: [title, targetYears, issueId]
 *             properties:
 *               title:
 *                 type: string
 *               targetYears:
 *                 type: integer
 *               order:
 *                 type: integer
 *                 nullable: true
 *               issueId:
 *                 type: string
 *               esgAssessmentId:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: ESG Goal created successfully
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
  checkSchema(esgGoalValidationSchema),
  validation_error_handler,
  translationMiddleware(esgGoalsConfig, ['esg', 'standards', 'goals']),
  createEsgGoalRouteHandler);

/**
 * @swagger
 * /admin/esg/goals/status:
 *   post:
 *     summary: Update the status of multiple ESG Goals
 *     tags:
 *       - ESG Goal
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
 *             required: [goalIds, isActive]
 *             properties:
 *               goalIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: ESG Goals status updated successfully
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
  '/status',
  auth,
  checkSchema({
    goalIds: {
      isArray: true,
      notEmpty: true,
    },
    'goalIds.*': {
      isMongoId: true,
      notEmpty: true,
    },
    isActive: {
      isBoolean: true,
    },
  }),
  validation_error_handler,
  updateEsgGoalsStatusRouteHandler
);

/**
 * @swagger
 * /admin/esg/goals/reorder:
 *   post:
 *     summary: Reorder ESG Goals
 *     tags:
 *       - ESG Goal
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [goals]
 *             properties:
 *               goals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [_id, order]
 *                   properties:
 *                     _id:
 *                       type: string
 *                     order:
 *                       type: integer
 *     responses:
 *       200:
 *         description: ESG Goals reordered successfully
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
    goals: {
      isArray: true, 
      notEmpty: true,
    },
    'goals.*._id': {
      isMongoId: true,
      notEmpty: true,
    },
    'goals.*.order': {
      isInt: { options: { min: 0 } },
      notEmpty: true,
    },
  }),
  validation_error_handler,
  reorderEsgGoalsRouteHandler
);

/**
 * @swagger
 * /admin/esg/goals/{goalId}:
 *   post:
 *     summary: Update an existing ESG Goal
 *     tags:
 *       - ESG Goal
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         example: '60d0fe4f5311236168a109ca'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, targetYears]
 *             properties:
 *               title:
 *                 type: string
 *               targetYears:
 *                 type: integer
 *               order:
 *                 type: integer
 *                 nullable: true
 *               esgAssessmentId:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: ESG Goal updated successfully
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
  '/:goalId',
  auth,
  checkSchema(_.pick(esgGoalValidationSchema, ['title', 'order', 'targetYears', 'esgAssessmentId'])),
  validation_error_handler,
  translationMiddleware(esgGoalsConfig, ['esg', 'standards', 'goals']),
  updateEsgGoalRouteHandler
);

/**
 * @swagger
 * /admin/esg/goals/{goalId}:
 *   delete:
 *     summary: Delete an ESG Goal
 *     tags:
 *       - ESG Goal
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         example: '60d0fe4f5311236168a109ca'
 *     responses:
 *       200:
 *         description: ESG Goal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Deleted successfully"
 */
router.delete('/:goalId', auth, deleteEsgGoalRouteHandler);

/**
 * @swagger
 * /admin/esg/goals/{goalId}:
 *   get:
 *     summary: Get an ESG Goal by ID
 *     tags:
 *       - ESG Goal
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         example: '60d0fe4f5311236168a109ca'
 *     responses:
 *       200:
 *         description: ESG Goal fetched successfully
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
router.get('/:goalId', auth, getEsgGoalRouteHandler);

module.exports = router;
