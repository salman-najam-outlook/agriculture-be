const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorNotification = require(rootPath +
  '/helpers/validators/notification');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { createNotification, allAdmins, createAssessmentNotification } = require('./utils');
  const { sendPushNotification } = require(rootPath +
    "/helpers/pushNotification");
    const translation = require(rootPath + '/middleware/translation');
    const simpleTranslate = require(rootPath + '/helpers/simpleTranslate')
/**
 * @swagger
 * /admin/notification:
 *   post:
 *     summary: API to get notification
 *     description: API to get notification.
 *     tags: [Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for post notification
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                notify:
 *                  type: string
 *                  enum: [user, admin] 
 *                message:
 *                  type: string
 *                users:
 *                  type: array
 *                  items:
 *                    type: integer
 *              example: { "notify": "user", "message": "Diwali sale 20% off on membership.", "users": [ 17, 12, 19 ] }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.","data": {
"notification": {"id": 10,"message": "Diwali sale 20% off on membership.","userId": 17,"notify":"user","updatedAt": "2022-06-03T07:34:21.766Z","createdAt": "2022-06-03T07:34:21.766Z"}}}
 *
 */

router.post(
  '/assessment',
  auth,
  validatorNotification.create(),
  validationErrorHandler,
  async (req, res) => {
    try {
     const {title, message, users, assessmentId } = req.body;
     const { id: userId } = req.user;
     const notification = await createAssessmentNotification(title, message, users, assessmentId, userId)
      return res.json(
        successRespSync({
          msg: success.NOTIFICATION_CREATED,
          data: { notification },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


router.post(
  '/',
  auth,
  validatorNotification.create(),
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
     const notification = await createNotification(req)
      await transaction.commit();
      return res.json(
        successRespSync({
          msg: success.NOTIFICATION_CREATED,
          data: { notification },
        })
      );
    } catch (err) {
      await transaction.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /admin/notification/read:
 *   put:
 *     summary: API to get notification
 *     description: API to get notification.
 *     tags: [Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for post notification
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                notificationId:
 *                  type: array
 *                  items:
 *                    type: integer
 *            example: { "notificationId": [ 11 ] }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: {"success": true,"code": 200,"message": "Updated successfully.","data": {}}
 *
 */

router.put(
  '/read',
  auth,
  validatorNotification.markSeen(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { notificationId } = req.body;

      await db.UserNotification.update(
        { seen: '1' },
        {
          where: {
            userId,
            notificationId,
          },
        }
      );

      return res.json(
        successRespSync({
          msg: success.UPDATED,
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
 * /admin/notification:
 *   get:
 *     summary: API to get notification
 *     description: API to get notification.
 *     tags: [Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         example: '1'
 *         description: 'page number'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         example: '10'
 *         description: 'no of rows to return'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: 'order by ids'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ['asc','desc','ASC','DESC']
 *         description: sorting of columns
 *       - in: query
 *         name: seen
 *         schema:
 *           type: string
 *           enum: ['1','0']
 *         description: 'message read(1) or unread(0)'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.","data": {
notification: {totalCount: 3,numRows: 3,rows: [{id: 9,notify: "user",message: "Diwali sale 20% off on membership.",createdAt: "2022-05-31T12:26:20.000Z",notificationTo: {userId: 17,notificationId: 9,seen:"0",},notificationBy: {firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},{id: 8,notify: "user",message:"From tomorrow server will be down for two hour exact timing will be provided in morning.",createdAt: "2022-05-31T11:52:36.000Z",notificationTo: {userId: 17,notificationId: 8,seen: "0",},notificationBy: { firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},{id: 2,notify: "user",message: "hello",createdAt: "2022-05-31T11:27:51.000Z",notificationTo: {userId: 17,notificationId: 2, seen: "1",},notificationBy: {firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},],},}}
*
*/

router.get(
  '/',
  auth,
  translation,
  validatorNotification.list(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const{lang} = req.headers;
      const { id: userId } = req.user;
      let {
        limit = 10000,
        page = 1,
        orderBy = 'id',
        order = 'desc',
        seen,
      } = req.query;
      limit = parseInt(limit);

      const { count: totalCount, rows } = await db.Notification.findAndCountAll(
        {
          include: [
            {
              model: db.UserNotification,
              as: 'notificationTo',
              attributes: ['userId', 'notificationId', 'seen'],
              where: { userId, ...(!_.isEmpty(seen) ? { seen } : null) },
            },
            {
              model: db.user,
              as: 'notificationBy',
              attributes: ['firstName','middleName', 'lastName', 'profilePicUrl'],
            },
          ],
          attributes: { exclude: ['userId', 'updatedAt'] },
          offset: (page - 1) * limit,
          limit: limit,
          order: [[orderBy, order]],
        }
      );
      
      const resRow = rows.map(row => {
        const item = JSON.parse(JSON.stringify(row));
        if (lang && lang !== 'en') {
          const highProductionFarm = 'High production Alert! Farm:';
          const highProductionFarmer = 'High production Alert! Farmer:';

          if(item.message.startsWith(highProductionFarm)) {
            item.message = item.message.replace(highProductionFarm, simpleTranslate(lang, highProductionFarm));
          } else if(item.message.startsWith(highProductionFarmer)) {
            item.message = item.message.replace(highProductionFarmer, simpleTranslate(lang, highProductionFarmer));
          }
          else {
            item.message = simpleTranslate(lang, item.message);
          }
         
        }
        return item;
      });      
      
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { notification: { totalCount, numRows: rows?.length, rows:resRow } },
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
 * /admin/notification/sent:
 *   get:
 *     summary: API to send notification
 *     description: API to send notification.
 *     tags: [Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         example: '1'
 *         description: 'page number'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         example: '10'
 *         description: 'no of rows to return'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: 'order by ids'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ['asc','desc','ASC','DESC']
 *         description: sorting of columns
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.","data" : {totalCount:3,numRows: 3,rows: [{id: 2, notify: "user",message: "hello",createdAt:"2022-05-31T11:27:51000Z" ,notificationFor: [ {id: 12,firstName: "Rohit",lastName: "Chanpak lal gada",email: null,UserNotification: {seen: "0",},},{id: 17,firstName: "hemant",lastName: "rathore",email: "hemant@dimitra.io",UserNotification: {seen: "1",}, },],},{id: 8,notify: "user", message:"From tomorrow server will be down for two hour exact timing will be provided in morning.",createdAt: "2022-05-31T11:52:36.000Z",notificationFor: [{id: 12,firstName: "Rohit",lastName: "Chanpak lal gada",email: null, UserNotification: {seen: "0",},},{id: 17,firstName: "hemant",lastName: "rathore",email: "hemant@dimitra.io",UserNotification: {seen: "0",},},{id: 19, firstName: null,lastName: null,email: null,UserNotification: {seen: "0",},},],},],}}
 *
 */

router.get(
  '/sent',
  auth,
  validatorNotification.list(),
  validationErrorHandler,
  async (req, res) => {
    const{lang} = req.headers;
    try {
      const { id: userId } = req.user;
      let {
        limit = 10000,
        page = 1,
        orderBy = 'id',
        order = 'desc',
      } = req.query;
      limit = parseInt(limit);

      const { count: totalCount, rows } = await db.Notification.findAndCountAll(
        {
          distinct: true,
          include: [
            {
              model: db.user,
              as: 'notificationFor',
              attributes: ['id', 'firstName','middleName', 'lastName', 'email'],
              through: { attributes: ['seen'] },
            },
          ],
          attributes: { exclude: ['userId', 'updatedAt'] },
          where: { userId },
          offset: (page - 1) * limit,
          limit: limit,
          order: [[orderBy, order]],
        }
      );
      const resRow = rows.map(row => {
        const item = JSON.parse(JSON.stringify(row));
        if (lang && lang !== 'en') {
          item.message = simpleTranslate(lang, item.message);
        }
        return item;
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { notification: { totalCount, numRows: rows?.length, rows:resRow } },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/geojsons", auth, translation, async (req, res) => {
  var transaction = await db.sequelize.transaction();
  try {
    const { organization, id: userId } = req.user;
    const { data } = req.body;
    const {lang} = req.headers;
    const listRes = await allAdmins(organization);
    const adminNotification = {
        title: 'Your file is ready!',
        type: 'geo_json_file',
        message: 'Your GeoJson file is ready to be downloaded.',
        userId,
        notify: 'admin',
        data: JSON.stringify({fileDownloadUrl: data})
    }
    const notification = await db.Notification.create(
      adminNotification,
      { transaction }
    )
    let setUserNotification = listRes?.map((uID) => ({
      userId: uID,
      notificationId: notification?.id
    }))

    await db.UserNotification.bulkCreate(setUserNotification, {
      transaction,
    });

    const deviceRegistrationToken = await db.UserRegistrationToken.findAll({
      attributes: ["device_registration_token"],
      where: {
        userId: listRes,
      },
      transaction
    });
    const firebaseToken = [];
    for (const device of deviceRegistrationToken) {
      firebaseToken.push(device.device_registration_token);
    }
    if (firebaseToken.length > 0) {
      await sendPushNotification(firebaseToken, adminNotification.message);
    }
    await transaction.commit();
    return res.json(
      successRespSync({
        msg: success.NOTIFICATION_CREATED,
        data: [],
      })
    );
  } catch (err) {
    console.error(err)
  }
})

module.exports = router;
