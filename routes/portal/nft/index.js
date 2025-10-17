const { Router } = require('express');
const { Op } = require('sequelize');
const { parseSnapshotFromSnapshotInstance, parseMetadataAttributes } = require('./helper');
const db = require(rootPath + '/models');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const {
  nftStatusUpdateValidations,
  allNftStatusUpdateValidations,
  nftUpdateAttributeValidations,
  generateNftMetadataValidations,
  nftCreateForAdminValidations,
  nftUpdateForAdminValidations,
} = require(rootPath + '/helpers/validators/nft');
const multer = require('multer');
const S3 = require(rootPath + '/components/s3upload');
const moment = require('moment');

const nftRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /portal/nfts/snapshots:
 *   get:
 *     summary: Get list of NFT Snapshots for Dimitra Portal
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          description: Number of records you want to fetch
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          description: Number of records you want to skip before starting to collect records
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *          enum: ['Requested', 'Approved', 'Rejected']
 *          description: Status of Requested NFT
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *          enum: ['ASC', 'DESC']
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *          enum: ['id', 'userId', 'submittedAt', 'status', 'createdAt', 'updatedAt']
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: integer
 *                         description: Total number of NFTs
 *                       nftSnapshots:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             submittedAt:
 *                               type: string
 *                               format: YYYY-MM-DD HH:mm:ss
 *                               example: 2023-09-04 07:53:00
 *                             userId:
 *                               type: integer
 *                               example: 1
 *                             status:
 *                               type: string
 *                               enum: ['Requested', 'Approved', 'Rejected']
 *                             snapshottedAt:
 *                               type: string
 *                               format: YYYY-MM-DD HH:mm:ss
 *                               example: 2023-09-04 07:53:00
 *                             lat:
 *                               type: number
 *                               example: 27.6588
 *                             lng:
 *                               type: number
 *                               example: 85.3247
 *                             filePath:
 *                               type: string
 *                             user:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 firstName:
 *                                   type: string
 *                                   example: "John"
 *                                 lastName:
 *                                   type: string
 *                                   example: "Doe"
 *                                 app_type:
 *                                   type: string
 *                                   example: "connected_farmer"
 *                                 profilePicUrl:
 *                                   type: string
 *                                   nullable: true
 *                                 country:
 *                                   type: string
 *                                   nullable: true
 *                                 farms:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       id:
 *                                         type: number
 *                                       lat:
 *                                         type: number
 *                                         example: 27.6588
 *                                       lng:
 *                                         type: number
 *                                         example: 85.3247
 *                                       address:
 *                                         type: string
 *                                         nullable: true
 *                                       farmName:
 *                                         type: string
 *                                       country:
 *                                         type: string
 *                                         nullable: true
 *                                       farmRegistrationId:
 *                                         type: string
 *                                       farmerRegistrationId:
 *                                         type: string
 *                             farm:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: number
 *                                 lat:
 *                                   type: number
 *                                   example: 27.6588
 *                                 lng:
 *                                   type: number
 *                                   example: 85.3247
 *                                 address:
 *                                   type: string
 *                                 country:
 *                                   type: string
 *                                   nullable: true
 *                                 farmName:
 *                                   type: string
 *                                 farmRegistrationId:
 *                                   type: string
 *                                 farmerRegistrationId:
 *                                   type: string
 *                             geofence:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: number
 *                                 geofenceName:
 *                                   type: string
 *                                 geofenceArea:
 *                                   type: string
 */
