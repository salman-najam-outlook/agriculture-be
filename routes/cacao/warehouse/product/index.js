const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const warehouseValidator = require(rootPath +
  '/helpers/validators/warehouseCacao');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

router.post(
  '/name',
  auth,
  warehouseValidator.saveProductName(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, recordId } = req.body;

      const setProductName = { userId, name, recordId };
      let product = await db.CacaoWarehouseProduct.create(setProductName);
      product = await product?.toJSON();
      if (product) {
        delete product.createdAt;
        delete product.updatedAt;
        delete product.userId;
      }

      return res.json(
        successRespSync({
          msg: success.SAVE,
          data: product,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get('/name', auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await db.CacaoWarehouseProduct.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      where: { userId },
      raw: true,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: products,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
