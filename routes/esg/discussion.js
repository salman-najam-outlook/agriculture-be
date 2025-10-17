const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const auth = require('../../middleware/auth');
const discussionController = require('../../controllers/admin/esg/discussion');

/**
 * @swagger
 * /esg/discussions/{protocolId}:
 *   get:
 *     tags: [Discussions]
 *     summary: Get discussions for a protocol
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Protocol ID
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
 *         description: List of discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     discussions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Discussion'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */
router.get('/:protocolId',
  auth,
  discussionController.list
);

/**
 * @swagger
 * /esg/discussions/{protocolId}/attachments:
 *   get:
 *     tags: [Discussions]
 *     summary: Get attachments for a protocol
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Protocol ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of attachments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     attachments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Attachment'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */
router.get('/:protocolId/attachments',
  auth,
  discussionController.getAttachments
);

/**
 * @swagger
 * /esg/discussions/{protocolId}:
 *   post:
 *     tags: [Discussions]
 *     summary: Create a new discussion
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: protocolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Protocol ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Discussion content
 *               parentId:
 *                 type: string
 *                 description: Parent discussion ID for replies
 *               files:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - s3Key
 *                     - fileUrl
 *                   properties:
 *                     s3Key:
 *                       type: string
 *                       description: S3 key for attachment
 *                     fileUrl:
 *                       type: string
 *                       format: uri
 *                       description: File URL for attachment
 *     responses:
 *       200:
 *         description: Discussion created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Discussion'
 */
router.post('/:protocolId',
  auth,
  checkSchema({
    content: {
      trim: true,
      notEmpty: true,
      errorMessage: 'Content is required'
    },
    protocolId: {
      isMongoId: true,
      errorMessage: 'Invalid protocol ID'
    },
    parentId: {
      optional: true,
      isMongoId: true,
      errorMessage: 'Invalid parent discussion ID'
    },
    files: {
      optional: true,
      isArray: true,
      errorMessage: 'Valid files are required when attaching a file'
    },
    'files.*.s3Key': {
      optional: false,
      isString: true,
      errorMessage: 'S3 key is required when attaching a file'
    },
    'files.*.fileUrl': {
      optional: false,
      isURL: true,
      errorMessage: 'Each file URL must be a valid URL'
    },
  }),
  discussionController.create
);

/**
 * @swagger
 * /esg/discussions/{discussionId}/assign:
 *   put:
 *     tags: [Discussions]
 *     summary: Assign a user to a discussion
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedUserId
 *             properties:
 *               assignedUserId:
 *                 type: string
 *                 description: User ID to assign
 *     responses:
 *       200:
 *         description: User assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Discussion'
 */
router.put('/:discussionId/assign',
  auth,
  checkSchema({
    discussionId: {
      in: ['params'],
      isMongoId: true,
      errorMessage: 'Invalid discussion ID'
    },
    assignedUserId: {
      in: ['body'],
      isMongoId: true,
      errorMessage: 'Valid user ID is required'
    }
  }),
  discussionController.assignUser
);

/**
 * @swagger
 * /esg/discussions/available-users:
 *   get:
 *     tags: [Discussions]
 *     summary: Get available users for assignment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/available-users',
  auth,
  discussionController.getAvailableUsers
);


module.exports = router; 