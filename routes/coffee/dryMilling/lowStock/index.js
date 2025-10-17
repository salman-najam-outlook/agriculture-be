const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const fileUpload = require(rootPath + '/middleware/file_upload');
const { createPassword } = require(rootPath + '/helpers/hash');



/**
 * @swagger
 * /coffee/dry-milling/low-stock:
 *   post:
 *     summary: insert low stock value for dry milling
 *     description: insert low stock value for dry milling
 *     tags: [Dry Milling]
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
 *               parchmentBarcode:
 *                type: string
 *               quantity:
 *                type: integer
 *         
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
 *               example: { "success": true, "code": 200, "message": "low stock value inserted", "data": {} }
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
  async (req, res) => {
    try {
        
        // const {id:userId}=req.user;
        const userId=req.user.id;
        const {quantity} = req.body;
        
        const query = {quantity,userId}
       let lowStockRes = await db.dry_milling_low_stock.create(query);

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
