const express = require('express');
const mongoose = require('mongoose');
const { checkSchema } = require('express-validator');
const { ESG_PROTOCOL_TYPE, EsgProtocol, ESG_APPROVAL_METHOD } = require('../../mongoose-models/EsgProtocol');
const validation_error_handler = require('../../middleware/validation_error_handler');
const auth = require('../../middleware/auth');
const _ = require('lodash');
const {
  createEsgProtocolRouteHandler,
  updateEsgProtocolRouteHandler,
  updateEsgProtocolSettingRouteHandler,
  updateEsgProtocolStatusRouteHandler,
  deleteEsgProtocolRouteHandler,
  getEsgProtocolRouteHandler,
  listEsgProtocolsRouteHandler,
  assignSubOrganizationToEsgProtocolRouteHandler,
  removeSubOrganizationFromEsgProtocolRouteHandler,
  getEsgProtocolSubOrganizationsRouteHandler,
  getEsgProtocolSubOrganizationsProgressTableHandler,
  getEsgProtocolGoalProgressHandler,
  getProtocolProgressForChartHandler,
  getEsgProtocolOverallProgressScore,
  generateProtocolReportPDFHandler,
  getFilteredProtocolResponses,
} = require('../../controllers/admin/esg/esg-protocol');
const { esgProtocolResponseConfig, esgProtocolRequestConfig, esgProtocolListResponseConfig } = require('../../middleware/translation/configs/esgConfigs');
const translationResponseMiddleware = require('../../middleware/translation/translationResponseMiddleware');
const translationMiddleware = require('../../middleware/translation/translationEngine');

const router = express.Router();

const esgProtocolValidationSchema = {
  type: {
    isString: true,
    trim: true,
    notEmpty: true,
    isIn: {
      options: [ESG_PROTOCOL_TYPE],
    },
    custom: {
      options: async (value, { req }) => {
        if(req.method.toLowerCase() !== 'get' && value === 'Standard' && !req.user?.isSuperAdmin) {
          return Promise.reject('Only super admin can manage standard.');
        }
        return true;
      }
    }
  },
  title: {
    isString: true,
    trim: true,
    notEmpty: true,
    custom: {
      options: async (value, { req }) => {
        if (typeof value === 'string') {
          const id = req.params.esgProtocolId;
          const match = {
            title: value.trim(),
          };
          if (id) {
            match._id = { $ne: id };
          }
          const exists = await EsgProtocol.exists(match);
          if (exists) {
            return Promise.reject('Title already exists');
          }
        }
      },
    },
  },
  shortCode: {
    isString: true,
    trim: true,
    notEmpty: true,
    custom: {
      options: async (value, { req }) => {
        if (typeof value === 'string') {
          const id = req.params.esgProtocolId;
          const match = {
            shortCode: value.trim(),
          };
          if (id) {
            match._id = { $ne: id };
          }
          const exists = await EsgProtocol.exists(match);
          if (exists) {
            return Promise.reject('Short code already exists');
          }
        }
      },
    },
  },
  description: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  sealKey: {
    isString: true,
    trim: true,
    notEmpty: true,
  },
  standardId: {
    isMongoId: true,
    optional: { options: { nullable: true } },
    custom: {
      options: async (value, { req }) => {
        const id = req.params.esgProtocolId;
        // Skip check if updating protocol as we are not updating standardId
        if (id) return true;
        const { type } = req.body;
        if (type === 'Protocol') {
          if (value) {
            const standard = await EsgProtocol.findOne({
              _id: value,
              type: 'Standard',
            }).exec();
            if (!standard) {
              return Promise.reject('Standard does not exist');
            }
            if (standard.isActive === false) {
              return Promise.reject('Standard is not active');
            }
          }
        }
        return true;
      },
    },
  },
  requiresMandatoryScoreForGovernanceScore: {
    isBoolean: true,
    optional: { options: { nullable: true } },
  },
  requiresMandatoryScoreForSocialScore: {
    isBoolean: true,
    optional: { options: { nullable: true } },
  },
  requiresMandatoryScoreForEnvironmentalScore: {
    isBoolean: true,
    optional: { options: { nullable: true } },
  },
  approvalMethod: {
    isString: true,
    optional: { options: { nullable: true } },
    isIn: {
      options: [ESG_APPROVAL_METHOD],
    },
  },
  environmentalScore: {
    isNumeric: true,
    optional: { options: { nullable: true } },
    custom: {
      options: (value) => {
        if (value < 0 || value > 100) {
          return Promise.reject('Environmental score should be between 0 and 100');
        }
        return true;
      },
    },
  },
  socialScore: {
    isNumeric: true,
    optional: { options: { nullable: true } },
    custom: {
      options: (value) => {
        if (value < 0 || value > 100) {
          return Promise.reject('Social score should be between 0 and 100');
        }
        return true;
      },
    },
  },
  governanceScore: {
    isNumeric: true,
    optional: { options: { nullable: true } },
    custom: {
      options: (value) => {
        if (value < 0 || value > 100) {
          return Promise.reject('Governance score should be between 0 and 100');
        }
        return true;
      },
    },
  },
  overallScore: {
    isNumeric: true,
    optional: { options: { nullable: true } },
    custom: {
      options: (value) => {
        if (value < 0 || value > 100) {
          return Promise.reject('Overall score should be between 0 and 100');
        }
        return true;
      },
    },
  },
  isActive: {
    isBoolean: true,
    optional: { options: { nullable: true } },
  },
  subOrganizations: {
    isArray: {
      errorMessage: 'subOrganizations must be an array of sub organization id',
      options: { min: 1 },
    },
    custom: {
      options: (value) => {
        if (Array.isArray(value)) {
          for (const id of value) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new Error(`Invalid ObjectId: ${id}`);
            }
          }
        }
        return true;
      },
    },
    optional: { options: { nullable: true } },
  },
};