nftRouter.get('/snapshots', async (req, res) => {
  try {
    const SUPPORTED_STATUSES = ['Requested', 'Approved', 'Rejected'];
    let { status, limit, offset, orderBy, order } = req.query;
    if (!SUPPORTED_STATUSES.includes(status)) {
      status = null;
    }

    if (!limit || isNaN(parseInt(limit))) {
      limit = 10;
    } else {
      limit = parseInt(limit);
    }

    if (!offset || isNaN(parseInt(offset))) {
      offset = null;
    } else {
      offset = parseInt(offset);
    }

    const SUPPORTED_ORDERS = ['asc', 'desc'];
    if (typeof order !== 'string' || !SUPPORTED_ORDERS.includes(order?.toLowerCase())) {
      order = 'DESC';
    }
    const SUPPORTED_ORDER_FIELDS = ['id', 'userId', 'status', 'submittedAt', 'createdAt', 'updatedAt', 'snapshottedAt'];
    if (!orderBy || !SUPPORTED_ORDER_FIELDS.includes(orderBy)) {
      orderBy = 'submittedAt';
    }

    const queryOrder = [[orderBy, order]];

    if (orderBy !== 'submittedAt') {
      queryOrder.push(['submittedAt', 'DESC']);
    }

    const nftSnapshots = await db.NFTSnapshot.findAll({
      where: status ? { status } : undefined,
      limit,
      offset,
      order: queryOrder,
      include: [
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['id', 'firstName', 'middleName','lastName', 'profilePicUrl', 'app_type', 'country'],
          include: [
            {
              model: db.user_farm,
              required: false,
              as: 'farms',
              attributes: [
                'id',
                'userId',
                'lat',
                ['log', 'lng'],
                'address',
                'country',
                'farmName',
                'farmerFirstName',
                'isTechnician',
                'farmerLastName',
                'farmerMiddleName',
                ['registrationNo', 'farmRegistrationId'],
                ['farmerId', 'farmerRegistrationId'],
              ],
              where: { isDeleted: false },
            },
          ],
        },
        {
          model: db.user_farm,
          as: 'farm',
          required: false,
          attributes: [
            'id',
            'userId',
            'lat',
            ['log', 'lng'],
            'address',
            'country',
            'farmName',
            'farmerFirstName',
            'isTechnician',
            'farmerLastName',
            'farmerMiddleName',
            ['registrationNo', 'farmRegistrationId'],
            ['farmerId', 'farmerRegistrationId'],
          ],
        },
        {
          model: db.Geofence,
          as: 'geofence',
          required: false,
        },
      ],
    });
    const count = await db.NFTSnapshot.count({ where: status ? { status } : undefined });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          nftSnapshots,
          count,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/{snapshotId}:
 *   get:
 *     summary: Get NFT Snapshot Details
 *     description: Get details of NFT Snapshots
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: snapshotId
 *        required: true
 *        description: ID of NFT
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       submittedAt:
 *                         type: string
 *                         format: YYYY-MM-DD HH:mm:ss
 *                         example: 2023-09-04 07:53:00
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         enum: ['Requested', 'Approved', 'Rejected']
 *                       snapshottedAt:
 *                         type: string
 *                         format: YYYY-MM-DD HH:mm:ss
 *                         example: 2023-09-04 07:53:00
 *                       lat:
 *                         type: number
 *                         example: 27.6588
 *                       lng:
 *                         type: number
 *                         example: 85.3247
 *                       filePath:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           lastName:
 *                             type: string
 *                             example: "Doe"
 *                           app_type:
 *                             type: string
 *                             example: "connected_farmer"
 *                           profilePicUrl:
 *                             type: string
 *                             nullable: true
 *                           country:
 *                             type: string
 *                             nullable: true
 *                           farms:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: number
 *                                 lat:
 *                                   type: number
 *                                   example: 27.6588
 *                                 lng:
 *                                   type: number
 *                                   example: 85.3247
 *                                 address:
 *                                   type: string
 *                                 country:
 *                                   type: string
 *                                   nullable: true
 *                                 farmName:
 *                                   type: string
 *                                 farmRegistrationId:
 *                                   type: string
 *                                 farmerRegistrationId:
 *                                   type: string
 *                       metadata:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "ID1@2023-09-04"
 *                           external_url:
 *                             type: string
 *                             example: "https://portal.dimitra.io/nfts/1"
 *                           image:
 *                             type: string
 *                             example: "https://dimitra-public-images.s3.amazonaws.com/coffee-seedlings-N.png"
 *                           description:
 *                             type: string
 *                           attributes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 trait_type:
 *                                   type: string
 *                                 value:
 *                                   oneOf:
 *                                     - type: string
 *                                     - type: number
 *                       farm:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           lat:
 *                             type: number
 *                             example: 27.6588
 *                           lng:
 *                             type: number
 *                             example: 85.3247
 *                           address:
 *                             type: string
 *                           country:
 *                             type: string
 *                             nullable: true
 *                           farmName:
 *                             type: string
 *                           farmRegistrationId:
 *                             type: string
 *                           farmerRegistrationId:
 *                             type: string
 *                       geofence:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           geofenceName:
 *                             type: string
 *                           geofenceArea:
 *                             type: string
 */
nftRouter.get('/snapshots/:snapshotId', async (req, res) => {
  try {
    const snapshotId = req.params.snapshotId;

    const nftSnapshot = await db.NFTSnapshot.findOne({
      where: { id: snapshotId },
      include: [
        {
          model: db.NFTSnapshotAttribute,
          as: 'extraAttributes',
          required: false,
        },
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['id', 'firstName', 'middleName','lastName', 'profilePicUrl', 'app_type', 'country'],
          include: [
            {
              model: db.user_farm,
              required: false,
              as: 'farms',
              attributes: [
                'id',
                'userId',
                'lat',
                ['log', 'lng'],
                'address',
                'country',
                'farmName',
                'farmerFirstName',
                'isTechnician',
                'farmerLastName',
                'farmerMiddleName',
                ['registrationNo', 'farmRegistrationId'],
                ['farmerId', 'farmerRegistrationId'],
              ],
              where: { isDeleted: false },
            },
          ],
        },
        {
          model: db.user_farm,
          as: 'farm',
          required: false,
          attributes: [
            'id',
            'userId',
            'lat',
            ['log', 'lng'],
            'address',
            'country',
            'farmName',
            'farmerFirstName',
            'isTechnician',
            'farmerLastName',
            'farmerMiddleName',
            ['registrationNo', 'farmRegistrationId'],
            ['farmerId', 'farmerRegistrationId'],
          ],
        },
        {
          model: db.Geofence,
          as: 'geofence',
          required: false,
        },
      ],
    });

    if (!nftSnapshot) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: 404,
          data: snapshotId,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: parseSnapshotFromSnapshotInstance(nftSnapshot),
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/{snapshotId}/status:
 *   put:
 *     summary: Update NFT Snapshot Status
 *     description: Update Status of NFT Snapshot to Requested, Approved or Rejected
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: snapshotId
 *        required: true
 *        description: ID of NFT Snapshot
 *        schema:
 *          type: integer
 *          example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['Approved', 'Rejected', 'Requested']
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       submittedAt:
 *                         type: string
 *                         format: YYYY-MM-DD HH:mm:ss
 *                         example: 2023-09-04 07:53:00
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         enum: ['Requested', 'Approved', 'Rejected']
 *                       snapshottedAt:
 *                         type: string
 *                         format: YYYY-MM-DD HH:mm:ss
 *                         example: 2023-09-04 07:53:00
 *                       lat:
 *                         type: number
 *                         example: 27.6588
 *                       lng:
 *                         type: number
 *                         example: 85.3247
 *                       filePath:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           lastName:
 *                             type: string
 *                             example: "Doe"
 *                           app_type:
 *                             type: string
 *                             example: "connected_farmer"
 *                           profilePicUrl:
 *                             type: string
 *                             nullable: true
 *                       metadata:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "ID1@2023-09-04"
 *                           external_url:
 *                             type: string
 *                             example: "https://portal.dimitra.io/nfts/1"
 *                           image:
 *                             type: string
 *                             example: "https://dimitra-public-images.s3.amazonaws.com/coffee-seedlings-N.png"
 *                           description:
 *                             type: string
 *                           attributes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 trait_type:
 *                                   type: string
 *                                 value:
 *                                   oneOf:
 *                                     - type: string
 *                                     - type: number
 *                       farm:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           lat:
 *                             type: number
 *                             example: 27.6588
 *                           lng:
 *                             type: number
 *                             example: 85.3247
 *                           address:
 *                             type: string
 *                           country:
 *                             type: string
 *                             nullable: true
 *                           farmName:
 *                             type: string
 *                           farmRegistrationId:
 *                             type: string
 *                           farmerRegistrationId:
 *                             type: string
 *                       geofence:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           geofenceName:
 *                             type: string
 *                           geofenceArea:
 *                             type: string
 */
nftRouter.put('/snapshots/:snapshotId/status', nftStatusUpdateValidations, validationErrorHandler, async (req, res) => {
  try {
    const snapshotId = req.params.snapshotId;
    const { status } = req.body;
    await db.NFTSnapshot.update(
      { status },
      {
        where: { id: snapshotId },
      }
    );

    const nftSnapshot = await db.NFTSnapshot.findOne({
      where: { id: snapshotId },
      include: [
        {
          model: db.NFTSnapshotAttribute,
          as: 'extraAttributes',
          required: false,
        },
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['id', 'firstName', 'middleName','lastName', 'profilePicUrl', 'app_type'],
        },
        {
          model: db.user_farm,
          as: 'farm',
          required: false,
          attributes: [
            'id',
            'userId',
            'lat',
            ['log', 'lng'],
            'address',
            'country',
            'farmName',
            'farmerFirstName',
            'isTechnician',
            'farmerLastName',
            'farmerMiddleName',
            ['registrationNo', 'farmRegistrationId'],
            ['farmerId', 'farmerRegistrationId'],
          ],
        },
        {
          model: db.Geofence,
          as: 'geofence',
          required: false,
        },
      ],
    });

    if (!nftSnapshot) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: 404,
          data: snapshotId,
        })
      );
    }

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: parseSnapshotFromSnapshotInstance(nftSnapshot),
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/status:
 *   put:
 *     summary: Update NFT Snapshots Status in Bulk
 *     description: Update Status of NFT to Requested, Approved or Rejected
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status, ids]
 *             properties:
 *               status:
 *                 type: string
 *                 required: true
 *                 enum: ['Approved', 'Rejected', 'Requested']
 *               ids:
 *                 type: array
 *                 required: true
 *                 items:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         submittedAt:
 *                           type: string
 *                           format: YYYY-MM-DD HH:mm:ss
 *                           example: 2023-09-04 07:53:00
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                         status:
 *                           type: string
 *                           enum: ['Requested', 'Approved', 'Rejected']
 *                         snapshottedAt:
 *                           type: string
 *                           format: YYYY-MM-DD HH:mm:ss
 *                           example: 2023-09-04 07:53:00
 *                         lat:
 *                           type: number
 *                           example: 27.6588
 *                         lng:
 *                           type: number
 *                           example: 85.3247
 *                         filePath:
 *                           type: string
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             firstName:
 *                               type: string
 *                               example: "John"
 *                             lastName:
 *                               type: string
 *                               example: "Doe"
 *                             app_type:
 *                               type: string
 *                               example: "connected_farmer"
 *                             profilePicUrl:
 *                               type: string
 *                               nullable: true
 *                         farm:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             lat:
 *                               type: number
 *                               example: 27.6588
 *                             lng:
 *                               type: number
 *                               example: 85.3247
 *                             address:
 *                               type: string
 *                             country:
 *                               type: string
 *                               nullable: true
 *                             farmName:
 *                               type: string
 *                             farmRegistrationId:
 *                               type: string
 *                             farmerRegistrationId:
 *                               type: string
 *                         geofence:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             geofenceName:
 *                               type: string
 *                             geofenceArea:
 *                               type: string
 */
nftRouter.put('/snapshots/status', allNftStatusUpdateValidations, validationErrorHandler, async (req, res) => {
  try {
    const { status, ids } = req.body;
    await db.NFTSnapshot.update(
      { status },
      {
        where: { id: { [Op.in]: ids } },
      }
    );

    const nftSnapshots = await db.NFTSnapshot.findAll({
      where: { id: { [Op.in]: ids } },
      include: [
        {
          model: db.user,
          as: 'user',
          required: false,
          attributes: ['id', 'firstName', 'middleName','lastName', 'profilePicUrl', 'app_type'],
        },
        {
          model: db.user_farm,
          as: 'farm',
          required: false,
          attributes: [
            'id',
            'userId',
            'lat',
            ['log', 'lng'],
            'address',
            'country',
            'farmName',
            'farmerFirstName',
            'isTechnician',
            'farmerLastName',
            'farmerMiddleName',
            ['registrationNo', 'farmRegistrationId'],
            ['farmerId', 'farmerRegistrationId'],
          ],
        },
        {
          model: db.Geofence,
          as: 'geofence',
          required: false,
        },
      ],
    });

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: nftSnapshots,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/{snapshotId}/attributes:
 *   post:
 *     summary: Update NFT Snapshot Attributes by IDs
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: snapshotId
 *        required: true
 *        description: ID of NFT Snapshot
 *        schema:
 *          type: integer
 *          example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [attributes]
 *             properties:
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [traitType, value]
 *                   properties:
 *                     traitType:
 *                       type: string
 *                       example: Farmer Score
 *                     value:
 *                       oneOf:
 *                         - type: string
 *                         - type: number
 *                       example: 12
 *                     maxValue:
 *                       type: number
 *                       example: 100
 *                       optional: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         snapshottedAt:
 *                           type: string
 *                           format: YYYY-MM-DD HH:mm:ss
 *                           example: 2023-09-04 07:53:00
 *                         lat:
 *                           type: number
 *                           example: 27.6588
 *                         lng:
 *                           type: number
 *                           example: 85.3247
 *                         filePath:
 *                           type: string
 *                         metadata:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "ID1@2023-09-04"
 *                             external_url:
 *                               type: string
 *                               example: "https://portal.dimitra.io/nfts/1"
 *                             image:
 *                               type: string
 *                               example: "https://dimitra-public-images.s3.amazonaws.com/coffee-seedlings-N.png"
 *                             description:
 *                               type: string
 *                             attributes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   trait_type:
 *                                     type: string
 *                                   value:
 *                                     oneOf:
 *                                       - type: string
 *                                       - type: number
 *                         user:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             firstName:
 *                               type: string
 *                               example: "John"
 *                             lastName:
 *                               type: string
 *                               example: "Doe"
 *                             app_type:
 *                               type: string
 *                               example: "connected_farmer"
 *                             profilePicUrl:
 *                               type: string
 *                               nullable: true
 *                         farm:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             lat:
 *                               type: number
 *                               example: 27.6588
 *                             lng:
 *                               type: number
 *                               example: 85.3247
 *                             address:
 *                               type: string
 *                             country:
 *                               type: string
 *                               nullable: true
 *                             farmName:
 *                               type: string
 *                             farmRegistrationId:
 *                               type: string
 *                             farmerRegistrationId:
 *                               type: string
 *                         geofence:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             geofenceName:
 *                               type: string
 *                             geofenceArea:
 *                               type: string
 */
nftRouter.post(
  '/snapshots/:nftSnapshotId/attributes',
  nftUpdateAttributeValidations,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { nftSnapshotId } = req.params;
      const { attributes = [] } = req.body;

      const nft = await db.NFTSnapshot.findOne({
        where: { id: nftSnapshotId },
        include: [
          {
            model: db.NFTSnapshotAttribute,
            as: 'extraAttributes',
            required: false,
          },
        ],
      });

      if (!nft) {
        return res.json(
          errorRespSync({
            msg: error.DOESNT_EXISTS,
            code: 404,
            data: nftSnapshotId,
          })
        );
      }

      if (nft.extraAttributes && nft.extraAttributes.length > 0) {
        const attributesToRemove = nft.extraAttributes.filter((existingAttribute) => {
          return attributes.findIndex((attribute) => existingAttribute.traitType === attribute.traitType) === -1;
        });

        if (attributesToRemove.length > 0) {
          const attributeIdsToRemove = attributesToRemove.map((attribute) => attribute.id);
          await db.NFTSnapshotAttribute.destroy({
            where: {
              id: { [Op.in]: attributeIdsToRemove },
            },
          });
        }
      }

      const attributesToCreate = attributes.map((attribute) => {
        let maxValue = attribute.maxValue ? Number(attribute.maxValue) : null;
        if (isNaN(maxValue) || isNaN(Number(attribute.value))) maxValue = null;
        if (maxValue) {
          maxValue = Math.max(maxValue, Number(attribute.value));
        }
        return {
          ...attribute,
          snapshotId: nftSnapshotId,
          maxValue,
          displayType: attribute.displayType ? attribute.displayType : null,
        };
      });

      if (attributesToCreate.length > 0) {
        await db.NFTSnapshotAttribute.bulkCreate(attributesToCreate, {
          updateOnDuplicate: ['traitType', 'value', 'maxValue', 'displayType'],
        });
      }

      const snapshot = await db.NFTSnapshot.findOne({
        where: { id: nftSnapshotId },
        include: [
          {
            model: db.NFTSnapshotAttribute,
            as: 'extraAttributes',
            required: false,
          },
          {
            model: db.user,
            as: 'user',
            required: false,
            attributes: ['id', 'firstName', 'middleName','lastName', 'profilePicUrl', 'app_type'],
          },
          {
            model: db.user_farm,
            as: 'farm',
            required: false,
            attributes: [
              'id',
              'userId',
              'lat',
              ['log', 'lng'],
              'address',
              'country',
              'farmName',
              'farmerFirstName',
              'isTechnician',
              'farmerLastName',
              'farmerMiddleName',
              ['registrationNo', 'farmRegistrationId'],
              ['farmerId', 'farmerRegistrationId'],
            ],
          },
          {
            model: db.Geofence,
            as: 'geofence',
            required: false,
          },
        ],
      });

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: parseSnapshotFromSnapshotInstance(snapshot),
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /portal/nfts/artworks/upload:
 *   post:
 *     summary: Upload NFT Artworks
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [artwork]
 *             properties:
 *               artwork:
 *                 type: string
 *                 format: binary
 *                 required: true
 *               filename:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         location:
 *                           type: string
 *                           example: https://dimitra-public-images.s3.amazonaws.com/artworks/1695704417069.jpg
 *                         key:
 *                           type: string
 *                           example: artworks/1695704417069.jpg
 */
nftRouter.post('/artworks/upload', upload.single('artwork'), async (req, res) => {
  try {
    const file = req.file;

    if (!file || !file.mimetype.startsWith('image/')) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.BAD_REQUEST,
        })
      );
    }
    const filename = req.body.filename || Date.now().toString();

    const { Location: location, Key: key } = await S3.uploadFile(
      file,
      `${process.env.NODE_ENV ?? 'development'}/artworks/${filename}`
    );
    return res.json(
      successRespSync({
        msg: success.UPLOADED,
        data: {
          location,
          key,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/generate-metadata:
 *   post:
 *     summary: Generate metadata JSON file for NFT
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, snapshotIds, filename, imageLink]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Farm Hero DMTR2
 *               description:
 *                 type: string
 *                 example: DMTR ID2 NFT categorized as Farm Hero NFT containing one Avocado tree image snapshotted at May 5, 2023
 *               filename:
 *                 type: string
 *                 description: In case of purchase, it should be the current purchase number
 *                 example: 1
 *               imageLink:
 *                 type: string
 *                 example: https://dimitra-public-images.s3.amazonaws.com/artworks/anup-NFT-1.jpg
 *                 description: Artwork image link for NFT
 *               snapshotIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1]
 *                 description: ID of NFT snapshot minting requested by farmer
 *               imageViewPageLink:
 *                 type: string
 *                 example: https://portal.dimitra.io/nfts/1
 *                 description: This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on our site.
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [traitType, value]
 *                   properties:
 *                     traitType:
 *                       type: string
 *                     value:
 *                       oneOf:
 *                         - type: string
 *                         - type: number
 *                     maxValue:
 *                       type: number
 *                     displayType:
 *                       type: string
 *                 example: [{"traitType":"Farm ID","value":"12345"},{"traitType":"Number of trees","value":12},{"traitType": "Score", "value": 90}]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         location:
 *                           type: string
 *                           example: https://dimitra-public-images.s3.amazonaws.com/prod/nft-metadata/1.json
 *                         key:
 *                           type: string
 *                           example: prod/nft-metadata/1.json
 *                         NFTId:
 *                           type: integer
 */
nftRouter.post('/generate-metadata', generateNftMetadataValidations, validationErrorHandler, async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { name, description, snapshotIds, filename, imageLink, imageViewPageLink, attributes } = req.body;
    const metadata = {
      name,
      description,
      image: imageLink,
      external_url: imageViewPageLink || imageLink,
    };

    if (attributes && attributes.length > 0) {
      metadata.attributes = parseMetadataAttributes(attributes);
    }

    const { Location: location, Key: key } = await S3.uploadJSONFile(
      metadata,
      `${process.env.NODE_ENV ?? 'development'}/nft-metadata/${filename}`
    );

    let NFT = await db.NFT.findOne({
      where: {
        [Op.or]: [
          {
            metadataFilePath: {
              [Op.like]: `%${key.split('/').map(encodeURIComponent).join('/')}`,
            },
          },
          {
            metadataFilePath: location,
          },
        ]
      },
      transaction,
    });

    if (!NFT) {
      NFT = await db.NFT.create(
        {
          metadataFilePath: location,
        },
        { transaction }
      );
    } else {
      if (NFT.metadataFilePath !== location) {
        await db.NFT.update(
          {
            metadataFilePath: location,
          },
          {
            where: { id: NFT.id },
            transaction,
          }
        );
      }
      await db.NFTSnapshot.update(
        {
          nftId: null,
        },
        {
          where: { nftId: NFT.id },
          transaction,
        }
      );
    }

    if (Array.isArray(snapshotIds) && snapshotIds.length) {
      await db.NFTSnapshot.update(
        {
          nftId: NFT.id,
        },
        {
          where: { id: { [Op.in]: snapshotIds.filter(Boolean) } },
          transaction,
        }
      );
    }

    await transaction.commit();

    return res.json(
      successRespSync({
        msg: success.UPLOADED,
        data: {
          NFTId: NFT.id,
          location,
          key,
        },
      })
    );
  } catch (err) {
    await transaction.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/upload:
 *   post:
 *     summary: Upload NFT Snapshots
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 required: true
 *               filename:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         location:
 *                           type: string
 *                           example: https://dimitra-public-images.s3.amazonaws.com/1696305742988.jpg
 *                         key:
 *                           type: string
 *                           example: artworks/1695704417069.jpg
 */
nftRouter.post('/snapshots/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file || !file.mimetype.startsWith('image/')) {
      return res.json(
        errorRespSync({
          code: 400,
          msg: error.BAD_REQUEST,
        })
      );
    }
    const filename = req.body.filename || Date.now().toString();

    const { Location: location, Key: key } = await S3.uploadFile(
      file,
      `${process.env.NODE_ENV ?? 'development'}/${filename}`
    );
    return res.json(
      successRespSync({
        msg: success.UPLOADED,
        data: {
          location,
          key,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots:
 *   post:
 *     summary: Create request for mint NFT
 *     description: Add Mint NFT Request for agronomist to validate and mint NFT
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required: ['lat', 'lng', 'imagePath']
 *            properties:
 *              snapshottedAt:
 *                type: string
 *                example: 2023-09-28T15:48:40.275+05:45
 *              lat:
 *                type: number
 *                example: 27.85
 *              lng:
 *                type: number
 *                example: 85.85
 *              imagePath:
 *                type: string
 *                example: https://dimitra-public-images.s3.amazonaws.com/1696305742988.jpg
 *              farmerId:
 *                type: number
 *              geofenceId:
 *                type: number
 *              userFarmId:
 *                type: number
 *              altitude:
 *                type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 */
nftRouter.post('/snapshots', nftCreateForAdminValidations, validationErrorHandler, async (req, res) => {
  let { farmerId, snapshottedAt, lat, lng, imagePath, userFarmId, geofenceId, altitude } = req.body;
  try {
    snapshottedAt = snapshottedAt ? moment(snapshottedAt, true).utc() : null;
    const nftSnapshot = await db.NFTSnapshot.create({
      submittedAt: moment.utc(),
      userId: farmerId ?? null,
      status: 'Requested',
      snapshottedAt,
      lat,
      lng,
      filePath: imagePath,
      altitude,
      geofenceId,
      userFarmId,
    });

    return res.json(
      successRespSync({
        msg: success.SAVED,
        data: nftSnapshot,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /portal/nfts/snapshots/{nftSnapshotId}:
 *   put:
 *     summary: Update NFT Snapshot data
 *     tags: [Dimitra-Portal-NFT]
 *     parameters:
 *      - in: header
 *        name: auth-key
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: nftSnapshotId
 *        required: true
 *        description: ID of NFT Snapshot
 *        schema:
 *          type: integer
 *          example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              snapshottedAt:
 *                type: string
 *                example: 2023-09-28T15:48:40.275+05:45
 *              lat:
 *                type: number
 *                example: 27.85
 *              lng:
 *                type: number
 *                example: 85.85
 *              imagePath:
 *                type: string
 *                example: https://dimitra-public-images.s3.amazonaws.com/1696305742988.jpg
 *              farmerId:
 *                type: number
 *              userFarmId:
 *                type: number
 *              geofenceId:
 *                type: number
 *              altitude:
 *                type: number
 *              status:
 *                type: number
 *                enum: ['Approved', 'Rejected', 'Requested']
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 */
nftRouter.put('/snapshots/:nftSnapshotId', nftUpdateForAdminValidations, validationErrorHandler, async (req, res) => {
  try {
    const { nftSnapshotId } = req.params;

    let nftSnapshot = await db.NFTSnapshot.findOne({
      where: {
        id: nftSnapshotId,
      },
    });

    if (!nftSnapshot) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: 404,
          data: nftSnapshotId,
        })
      );
    }

    let { farmerId, snapshottedAt, lat, lng, status, imagePath, altitude, geofenceId, userFarmId } = req.body;
    await nftSnapshot.update({
      userId: farmerId ?? nftSnapshot.farmerId,
      snapshottedAt: snapshottedAt ?? nftSnapshot.snapshottedAt,
      lat: lat ?? nftSnapshot.lat,
      lng: lng ?? nftSnapshot.lng,
      status: status ?? nftSnapshot.status,
      filePath: imagePath ?? nftSnapshot.filePath,
      altitude: altitude ?? nftSnapshot.altitude,
      geofenceId: geofenceId ?? nftSnapshot.geofenceId,
      userFarmId: userFarmId ?? nftSnapshot.userFarmId,
    });

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: nftSnapshot,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = nftRouter;
