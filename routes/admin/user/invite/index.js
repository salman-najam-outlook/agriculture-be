const express = require('express');
const router = express.Router();
const _ = require('lodash');
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');
const Queue = require('bull');
const xlsx = require('xlsx');
const db = require(rootPath + '/models');
const mailer = require(rootPath + '/components/mailer');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const activationValidator = require(rootPath +
  '/helpers/validators/userActivation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

// create invite que and handeler
const inviteUsersQueue = new Queue('inviteUsersQueue', {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});
inviteUsersQueue.process(async function (job, done) {
  try {
    const { id, jsonArray: users } = job.data;

    await Promise.all(
      users.map(async (user) => {
        const {
          ['First Name']: firstName,
          ['Last Name']: lastName,
          Email: email,
          ['Mobile Number']: mobileNumber,
          ['Membership Type']: membershipType,
          ['Activation Key']: activationKey,
          ['User Role']: userRole,
        } = user;
        const fullName = _.startCase(firstName.concat(' ', lastName));

        const data = {
          fullName,
          email,
          mobileNumber,
          membershipType,
          activationKey,
          userRole,
        };

        const title = 'Dimitra App Activation';
        const template = await ejs.renderFile(
          path.join(rootPath, 'views', 'users/activiation-info.html'),
          data
        );
        return mailer.sendMail(email, title, template);
      })
    );

    await db.UserImport.update({ status: 'success' }, { where: { id } });
    done();
  } catch (err) {
    const { id } = job.data;
    await db.UserImport.update(
      { error: err.message, status: 'failed' },
      { where: { id } }
    );
    done(err);
  }
});

/**
 * @swagger
 * /admin/user/invite:
 *   post:
 *     summary: send invitation to the users from the imported file
 *     description: send invitation to the users from the imported file
 *     tags: [User Invite]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *         description: authorization token
 *     requestBody:
 *       description: upload csv to import user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uploadId:
 *                type: integer
 *           example: { "uploadId": 1 }
 *     responses:
 *       200:
 *         description: show success message
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": true, "code": 200, "message": "activation email is sent successfully", "data": {} }
 *       500:
 *         description: Server error
 *         content:
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
 *                 example:
 *                   success: true
 *                   code: 200
 *               example: { "success": false, "code": 500, "message": "Internal Error" }
 */
router.post(
  '/',
  auth,
  activationValidator.post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { uploadId: id } = req.body;

      const userImport = await db.UserImport.findOne({
        where: { id, isDeleted: '0' },
      });
      const file = await axios({
        method: 'GET',
        url: userImport.location,
        responseType: 'arraybuffer',
      });

      const wb = xlsx.read(file.data, { type: 'buffer' });
      const jsonArray = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        raw: true,
      });

      inviteUsersQueue.add({ id, jsonArray });

      return res.json(
        successRespSync({
          msg: success.ACTIVATION_MAIL_SENT,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
