const { Router } = require('express');
const auth = require(rootPath + '/middleware/auth');
const { serverError } = require(rootPath + '/helpers/api');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');

const deforestationCallbackRouter = Router();

/**
 * @swagger
 * /user/deforestation/callback:
 *   post:
 *     summary: Run callback request for deforestation
 *     tags: [Callback]
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
 */
deforestationCallbackRouter.post('/', auth, async (req, res) => {
  try {
    console.log(req.user.id);
    const response = await syncFarmerDataToOCC(req.user.id);
    return res.json(response);
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = deforestationCallbackRouter;