/**
 * @swagger
 * /admin/esg/protocols:
 *   post:
 *     summary: Create a new ESG Protocol
 *     tags:
 *       - ESG Protocol
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
 *             required: [type, title, shortCode, description, sealKey]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Standard, Protocol]
 *                 example: Standard
 *               title:
 *                 type: string
 *                 example: "New ESG Protocol"
 *               shortCode:
 *                 type: string
 *                 example: "NEP"
 *               description:
 *                 type: string
 *                 example: "Description of the new ESG protocol"
 *               sealKey:
 *                 type: string
 *                 example: "seal-key"
 *               standardId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               requiresMandatoryScoreForGovernanceScore:
 *                 type: boolean
 *                 example: true
 *               requiresMandatoryScoreForSocialScore:
 *                 type: boolean
 *                 example: true
 *               requiresMandatoryScoreForEnvironmentalScore:
 *                 type: boolean
 *                 example: true
 *               approvalMethod:
 *                 type: string
 *                 enum: [Manual, Automatic]
 *                 example: Manual
 *               environmentalScore:
 *                 type: number
 *                 example: 85
 *               socialScore:
 *                 type: number
 *                 example: 90
 *               governanceScore:
 *                 type: number
 *                 example: 88
 *               overallScore:
 *                 type: number
 *                 example: 87
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: ESG Protocol created successfully
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
  '/',
  auth,
  checkSchema(esgProtocolValidationSchema),
  validation_error_handler,
  translationMiddleware(esgProtocolRequestConfig, ['esg', 'protocol']),
  createEsgProtocolRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}:
 *   post:
 *     summary: Update an existing ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to update
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
 *             required: [title, shortCode, description, sealKey]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated ESG Protocol"
 *               shortCode:
 *                 type: string
 *                 example: "UEP"
 *               description:
 *                 type: string
 *                 example: "Updated description of the ESG protocol"
 *               sealKey:
 *                 type: string
 *                 example: "updated-seal-key"
 *     responses:
 *       200:
 *         description: ESG Protocol updated successfully
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
  '/:esgProtocolId',
  auth,
  checkSchema(_.pick(esgProtocolValidationSchema, ['title', 'shortCode', 'description', 'sealKey'])),
  validation_error_handler,
  translationMiddleware(esgProtocolRequestConfig, ['esg', 'protocol']),
  updateEsgProtocolRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/settings:
 *   post:
 *     summary: Update settings of an existing ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to update settings for
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
 *             properties:
 *               approvalMethod:
 *                 type: string
 *                 enum: [Manual, Automatic]
 *                 example: Manual
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               overallScore:
 *                 type: number
 *                 example: 87
 *               environmentalScore:
 *                 type: number
 *                 example: 85
 *               socialScore:
 *                 type: number
 *                 example: 90
 *               governanceScore:
 *                 type: number
 *                 example: 88
 *               requiresMandatoryScoreForEnvironmentalScore:
 *                 type: boolean
 *                 example: true
 *               requiresMandatoryScoreForSocialScore:
 *                 type: boolean
 *                 example: true
 *               requiresMandatoryScoreForGovernanceScore:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: ESG Protocol settings updated successfully
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
  '/:esgProtocolId/settings',
  auth,
  checkSchema(
    _.pick(esgProtocolValidationSchema, [
      'approvalMethod',
      'isActive',
      'overallScore',
      'environmentalScore',
      'socialScore',
      'governanceScore',
      'requiresMandatoryScoreForEnvironmentalScore',
      'requiresMandatoryScoreForSocialScore',
      'requiresMandatoryScoreForGovernanceScore',
    ])
  ),
  validation_error_handler,
  updateEsgProtocolSettingRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/status:
 *   post:
 *     summary: Update the status of an existing ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to update status for
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
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: ESG Protocol status updated successfully
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
  '/:esgProtocolId/status',
  auth,
  checkSchema({
    isActive: {
      isBoolean: true,
    },
  }),
  validation_error_handler,
  updateEsgProtocolStatusRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}:
 *   delete:
 *     summary: Delete an existing ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to delete
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: ESG Protocol deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Deleted successfully"
 */
