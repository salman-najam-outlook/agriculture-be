const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const {
  successResp,
  serverError,
  successRespSync,
  errorResp,
} = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");

router.use("/animal", require("./animal"));

/**
 * @swagger
 * /list/options:
 *   get:
 *     summary: Fetch options from the option table using groupName and name(for searching puporse)
 *     description: Fetch options from the option table using groupName and name(for searching puporse)
 *     tags: [Options]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Name
 *       - in: query
 *         name: country
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Country Flag
 *       - in: query
 *         name: groupName
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Group name
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 15, "info": [ { "info": null, "id": 235, "name": "Cattle farm yard manure", "recordId": null } ] } }
 */

router.get(
  "/options",
  auth,
  translation,
  validate.optionValidationGet(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, name, groupName } = req.query;
      const userId = req.user.id;
      const orgId = req.user.organization;
      let where = { groupName };
      // check if search is not null and undefined
      if (notEmpty(name)) {
        where.name = {
          [Op.like]: "%" + name + "%",
        };
      }

      if (groupName === "certification") {
        const globalCertifications = [
          "Global G.A.P.",
          "Rainforest Alliance",
          "Fair Trade",
          "Organic",
          "Woman's Hand",
          "Carbon Neutral",
        ];

        // where.name = {
        //   [Op.in]: globalCertifications,
        // };

        where[Op.or] = [
          { name: { [Op.in]: globalCertifications } },
          {
            userId: {
              [db.Sequelize.Op.in]: db.sequelize.literal(`(
                SELECT id FROM users WHERE organization = ${db.sequelize.escape(orgId)}
              )`),
            },
          },
        ];
      } else{
        where.userId = {
          [Op.or]: [{ [Op.eq]: null }, { [Op.eq]: userId }],
        };
      }
      
      // generating query
      let query = {
        attributes: ["id", "name", "userId", "info", "recordId"],
        where,
      };
      // check if page and limit is not empty
      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);

        query.offset = (page - 1) * limit;
        query.limit = limit;
      }

      if (groupName === 'crop-type') {
        where.countryCode = req.user.countryIsoCode
      }

      // fetch data from DB
      let result = await db.Option.findAll(query);
      let resultCpy = JSON.parse(JSON.stringify(result))
      resultCpy = resultCpy.map(el => {
        el.codeName = el.name
        return el
      })

      result = {
        num_rows: result.length,
        data: resultCpy,
      };

      if (req.headers.lang && req.headers.lang != "en") {
        result.data = req.translateFunction(
          result.data,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
          }
        );
      }

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
 * /list/options/all
 * used for offline module
 */

