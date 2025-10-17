// const express = require('express');
// const moment = require('moment');
// const router = express.Router();
// const auth = require(rootPath + '/middleware/auth');
// const db = require(rootPath + '/models');
// const { Op, Sequelize } = require('sequelize');
// const { errorRespSync } = require('../../../helpers/api');
// const { successRespSync, serverError } = require(rootPath + '/helpers/api');
// const { success, error } = require(rootPath + '/helpers/language');
// const { logErrorOccurred } = require(rootPath + '/helpers/general');
// const { productionTargetValidations, productionTargetEditValidations } = require('../../../helpers/validation');
// const validationErrorHandler = require('../../../middleware/validation_error_handler');
// const { isEmpty } = require('lodash');

// /**
//  * @swagger
//  * /production-target/dry-milling:
//  *   post:
//  *     description: Add Production Target For Dry Milling
//  *     tags: [Coffee]
//  *     parameters:
//  *      - in: header
//  *        name: oauth-token
//  *        required: true
//  *        schema:
//  *          type: string
//  *        example:
//  *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
//  *     requestBody:
//  *       description: Request body for submitting Target
//  *       required: true
//  *       content:
//  *         application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                target:
//  *                  type: integer
//  *                year:
//  *                  type: integer
//  *              required:
//  *                - target
//  *                - year
//  *            example:
//  *              {
//  *                "target": 2000,
//  *                "year": 2022
//  *              }
//  *     responses:
//  *        '200':
//  *           description: Success
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                 example:
//  *                   success: true
//  *                   code: 200
//  *                   message: Target saved successfully.
//  *
//  */

// router.post('/dry-milling', auth, productionTargetValidations(), validationErrorHandler, async (req, res) => {
//    try {  
//         const userId = req.user.id;
//         const currentYear = moment().format("YYYY");
//         let { target, year } = req.body;
//         console.log(year);
//        // Check If year is from past
//         if(year < currentYear){
//             return res.status(error.code.SERVER_ERROR).json(
//                 errorRespSync({
//                     msg: "Year Cannot be from Past"
//                 })
//             )
//         }

//         // Check If target Already set for this year
//         const isRecordExist = await db.dryMilling_perYear_target.findOne({
//             where: {
//                 userId, year
//             }
//         })

//         if(isRecordExist){
//             return res.json(
//                 errorRespSync({
//                   code: error.code.CONFLICT,
//                   msg: error.TARGET_EXIST,
//                 })
//               );
//         }

//         let set = {userId, target, year};

//         const transaction = await db.sequelize.transaction();
//         try {
//             await db.dryMilling_perYear_target.create(set, { transaction });
//             await transaction.commit();
//             return res.json(
//                 successRespSync({
//                   msg: success.TARGET_ADDED
//                 })
//               )
//         } catch (err) {
//             await transaction.rollback()
//             logErrorOccurred(__filename, err);
//             return serverError(res, err);
//         }

//    } catch (err) {
//     logErrorOccurred(__filename, err);
//     return serverError(res, err);
//    }
// })

// /**
//  * @swagger
//  * /production-target/dry-milling/list:
//  *   get:
//  *     description: Get All Set targets
//  *     tags: [Coffee]
//  *     parameters:
//  *      - in: header
//  *        name: oauth-token
//  *        required: true
//  *        schema:
//  *          type: string
//  *        example:
//  *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
//  *     responses:
//  *        '200':
//  *           description: Success
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                 example:
//  *                   success: true
//  *                   code: 200
//  *                   message: Fetched Successfully.
//  *
//  */

// router.get('/dry-milling/list', auth, async (req, res) => {
//     try {  
//         const userId = req.user.id;

//         // Check If target Already set for this year
//         const targetRecord = await db.dryMilling_perYear_target.findAll({
//             attributes: ['id','target', 'year'],
//             where: {
//                 userId
//             },
//             order : [['year', 'desc']],
//             limit: 10,
//             raw: true
//         })
        
//         return res.json(
//             successRespSync({
//                 msg: success.FETCH,
//                 data: {
//                     numRows: targetRecord?.length ?? 0, 
//                     targetRecord
//                 },
//             })
//         );
//     } catch (err) {
//      logErrorOccurred(__filename, err);
//      return serverError(res, err);
//     }
// })

// /**
//  * @swagger
//  * /production-target/dry-milling/{id}:
//  *   put:
//  *     description: Update Production Target For Dry Milling
//  *     tags: [Coffee]
//  *     parameters:
//  *      - in: header
//  *        name: oauth-token
//  *        required: true
//  *        schema:
//  *          type: string
//  *        example:
//  *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
//  *      - in: path
//  *        name: id
//  *        description: Target id
//  *        schema:
//  *          type: integer
//  *     requestBody:
//  *       description: Request body for Updating Target
//  *       required: true
//  *       content:
//  *         application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                target:
//  *                  type: integer
//  *              required:
//  *                - target
//  *            example:
//  *              {
//  *                "target": 2000
//  *              }
//  *     responses:
//  *        '200':
//  *           description: Success
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                 example:
//  *                   success: true
//  *                   code: 200
//  *                   message: Target updated successfully.
//  *
//  */

// router.put('/dry-milling/:id', auth, productionTargetEditValidations(), validationErrorHandler, async (req, res) => {
//     try {  
//         const userId = req.user.id, currentYear = moment().format("YYYY");;
//         let id = req.params.id;
//         let { target } = req.body;

//         // Check If target Already set for this year
//         const targetRecord = await db.dryMilling_perYear_target.findOne({
//             where: {
//             id, userId
//             }
//         })
        
//         if(isEmpty(targetRecord)){
//             return res.json(
//                 errorRespSync({
//                     code: error.code.NOT_FOUND,
//                     msg: error.TARGET_NOT_FOUND,
//                 })
//             );
//         }
//         if(targetRecord.year < currentYear){
//         return res.status(error.code.SERVER_ERROR).json(
//             errorRespSync({
//                 msg: "You cannot Edit data of Past"
//             })
//         )
//         }
        
//         let set = {target};

//         const transaction = await db.sequelize.transaction();
//         try {
//             // Updating the Target
//             await db.dryMilling_perYear_target.update(set, {
//                 where: {
//                     id
//                 }
//             }, { transaction });

//             await transaction.commit();
//             return res.json(
//                 successRespSync({
//                 msg: success.TARGET_UPDATED
//                 })
//             )
//         } catch (err) {
//             await transaction.rollback()
//             logErrorOccurred(__filename, err);
//             return serverError(res, err);
//         }
//     } catch (err) {
//      logErrorOccurred(__filename, err);
//      return serverError(res, err);
//     }
// })

// module.exports = router;