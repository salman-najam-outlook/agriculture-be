const express = require("express");
const router = express.Router();
// loading models
const db = require(rootPath + "/models");
// loading middleware
const auth = require(rootPath + "/middleware/auth");
// loading helpers
const { serverError, errorResp, successRespSync } = require(rootPath +
  "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { logErrorOccurred } = require(rootPath + "/helpers/general"); // constant messages

const { auditGetValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");


router.use('/soil', require('./soil'));

router.get(
  "/",
  auth,
  auditGetValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      console.log('req.body :>> ', req.body);
      const { page, limit, category } = req.body;
      let where = {};

      // check if category is not null and undefined
      if (category != null && category != undefined && category != "all") {
        where.category = category;
      }

      // generating query
      let query = {
        attributes: ["id", "question", "category"],
        offset: (page - 1) * limit,
        limit: limit,
        where,
      };

      // fetch data from DB
      let result = await db.Audit.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };

      // send response
      return res.json(
        successRespSync({
          msg: result == null ? success.NO_RESPONSE : success.FETCH,
          data: result,
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
 * /audit:
 *   post:
 *     summary: API to store audit question responses.
 *     description: API to store audit question responses.
 *     tags: [Soil audit]
 *     requestBody:
 *       description: API to store audit question responses
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example:
 *              {"farmId":1,"auditId":10,"question":"test","auditStatus":1,"category":"livestock | crop"}
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
 *                 example: {"success": true,"code": 200,"message": "Audit response is saved successfully.","data": {"id": 1,"userId": 171,"farmId": 1,"auditId": 10,"question": "test","auditStatus": 1,"category": "livestock","updatedAt": "2022-03-11T15:48:36.579Z","createdAt": "2022-03-11T15:48:36.579Z"}}
 */

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { farmId, auditId, question, auditStatus, category } = req.body;
    console.log('req.body :>> ', req.body);
    // set data to be inserted
    let set = { userId, farmId, auditId, question, auditStatus, category };

    // start the transaction
    const transaction = await db.sequelize.transaction();

    try {
      // Delete this data from DB
      await db.AuditResponse.destroy(
        {
          where: {
            userId,
            auditId,
            farmId,
            category,
          },
          transaction
        }
      );

      // Insert this data into DB
      let result = await db.AuditResponse.create(set, { transaction });

      // if all goes well commit transaction
      await transaction.commit();
      // send response
      return res.json(
        successRespSync({
          msg: success.AUDIT_RESPONSE_SAVED,
          data: result,
        })
      );
    } catch (err) {
      await transaction.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
