const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { serverError, successRespSync } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validationErrorHandler = require(rootPath +
    "/middleware/validation_error_handler");

/**
 * @swagger
 * /contact/category:
 *   get:
 *     description: Returns all help desk category 
 *     tags: [ContactUs]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{id: 1, name: General inquiry}]
 *
 *
 */
router.get(
    "/",
    auth,
    translation,
    validationErrorHandler,
    async (req, res) => {
        
        try {
            let orderBy = [["createdAt", "ASC"]];            
            const userId = req.user.id;
            let query = {
                raw: true,                
                order: orderBy,
                attributes: [
                    "id",
                    "name",
                ]
            };
            // fetch data from DB
            let result = await db.contact_us_category.findAll(query);
            if (req.headers.lang && req.headers.lang != 'en') {
                result = req.translateFunction(result, globalTranslationCache, {
                    lvl1: true,
                    lvl2: false,
                  })
            }

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

module.exports = router;