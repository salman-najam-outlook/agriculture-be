const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /farm/validate/registrationno-farmname:
 *   post:
 *     summary: Farm name and registration number combine should be unique for all the user[Check That]
 *     description: Farm name and registration number combine should be unique for all the user[Check That]
 *     tags: [Farm]
 *     requestBody:
 *       description: Farm name and registration number combine should be unique for all the user[Check That]
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "farmName":"Michel'sFarm", "registrationNo":124434 }
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
 *                 example: { "success": true, "code": 200, "data": { "isUnique": true, "msg": "It is unique" } }
 */

router.post(
  '/registrationno-farmname',
  auth,
  validate.uniqueRegistrationNoFarmName(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // load function to check if the registration number and farm name is unique
      const { isUniqueRegNoAndFarmNameTogether } = require(rootPath +
        '/helpers/controller');

      const isUnique = await isUniqueRegNoAndFarmNameTogether(req);
      const msg = isUnique ? success.IS_UNIQUE : error.NOT_UNIQUE;
      // send response back to client
      return res.status(success.code.OK).json(
        await successRespSync({
          code: success.code.OK,
          data: { isUnique, msg },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
