const express = require('express'),
  router = express.Router(),
  db = require(rootPath + '/models'),
  { success } = require(rootPath + '/helpers/language'),
  { serverError, successRespSync } = require(rootPath + '/helpers/api');

const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { Op } = require('sequelize');

// /**
// * @swagger
// * /weed/method:
// *   post:
// *     summary: Create weed method
// *     description: Create weed method with name
// *     tags: [Weed method]
// *     parameters:
// *       - in: header
// *         name: oauth-token
// *         required: true
// *         schema:
// *           type: string
// *         description: authorization token
// *     requestBody:
// *       description: weed method name
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               name:
// *                 type: string
// *                 example: Mechanical
// *               parentId:
// *                 type: integer
// *                 description: 1 if falls under Cultural and 2 for application (optional param)
// *     responses:
// *       200:
// *         description: Returns the weed method JSON
// *       500:
// *         description: Server error
// */
//
// router.post('/', async function(req, res) {
//   try {
//     if(!req.body.name){
//       return res.status(error.code.SERVER_ERROR).json(await errorResp({
//         msg: 'name is required'
//       }));
//     }
//     if(req.body.parentId && req.body.parentId != 1 && req.body.parentId != 2){
//       return res.status(error.code.SERVER_ERROR).json(await errorResp({
//         msg: 'Invalid parentId'
//       }));
//     }
//     let data = {
//       userId: req.user.id,
//       name: req.body.name
//     };
//     if(req.body.parentId) data.parentId = req.body.parentId;
//     let result = await db.WeedMethod.findOrCreate({
//       where: data,
//       defaults: data
//     });
//     return res.json(
//       successRespSync({
//         msg: success.WEED_METHOD_CREATED,
//         data: result[0],
//       })
//     );
//   } catch (err) {
//     logErrorOccurred(__filename, err);
//     return res.status(error.code.SERVER_ERROR).json(await errorResp());
//   }
// });

/**
* @swagger
* /weed/method:
*   get:
*     summary: Get weed method list
*     description: Get the list of weeding methods
*     tags: [Weed]
*     parameters:
*       - in: header
*         name: oauth-token
*         required: true
*         schema:
*           type: string
*         description: authorization token
*       - in: query
*         name: limit
*         required: false
*         schema:
*           type: Integer
*         description: Number of records you want to fetch
*       - in: query
*         name: offset
*         required: false
*         schema:
*           type: Integer
*         description: The number of records to skip before starting to collect the result set
*       - in: query
*         name: parentId
*         required: false
*         schema:
*           type: Integer
*         description: The method id (1 or 2)
*       - in: query
*         name: getAllData
*         required: false
*         schema:
*           type: Integer
*         description: Send 1 for getting all records at once
*     responses:
*       200:
*         description: Returns the list of weeding methods
*       500:
*         description: Server error
*/

router.get('/', function(req, res){
  let limit = parseInt(req.query.limit || 10);
  let offset = parseInt(req.query.offset || 0);
  let query = {
    ...((!req.query?.getAllData || req.query?.getAllData==0) && {
      limit,
      offset,
    }),
    where: {
      //userId: req.user.id
    },
  };
  if (req.query.parentId) {
    if (Array.isArray(JSON.parse(req.query.parentId))) {
      query.where.parentId = {
        [Op.or]: {
          [Op.in]: JSON.parse(req.query.parentId),
          [Op.eq]: null
        }
      }
    } else {
      query.where.parentId = req.query.parentId
    }
  } else {
    query.where.parentId = {
      [Op.eq]: null
    }
  }

  db.WeedMethod.findAndCountAll(query)
    .then((Allresult) => {
      var results = Allresult.rows;
      res.setHeader('X-Pagination-Count', Allresult.count);
      res.setHeader('X-Pagination-Limit', limit);
      res.setHeader('X-Pagination-Offset', offset);
      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: results,
        })
      );
    })
    .catch(async function (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    });
});
module.exports = router;
