const { Router } = require('express');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { nftCreateValidations } = require(rootPath + '/helpers/validators/nft');
const moment = require('moment');

const nftRouter = Router();

/**
 * @swagger
 * /user/nfts/snapshots:
 *   post:
 *     summary: Create request for mint NFT
 *     description: Add Mint NFT Request for agronomist to validate and mint NFT
 *     tags: [NFT]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              submittedAt:
 *                type: string
 *                example: 2023-09-28T15:48:40.275+05:45
 *              snapshottedAt:
 *                type: string
 *                example: 2023-09-28T15:48:40.275+05:45
 *              lat:
 *                type: number
 *                example: 85.85
 *              lng:
 *                type: number
 *                example: 85.85
 *              fileS3Key:
 *                type: string
 *                example: IMG_coffee-seedlings.png
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
nftRouter.post('/snapshots', auth, nftCreateValidations, validationErrorHandler, async (req, res) => {
  let { submittedAt, snapshottedAt, lat, lng, fileS3Key, userFarmId, geofenceId, altitude } = req.body;
  try {
    const { id: userId } = req.user;
    submittedAt = moment(submittedAt, true).utc();
    snapshottedAt = moment(snapshottedAt, true).utc();
    const BUCKET_URL = process.env.PUBLIC_BUCKET_URL || 'https://dimitra-public-images.s3.amazonaws.com/';
    const filePath = `${BUCKET_URL}${fileS3Key}`;

    const nftSnapshot = await db.NFTSnapshot.create({
      submittedAt,
      userId,
      status: 'Requested',
      snapshottedAt,
      lat,
      lng,
      filePath,
      userFarmId,
      geofenceId,
      altitude,
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
 * /user/nfts/snapshots:
 *   get:
 *     summary: Get list of NFT Snapshots
 *     description: Get list of NFT Snapshots request sent to Agronomist
 *     tags: [NFT]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
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
 *                               example: 2023-09-28T15:48:40.000Z
 *                             userId:
 *                               type: integer
 *                               example: 1
 *                             status:
 *                               type: string
 *                               enum: ['Requested', 'Approved', 'Rejected']
 *                             snapshottedAt:
 *                               type: string
 *                               example: 2023-09-28T15:48:40.000Z
 *                             lat:
 *                               type: number
 *                               example: 27.6588
 *                             lng:
 *                               type: number
 *                               example: 85.3247
 *                             filePath:
 *                               type: string
 */
nftRouter.get('/snapshots', auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const SUPPORTED_STATUSES = ['Requested', 'Approved', 'Rejected'];
    let { status, limit, offset } = req.query;
    if (!SUPPORTED_STATUSES.includes(status)) {
      status = null;
    }

    if (!limit || isNaN(parseInt(limit))) {
      limit = null;
    } else {
      limit = parseInt(limit);
    }

    if (!offset || isNaN(parseInt(offset))) {
      offset = null;
    } else {
      offset = parseInt(offset);
    }

    const nftSnapshots = await db.NFTSnapshot.findAll({
      where: status ? { status, userId } : { userId },
      limit,
      offset,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['submittedAt', 'DESC']],
      include: [
        {
          model: db.user_farm,
          required: false,
          as: 'farm',
        },
        {
          model: db.Geofence,
          required: false,
          as: 'geofence',
        },
      ],
    });
    const count = await db.NFTSnapshot.count({ where: status ? { status, userId } : { userId } });

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
 * /user/nfts/snapshots/{snapshotId}:
 *   get:
 *     summary: Get NFT Snapshot Details
 *     description: Get details of NFT Snapshot
 *     tags: [NFT]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
 *      - in: path
 *        name: snapshotId
 *        required: true
 *        description: ID of NFT Snapshot
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
 *                         example: 2023-09-28T15:48:40.000Z
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         enum: ['Requested', 'Approved', 'Rejected']
 *                       snapshottedAt:
 *                         type: string
 *                         example: 2023-09-28T15:48:40.000Z
 *                       lat:
 *                         type: number
 *                         example: 27.6588
 *                         nullable: true
 *                       lng:
 *                         type: number
 *                         example: 85.3247
 *                         nullable: true
 *                       filePath:
 *                         type: string
 *                       extraAttributes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             traitType:
 *                               type: string
 *                             value:
 *                               oneOf:
 *                                 - type: string
 *                                 - type: number
 */
nftRouter.get('/snapshots/:snapshotId', auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const snapshotId = req.params.snapshotId;

    const nftSnapshot = await db.NFTSnapshot.findOne({
      where: { userId, id: snapshotId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: db.NFTSnapshotAttribute,
          as: 'extraAttributes',
          required: false,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: db.user_farm,
          required: false,
          as: 'farm',
        },
        {
          model: db.Geofence,
          required: false,
          as: 'geofence',
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
        data: nftSnapshot,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = nftRouter;
