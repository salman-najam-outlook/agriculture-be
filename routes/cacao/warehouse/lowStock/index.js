const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const fileUpload = require(rootPath + '/middleware/file_upload');
const { createPassword } = require(rootPath + '/helpers/hash');



router.post(
  '/',
  auth,
  async (req, res) => {
    try {
        
        // const {id:userId}=req.user;
        const userId=req.user.id;
        const {quantity} = req.body;
        
        const query = {quantity,userId}
       let lowStockRes = await db.CacaoLowStock.create(query);

        return res.json(
            successRespSync({
                msg: "Low Stock value Inserted",
                data: lowStockRes
            })
        );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
