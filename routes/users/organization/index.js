const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/organization:
 *   get:
 *     summary: list users organizations
 *     description: get list of users organizations
 *     tags: [User Membership]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA
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
 *             example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "name": "Agzon" }, { "id": 2, "name": "NAGRAC" } ] }
 */
router.get('/', auth, validationErrorHandler, async (req, res) => {
  try {
    const { id: userId } = req.user;

    const organizations = await db.Organization.findAll({
      include: [
        {
          required: true,
          where: { userId },
          model: db.MapUserOrganization,
          as: 'mapUserOrganization',
          attributes: [],
        },
      ],
      attributes: ['id', 'name'],
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: organizations,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
