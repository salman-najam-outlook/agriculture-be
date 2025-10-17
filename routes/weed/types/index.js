const express = require('express'),
  router = express.Router(),
  db = require(rootPath + '/models'),
  { success } = require(rootPath + '/helpers/language'),
  { serverError, successRespSync } = require(rootPath + '/helpers/api');

const { logErrorOccurred } = require(rootPath + '/helpers/general');
//
// /**
// * @swagger
// * /weed/type:
// *   post:
// *     summary: Create weed type
// *     description: Create weed type with name
// *     tags: [Weed type]
// *     parameters:
// *       - in: header
// *         name: oauth-token
// *         required: true
// *         schema:
// *           type: string
// *         description: authorization token
// *     requestBody:
// *       description: weed type name
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               name:
// *                 type: string
// *                 example: Spear grass
// *     responses:
// *       200:
// *         description: Returns the weed type JSON
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
//     let data = {
//       userId: req.user.id,
//       name: req.body.name
//     };
//     let result = await db.WeedType.findOrCreate({
//       where: data,
//       defaults: data
//     });
//     return res.json(
//       successRespSync({
//         msg: success.WEED_TYPE_CREATED,
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
* /weed/type:
*   get:
*     summary: Get weed type list
*     description: Get the list of weeding types
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
*         name: getAllData
*         required: false
*         schema:
*           type: Integer
*         description: Send 1 for getting all records at once
*     responses:
*       200:
*         description: Returns the list of weeding types
*       500:
*         description: Server error
*/

router.get('/', function(req, res){
  let limit = parseInt(req.query.limit || 10);
  let offset = parseInt(req.query.offset || 0);

  db.WeedType.findAndCountAll({
    ...((!req.query?.getAllData || req.query?.getAllData==0) && {
      limit,
      offset,
    }),
    // where: {
    //   userId: req.user.id
    // }
  })
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