router.delete('/:esgProtocolId', auth, deleteEsgProtocolRouteHandler);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}:
 *   get:
 *     summary: Get an ESG Protocol by ID
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to retrieve
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
router.get('/:esgProtocolId',
  auth,
  getEsgProtocolRouteHandler,
  translationResponseMiddleware(esgProtocolResponseConfig)
);

/**
 * @swagger
 * /admin/esg/protocols:
 *   get:
 *     summary: Get a list of ESG Protocols
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [Standard, Protocol]
 *           default: Standard
 *         description: The type of ESG Protocols to retrieve
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
 *         name: standardId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: includeProgress
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Include total questions and progress count for protocol
 *       - in: query
 *         name: isActive
 *         required: false
 *         schema:
 *           type: boolean
 *         description: The status of ESG Protocols to retrieve
 *       - in: query
 *         name: country
 *         required: false
 *         schema:
 *           type: string
 *         description: The country of sub-organization associated to retrieve. Supports array values.
 *       - in: query
 *         name: product
 *         required: false
 *         schema:
 *           type: number
 *         description: The product of sub-organization associated to retrieve. Supports array values.
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
router.get(
  '/',
  auth,
  checkSchema(_.pick(esgProtocolValidationSchema, ['type'])),
  validation_error_handler,
  listEsgProtocolsRouteHandler,
  translationResponseMiddleware(esgProtocolListResponseConfig)
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/sub-organizations/add:
 *   post:
 *     summary: Assign Sub-Organizations to an ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to sync sub-organizations with
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
 *             properties:
 *               subOrganizations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["65a123abcde456f789012345", "65b678xyz890f123456789ab"]
 *     responses:
 *       200:
 *         description: Successfully synced sub-organizations with the ESG Protocol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sub-organizations synced successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     protocolId:
 *                       type: string
 *                       example: "65cdef789ghi012jkl345678"
 *                     subOrganizations:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["65a123abcde456f789012345", "65b678xyz890f123456789ab"]
 *
 */
