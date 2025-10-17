const express = require("express");
const _ = require("lodash");

const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const translation = require(rootPath + "/middleware/translation");
const validatorNotification = require(rootPath +
  "/helpers/validators/notification");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/**
 * @swagger
 * /user/notification/read:
 *   put:
 *     summary: API to get notification
 *     description: API to get notification.
 *     tags: [User Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for marking the notification as seen
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
  "/read",
  auth,
  validatorNotification.markSeen(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { notificationId } = req.body;

      await db.UserNotification.update(
        { seen: "1" },
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
 * /user/notification:
 *   get:
 *     summary: API to get notification history
 *     description: API to get notification history
 *     tags: [User Notification]
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
notification: {totalCount: 3,numRows: 3,rows: [{id: 9,notify: "user",message: "Diwali sale 20% off on membership.",type: "satelite_report",title: "Your Report is ready to Download",createdAt: "2022-05-31T12:26:20.000Z",notificationTo: {userId: 17,notificationId: 9,seen:"0",},notificationBy: {firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},{id: 8,notify: "user",message:"From tomorrow server will be down for two hour exact timing will be provided in morning.",type: "satelite_report",title: "Your Report is ready to Download",createdAt: "2022-05-31T11:52:36.000Z",notificationTo: {userId: 17,notificationId: 8,seen: "0",},notificationBy: { firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},{id: 2,notify: "user",message: "hello",type: "satelite_report",title: "Your Report is ready to Download",createdAt: "2022-05-31T11:27:51.000Z",notificationTo: {userId: 17,notificationId: 2, seen: "1",},notificationBy: {firstName: "hemant",lastName: "rathore",profilePicUrl:"https://hemant-public-uploads.s3.ap-south-1.amazonaws.com/5e757acb-dc3b-4359-8068-179b01e45aa5.1637910361815.jpg",},},],},}}
*
*/

router.get(
  "/",
  auth,
  validatorNotification.list(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    try {
      const { id: userId } = req.user;

      let { limit, page, orderBy, order, seen, type } = req.query;
      seen = Number(seen);
      limit = parseInt(limit);

      const { count: totalCount, rows } = await db.Notification.findAndCountAll(
        {
          include: [
            {
              model: db.UserNotification,
              as: "notificationTo",
              attributes: [
                "userId",
                "notificationId",
                "seen",
                // "isHelpful",
                // "feedback",
              ],
              where: { userId, ...(!_.isEmpty(seen) ? { seen } : null) },
            },
          ],
          attributes: { exclude: ["userId", "updatedAt", "notify"] },
          offset: (page - 1) * limit,
          limit: limit,
          order: [[orderBy, order]],
          where: { ...(type ? { type } : null) },
          // where:{
          //   userId:userId
          // }
        }
      );
      let translatedRows = rows;
      if (req.headers.lang && req.headers.lang != "en") {
        translatedRows = req.translateFunction(rows, globalTranslationCache, {
          lvl1: true,
          module: "user/notification",
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            notification: { totalCount, numRows: rows?.length, translatedRows },
          },
        })
      );
    } catch (err) {
      console.log(err);
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /user/notification/{notificationId}:
 *   put:
 *     summary: Updates the feedback of notification
 *     description: Updates the feedback of notification
 *     tags: [User Notification]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for submitting feedback for notification
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - isHelpful
 *              properties:
 *                feedback:
 *                  type: string
 *                  example: I feel some part confusing
 *                isHelpful:
 *                  type: boolean
 *                  example: false
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
 *                 example: {"success": true,"code": 200,"message": "Thank you for your feedback","data": {"userId": 1, "notificationId": 1, "feedback": null, "isHelpful": true, "seen": true }}
 */
router.put(
  "/:notificationId",
  auth,
  validationErrorHandler,
  async (req, res) => {
    const { notificationId } = req.params;
    // const { feedback, isHelpful } = req.body;
    const { id: userId } = req.user;
    const userNotification = await db.UserNotification.findOne({
      where: {
        userId,
        notificationId,
      },
    });

    if (userNotification === null) {
      return res.json(
        errorRespSync({
          msg: error.DOESNT_EXISTS,
          code: 404,
          data: { notificationId },
        })
      );
    }

    // userNotification.set({ feedback: feedback ? feedback : null, isHelpful });
    await userNotification.save();

    return res.json(
      successRespSync({
        msg: success.FEEDBACK_ADDED,
        data: userNotification,
      })
    );
  }
);

router.put("/read/mark-all", auth, validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Update all notifications for the user to mark them as seen
    await db.UserNotification.update(
      { seen: "1" },
      {
        where: {
          userId, // Target all notifications for this user
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
});

module.exports = router;
