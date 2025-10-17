const express = require("express");
const router = express.Router();
var Sequelize = require("sequelize");
const {
  currencySettingCreate,
} = require("../../../helpers/validators/settings");

// loading models
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const {
  errorResp,
  successRespSync,
  successResp,
  errorRespSync,
  serverError,
} = require(rootPath + "/helpers/api");
const { error, success } = require(rootPath + "/helpers/language"); // constant messages
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general"); // constant messages
// validation modules
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + '/middleware/translation');

/**
 * @swagger
 * /settings/currency:
 *   get:
 *     description: Fetch currency settings of the user
 *     tags: [Settings - Currency]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         description: On success response if data is present.
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
 *               example:
 *                    success: true
 *                    code: 200
 *                    message: Currency Setting fetched successfully.
 *                    data:
 *                      currencyId: 3
 *                      currency:
 *                        id: 3
 *                        symbol: $
 *                        abbreviation: USD
 *                        name: United States dollar
 *                        createdAt: 2022-05-19T08:58:21.000Z
 *                        updatedAt: 2022-05-19T08:58:21.000Z
 *
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const currencySetting = await db.UserCurrencySettings.findOne({
      where: { userId: userId },
      include: [{ model: db.Currency, as: "currency" }],
    });

    const globalCurrencySetting =
      !currencySetting &&
      (await db.GlobalSetting.findOne({
        where: {},
        include: [{ model: db.Currency, as: "currency" }],
      }));

    return res.json(
      successRespSync({
        msg: success.CURRENCY_SETTING_FETCHED,
        data: {
          currencyId:
            currencySetting?.currencyId || globalCurrencySetting?.currencyId,
          currency:
            currencySetting?.currency || globalCurrencySetting?.currency,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

const updateExistingSetting = async (req, res, transaction) => {
  try {
    const userId = req.user.id;

    const updatedData = await db.UserCurrencySettings.update(
      {
        currencyId: req.body.currencyId,
      },
      { where: { userId: userId } }
    );

    return res.json(
      successRespSync({
        msg: success.CURRENCY_SETTING_UPDATED,
        data: updatedData,
      })
    );
  } catch (err) {
    await transaction?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
};

/**
 * @swagger
 * /settings/currency:
 *   post:
 *     description: Save curreny Setting of user. If setting of user aleady exists, it updates
 *     tags: [Settings - Currency]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: Saves Currency Settings of User
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                currencyId:
 *                  type: integer
 *                  required: true
 *     responses:
 *       200:
 *         description: Successfully return the response if save is successfull
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Storage Setting saved successfully.
 *                  data:
 *                    id: 2
 *                    userId: 246
 *                    currencyId: 1
 *                    updatedAt: 2022-07-26T15:46:06.221Z
 *                    createdAt: 2022-07-26T15:46:06.221Z
 *
 *
 */
router.post(
  "/",
  auth,
  translation,
  currencySettingCreate(),
  validationErrorHandler,
  async (req, res) => {
    const userId = req.user.id;

    const transaction = await db.sequelize.transaction();
    try {
      const existingSetting = await db.UserCurrencySettings.findOne({where: {
        userId
      }});
      if (existingSetting) {
        await db.UserCurrencySettings.update(
          {
            currencyId: req.body.currencyId,
          },
          { where: { userId: userId } },
          {
            transaction,
          }
        );
      } else {
        await db.UserCurrencySettings.create(
          {
            userId,
            currencyId: req.body.currencyId,
          },
          {
            transaction,
          }
        );
      }

      await transaction.commit();

      const _currencySetting = await db.UserCurrencySettings.findOne({
        where: { userId: userId },
        include: [{ model: db.Currency, as: "currency" }],
      });

      const message = req.translateFunction({name:success.CURRENCY_SETTING_ADDED}, globalTranslationCache, {
        lvl1: true,
        lvl2: false
      })

      return res.json(
        successRespSync({
          msg: message.name,
          data: _currencySetting,
        })
      );
    } catch (err) {
      console.log(err)
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /settings/currency:
 *   delete:
 *     description: Delete currency setting of user
 *     tags: [Settings - Currency]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Currency Setting deleted successfully.
 *                 data:
 */
router.delete("/", auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.user.id;
    const currencySetting = await db.UserCurrencySettings.findOne({
      where: {
        userId: userId,
      },
    });
    if (currencySetting === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.TARGET_NOT_FOUND,
        })
      );
    }

    await db.UserCurrencySettings.destroy(
      {
        where: {
          id: currencySetting.id,
        },
      },
      { transaction: t }
    );

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.CURRENCY_SETTING_DELETED,
        data: {},
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