router.post(
  '/:esgProtocolId/sub-organizations/add',
  checkSchema(_.pick(esgProtocolValidationSchema, ['subOrganizations'])),
  validation_error_handler,
  auth,
  assignSubOrganizationToEsgProtocolRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/sub-organizations/remove:
 *   put:
 *     summary: Remove Sub-Organizations from an ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to remove sub-organizations from
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
 *             properties:
 *               subOrganizations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["65a123abcde456f789012345", "65b678xyz890f123456789ab"]
 *     responses:
 *       200:
 *         description: Successfully removed sub-organizations from the ESG Protocol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sub-organizations removed successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     protocolId:
 *                       type: string
 *                       example: "65cdef789ghi012jkl345678"
 *                     remainingSubOrganizations:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["65x123abcde456f789012345", "65y678xyz890f123456789ab"]
 */
router.put(
  '/:esgProtocolId/sub-organizations/remove',
  auth,
  checkSchema(_.pick(esgProtocolValidationSchema, ['subOrganizations'])),
  validation_error_handler,
  removeSubOrganizationFromEsgProtocolRouteHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/sub-organizations:
 *   get:
 *     summary: Get Sub-Organizations of an ESG Protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol to retrieve sub-organizations for
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of sub-organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Sub-organizations retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65a123abcde456f789012345"
 *                       name:
 *                         type: string
 *                         example: "Sub Org 1"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-09T12:00:00Z"
 */
router.get('/:esgProtocolId/sub-organizations', auth, getEsgProtocolSubOrganizationsRouteHandler);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/sub-organizations/progress-table:
 *   get:
 *     summary: Get tabular progress view of Sub-Organizations
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for Sub-Organization name
 *       - in: query
 *         name: environmentalRange
 *         schema:
 *           type: string
 *           example: "25-100"
 *         description: Filter by environmental progress range (e.g., "25-100")
 *       - in: query
 *         name: socialRange
 *         schema:
 *           type: string
 *           example: "25-100"
 *         description: Filter by social progress range (e.g., "25-100")
 *       - in: query
 *         name: governanceRange
 *         schema:
 *           type: string
 *           example: "25-100"
 *         description: Filter by governance progress range (e.g., "25-100")
 *       - in: query
 *         name: overallRange
 *         schema:
 *           type: string
 *           example: "25-100"
 *         description: Filter by overall progress range (e.g., "25-100")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved sub-organizations progress table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subOrganization:
 *                             type: string
 *                             example: "ABRAFRUTAS Sub Company"
 *                           environmental:
 *                             type: number
 *                             example: 75
 *                           social:
 *                             type: number
 *                             example: 10
 *                           governance:
 *                             type: number
 *                             example: 75
 *                           overallProgress:
 *                             type: number
 *                             example: 30
 *                           status:
 *                             type: string
 *                             enum: [Pending, Approved, Rejected]
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: number
 *                         totalPages:
 *                           type: number
 *                         totalItems:
 *                           type: number
 *                         currentItems:
 *                           type: number
 *                           example: "5 of 60"
 */
router.get(
  '/:esgProtocolId/sub-organizations/progress-table',
  auth,
  checkSchema({
    search: {
      in: ['query'],
      optional: true,
      isString: true,
      trim: true
    },
    environmentalRange: {
      in: ['query'],
      optional: true,
      matches: {
        options: /^\d+-\d+$/,
        errorMessage: 'Range should be in format: min-max'
      }
    },
    socialRange: {
      in: ['query'],
      optional: true,
      matches: {
        options: /^\d+-\d+$/,
        errorMessage: 'Range should be in format: min-max'
      }
    },
    governanceRange: {
      in: ['query'],
      optional: true,
      matches: {
        options: /^\d+-\d+$/,
        errorMessage: 'Range should be in format: min-max'
      }
    },
    overallRange: {
      in: ['query'],
      optional: true,
      matches: {
        options: /^\d+-\d+$/,
        errorMessage: 'Range should be in format: min-max'
      }
    },
    page: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: 'Page must be a positive integer'
      },
      toInt: true
    },
    limit: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { min: 1, max: 100 },
        errorMessage: 'Limit must be between 1 and 100'
      },
      toInt: true
    }
  }),
  validation_error_handler,
  getEsgProtocolSubOrganizationsProgressTableHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/goals/progress:
 *   get:
 *     summary: Get Goal Progress for Organization
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: goalId
 *         schema:
 *           type: string
 *         description: Filter by specific goal (required for organization details)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for Organization name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved organization details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67d3b22e76b5739f7e073a55"
 *                           name:
 *                             type: string
 *                             example: "Organization Name"
 *                           status:
 *                             type: boolean
 *                             example: true
 *                           progress:
 *                             type: number
 *                             example: 0
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 1
 *                         totalItems:
 *                           type: integer
 *                           example: 1
 *       400:
 *         description: Bad request - Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid parameters"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                       msg:
 *                         type: string
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Protocol or goal not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/:esgProtocolId/goals/progress',
  auth,
  checkSchema({
    goalId: {
      in: ['query'],
      optional: true,
      isMongoId: true
    },
    search: {
      in: ['query'],
      optional: true,
      isString: true,
      trim: true
    },
    page: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: 'Page must be a positive integer'
      },
      toInt: true
    },
    limit: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { min: 1, max: 100 },
        errorMessage: 'Limit must be between 1 and 100'
      },
      toInt: true
    }
  }),
  validation_error_handler,
  getEsgProtocolGoalProgressHandler
);