router.get("/options/all", auth, translation, async (req, res) => {
  try {
    let result = await db.Option.findAll({
      attributes: ["groupName", "id", "name", "info"],
    });

    if (req.headers.lang && req.headers.lang != "en") {
      result = req.translateFunction(result, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
    }

    const data = result.map((option) => {
      return {
        groupName: option.groupName,
        id: option.id,
        name: option.name,
        points: option.info ? option.info.points : null,
      };
    });

    // send response
    return res.json(
      successRespSync({
        msg: data == null ? success.NO_RESPONSE : success.FETCH,
        data: data,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /list/options:
 *   post:
 *     summary: Get multiple option listing at once
 *     description: Get multiple option listing at once
 *     tags: [Options]
 *     requestBody:
 *       description: Get multiple option listing at once
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example: { options: ["farming-goals", "propagation"] }
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "farming-goals": [ { "id": 18, "name": "increase crop yield" }, { "id": 19, "name": "Improve livestock breeds" }, { "id": 20, "name": "improve soil health" }, { "id": 21, "name": "Maximize income" }, { "id": 102, "name": "Increase animal yield" }, { "id": 103, "name": "Optimize cost" }, { "id": 104, "name": "Improve the quality of produce" }, { "id": 105, "name": "Decrease animal death rate" }, { "id": 106, "name": "Improve reproductive performance" }, { "id": 107, "name": "Improve animal welfare" }, { "id": 108, "name": "Improve adaptation to climate change" } ], "propagation": [ { "id": 31, "name": "seed" }, { "id": 32, "name": "vegetative" } ] } }
 */

// Get multiple option listing at once
router.post(
  "/options",
  auth,
  translation,
  validate.optionValidationPost(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let response = {};
      let { options } = req.body;

      // loop all the options and fetch the list
      for (let option of options) {
        let result = await db.Option.findAll({
          attributes: ["id", "name"],
          where: { groupName: option },
        });
        // set response
        response[option] = result;
      }

      if (req.headers.lang && req.headers.lang != "en") {
        req.translateFunction(response, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }

      // send response
      res.json(
        await successResp({
          msg: success.FETCH,
          data: response,
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
 * /list/synthetic-fertilizers:
 *   get:
 *     summary: get synthetic-fertilizers option list
 *     description: get synthetic-fertilizers option list
 *     tags: [Options]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "name": "Urea", "n": null, "p": null, "k": null, "userId": null, "recordId": null } ] }
 */
router.get("/synthetic-fertilizers", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    // fetch Synthetic fertilizersm list
    let result = await db.SyntheticFertilizers.findAll({
      attributes: ["id", "name", "n", "p", "k", "userId", "recordId"],
      where: {
        [Op.or]: [
          {
            userId: null,
          },
          {
            userId,
          },
        ],
      },
    });
    // send response
    if (req.headers.lang && req.headers.lang != "en") {
      req.translateFunction(result, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
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
});

/**
 * @swagger
 * /list/synthetic-fertilizers:
 *   post:
 *     summary: add options for synthetic fertilizers
 *     description: add options for synthetic fertilizers
 *     tags: [Options]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                n:
 *                  type: string
 *                p:
 *                  type: string
 *                k:
 *                  type: string
 *                recordId:
 *                  type: string
 *            example: { "name": "Urea test", "n": 1, "p": 3, "k": 5, "recordId": "334343434" }
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
 *                 example: { "success": true, "code": 200, "message": "Data Added", "data": { "id": 24, "userId": 17, "name": "Urea test2", "n": 1, "p": 3, "k": 5, "requestId": "334343434", "updatedAt": "2022-08-19T06:24:32.526Z", "createdAt": "2022-08-19T06:24:32.526Z" } }
 */
router.post(
  "/synthetic-fertilizers",
  auth,
  validate.createSyntheticFertilizer(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    try {
      let fertilizerAdd = {};
      const userId = req.user.id;
      let { name, n = "0%", p = "0%", k = "0%", recordId = "" } = req.body;
      if (!recordId) {
        fertilizerAdd = await db.SyntheticFertilizers.create({
          userId,
          name,
          n,
          p,
          k,
          recordId,
        });
      }
      if (recordId) {
        const getFertilizerByRequestId = await db.SyntheticFertilizers.findOne({
          where: {
            recordId,
          },
        });
        if (getFertilizerByRequestId) {
          const fertilizerUpdate = await db.SyntheticFertilizers.update(
            {
              name,
              n,
              p,
              k,
              userId,
            },
            {
              where: {
                recordId,
              },
            }
          );
          if (fertilizerUpdate) {
            fertilizerAdd = getFertilizerByRequestId;
          }
        } else {
          fertilizerAdd = await db.SyntheticFertilizers.create({
            userId,
            name,
            n,
            p,
            k,
            recordId,
          });
        }
      }

      // send response
      if (req.headers.lang && req.headers.lang != "en") {
        req.translateFunction(fertilizerAdd, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      return res.json(
        successRespSync({
          msg: "Data Added",
          data: fertilizerAdd,
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
 * /list/organic-inputs:
 *   post:
 *     summary: add options for organic-inputs
 *     description: add options for organic-inputs
 *     tags: [Options]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                requestId:
 *                  type: string
 *            example: { "name": "Urea test", "requestId": "334343434" }
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
 *                 example: { "success": true, "code": 200, "message": "Data Added", "data": { "id": 2, "userId": 17, "name": "test2", "requestId": "334343434", "updatedAt": "2022-08-19T06:28:17.111Z", "createdAt": "2022-08-19T06:28:17.111Z" } }
 */
router.post(
  "/organic-inputs",
  auth,
  validate.createOrganicInputs(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    try {
      let fertilizerAdd = {};
      const userId = req.user.id;
      let { name, requestId = "" } = req.body;
      if (!requestId) {
        fertilizerAdd = await db.OrganicInputs.create({
          userId,
          name,
          requestId,
        });
      }
      if (requestId) {
        const getFertilizerByRequestId = await db.OrganicInputs.findOne({
          where: {
            requestId,
          },
        });
        if (getFertilizerByRequestId) {
          const fertilizerUpdate = await db.OrganicInputs.update(
            {
              name,
              userId,
            },
            {
              where: {
                requestId,
              },
            }
          );
          if (fertilizerUpdate) {
            fertilizerAdd = getFertilizerByRequestId;
          }
        } else {
          fertilizerAdd = await db.OrganicInputs.create({
            userId,
            name,
            requestId,
          });
        }
      }

      // send response
      if (req.headers.lang && req.headers.lang != "en") {
        req.translateFunction(fertilizerAdd, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      return res.json(
        successRespSync({
          msg: "Data Added",
          data: fertilizerAdd,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/organic-inputs", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    // fetch Synthetic fertilizersm list
    let result = await db.OrganicInputs.findAll({
      attributes: ["id", "name", "userId", "requestId"],
      where: {
        [Op.or]: [
          {
            userId: null,
          },
          {
            userId,
          },
        ],
      },
    });
    // send response
    if (req.headers.lang && req.headers.lang != "en") {
      req.translateFunction(result, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
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
});

/**
 * @swagger
 * /list/soil-organic-input:
 *   post:
 *     summary: add options for soil-organic-inputs
 *     description: add options for soil-organic-inputs
 *     tags: [Options]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                recordId:
 *                  type: string
 *            example: { "name": "test3", "recordId": "334343434" }
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
 *                 example: { "success": true, "code": 200, "data": { "id": 841, "groupName": "soil-organic-input", "name": "test3", "userId": 17, "updatedAt": "2022-08-19T10:56:01.113Z", "createdAt": "2022-08-19T10:56:01.113Z" } }
 */
router.post(
  "/soil-organic-input",
  auth,
  duplicateRecordId.handleDuplicateRecordId("Option"),
  validate.createSoilOrganicInputs(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, recordId = null } = req.body;
      const groupName = "soil-organic-input";

      const set = { groupName, name, recordId, userId };

      const result = await db.Option.create(set);

      if (req.headers.lang && req.headers.lang != "en") {
        req.translateFunction(result, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      return res.json(
        successRespSync({
          msg: success.SAVED,
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
