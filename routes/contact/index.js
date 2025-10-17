const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
// loading models
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const mailer = require(rootPath + '/components/mailer');
const { errorRespSync, serverError, successRespSync } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general'); // constant messages
// validation modules
const { contactUsValidator } = require(rootPath +
  '/helpers/validators/contact');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

// const {
//     contactUsValidator
//   } = require('./utils');

/**
 * @desc Help desk : Contact us form
 */
/**
 * @swagger
 * /contact:
 *   post:
 *     description: Submit contact us form
 *     tags: [ContactUs]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new contact us inquiry
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {"email": "abc@gmail.com","categoryId":1,"subject":"Subject","message": "message"}
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       title:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Your inquiry has been submitted successfully.
 *        '409':
 *           description: Conflict
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       title:
 *                        type: string
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Category selected does not exist.
 *
 */
router.post(
  '/',
  auth,
  contactUsValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { email, categoryId, subject, message } = req.body;
      const exists = await db.contact_us_category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (exists === null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: 'Category selected does not exist.',
            code: error.code.CONFLICT,
          })
        );
      }
      const set = {
        userId,
        email,
        categoryId,
        subject,
        message,
      };
      const result = await db.contact_us.create(set, {
        transaction: t,
      });
      var data = {
        email: email,
        message: message,
        subject: subject,
        categoryName: exists.name,
      };
      await mailer.renderAndSend(
        process.env.ADMIN_EMAIL || 'dev@dimitra.io',
        data,
        'contact/contact_us.html',
        'Help desk: Contact us'
      );
      await t.commit();
      return res.json(
        successRespSync({
          msg: 'Your inquiry has been submitted successfully.',
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