/**
 * @swagger
 * /admin/esg/protocols/{esgProtocolId}/progress:
 *   get:
 *     summary: Get overall ESG progress score for a protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: esgProtocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: userType
 *         schema:
 *           type: string
 *           default: 'sub-organization'
 *         description: The type of submitter (e.g., 'sub-organization')
 *       - in: query
 *         name: includeFarmerAndSupplier
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include farmer and supplier submissions if userType is 'sub-organization'
 *       - in: query
 *         name: startTargetYear
 *         schema:
 *           type: number
 *         description: Start target year of goal
 *       - in: query
 *         name: endTargetYear
 *         schema:
 *           type: number
 *         description: End target year of goal
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: Successfully retrieved overall progress score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "List retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     Environmental:
 *                       type: number
 *                       example: 75
 *                     Social:
 *                       type: number
 *                       example: 80
 *                     Governance:
 *                       type: number
 *                       example: 85
 *                     Overall:
 *                       type: number
 *                       example: 80
 *       404:
 *         description: Protocol not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 msg:
 *                   type: string
 *                   example: "Not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Server Error"
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.get(
  '/:esgProtocolId/progress',
  auth,
  checkSchema({
    userType: {
      in: ['query'],
      optional: true,
      isString: true,
      trim: true
    },
    includeFarmerAndSupplier: {
      in: ['query'],
      optional: true,
      isBoolean: true
    },
    startTargetYear: {
      in: ['query'],
      optional: true,
      isNumeric: true,
      isLength: {
        min: 4,
        max: 4,
      },
    },
    endTargetYear: {
      in: ['query'],
      optional: true,
      isNumeric: true,
      isLength: {
        min: 4,
        max: 4,
      },
    },
  }),
  validation_error_handler,
  getEsgProtocolOverallProgressScore
);

/**
 * @swagger
 * /admin/esg/protocols/{protocolId}/progress/chart:
 *   get:
 *     summary: Get monthly ESG progress chart data for a protocol
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: Year for which to get the progress data
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: Successfully retrieved progress chart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "List Data"
 *                 data:
 *                   type: object
 *                   properties:
 *                     months:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 *                     progress:
 *                       type: object
 *                       properties:
 *                         Environmental:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [0, 0, 0, 0, 49.16, 0, 0, 0, 0, 0, 0, 0]
 *                         Social:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [0, 0, 0, 0, 16.44, 0, 0, 0, 0, 0, 0, 0]
 *                         Governance:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [0, 0, 0, 0, 37.68, 0, 0, 0, 0, 0, 0, 0]
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Protocol not found
 *       500:
 *         description: Internal server error
 */
router.get('/:protocolId/progress/chart', auth, checkSchema({
    startTargetYear: {
      in: ['query'],
      optional: true,
      isNumeric: true,
      isLength: {
        min: 4,
        max: 4,
      },
    },
    endTargetYear: {
      in: ['query'],
      optional: true,
      isNumeric: true,
      isLength: {
        min: 4,
        max: 4,
      },
    },
  }), getProtocolProgressForChartHandler);

/**
 * @swagger
 * /admin/esg/protocols/{protocolId}/responses:
 *   get:
 *     summary: Get filtered and paginated protocol responses
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of responses (e.g., "Environmental", "Social")
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Term to search in issue or goal titles
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered responses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "List retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 82
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           issue:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                                 example: "Pollution"
 *                           goal:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                                 example: "Reduce plastic packaging by 75%"
 *                           assessment:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "507f191e810c19729de860ea"
 *                           question:
 *                             type: object
 *                             properties:
 *                               questionText:
 *                                 type: string
 *                                 example: "Water consumption?"
 *                               questionType:
 *                                 type: string
 *                                 example: "number"
 *                           response:
 *                             type: object
 *                             properties:
 *                               data:
 *                                 type: string
 *                                 example: "1200 Liters"
 *                               validationStatus:
 *                                 type: string
 *                                 example: "Invalid"
 *       400:
 *         description: Bad request - Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid parameters"
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Protocol not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Protocol not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */
router.get('/:protocolId/responses', 
  auth, // Middleware for authentication
  checkSchema({
    protocolId: {
      in: ['params'],
      isMongoId: true,
      errorMessage: 'Invalid protocol ID'
    },
    type: {
      in: ['query'],
      isString: true,
      notEmpty: true,
      errorMessage: 'Type is required'
    },
    searchTerm: {
      in: ['query'],
      optional: true,
      isString: true,
      trim: true
    },
    page: {
      in: ['query'],
      optional: true,
      isInt: { min: 1 },
      toInt: true,
      errorMessage: 'Page must be a positive integer'
    },
    limit: {
      in: ['query'],
      optional: true,
      isInt: { min: 1, max: 100 },
      toInt: true,
      errorMessage: 'Limit must be between 1 and 100'
    }
  }),
  validation_error_handler, 
  getFilteredProtocolResponses
);



/**
 * @swagger
 * /admin/esg/protocols/{protocolId}/report/download:
 *   get:
 *     summary: Download ESG Protocol Report in PDF format
 *     tags:
 *       - ESG Protocol
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ESG Protocol
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: Year for which to generate the report
 *       - in: query
 *         name: includeSubOrganizations
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Whether to include sub-organization data in the report
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *       200:
 *         description: PDF report generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Protocol not found
 *       500:
 *         description: Internal server error
 */
router.get('/:protocolId/report/download', auth, generateProtocolReportPDFHandler);


module.exports = router;
