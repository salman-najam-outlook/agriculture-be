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
// const { productionChartValidations } = require('../../../helpers/validation');
// const validationErrorHandler = require('../../../middleware/validation_error_handler');
// const { isEmpty } = require('lodash');


// /**
//  * @swagger
//  * /production-chart/farmer:
//  *   get:
//  *     description: Get Production chart For Farmer
//  *     tags: [Coffee]
//  *     parameters:
//  *      - in: header
//  *        name: oauth-token
//  *        required: true
//  *        schema:
//  *          type: string
//  *        example:
//  *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
//  *      - in: query
//  *        name: filterType
//  *        required: true
//  *        description: choose from ['list', 'graph']
//  *        schema:
//  *          type: string
//  *      - in: query
//  *        name: duration
//  *        description: choose from ['year', 'month'] - if Empty you will receive current year data
//  *        schema:
//  *          type: string
//  *      - in: query
//  *        name: data
//  *        description: choose from if Year ['2022', '2021'] or If month ['01', '02']
//  *        schema:
//  *          type: integer
//  *      - in: query
//  *        name: yearWithMonth
//  *        description: If duration is month then send year otherwise you will receive for current year
//  *        schema:
//  *          type: integer
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
//  *                   message: Fetched successfully.
//  *
//  */

// router.get('/farmer', auth, productionChartValidations(), validationErrorHandler, async (req, res) => {
//     try {
//         const user_id = req.user.id;
//         let targetedValue = 0, finalTargetedYield = 0, finalScore = 0, currentYear = moment().format('YYYY'), currentMonth = moment().format('MM'), yearToFindYield = null, monthToFind = null, productionChartData = [], condtion = null;

//         // Check If Filter Type is graph and compose data and condition according to duration 
//         if (req.query.filterType && req.query.filterType == 'graph') {
//             if (isEmpty(req.query.duration) || req.query.duration === 'year') {
//                 yearToFindYield = req.query.data ? req.query.data : currentYear;
//                 term = 'YEAR';
//                 condtion = {
//                     [Op.and]: [
//                         Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchasedAt')), yearToFindYield)
//                     ],
//                 }
//             }
//             if (req.query.duration === 'month') {
//                 yearToFindYield = req.query.yearWithMonth ? req.query.yearWithMonth : currentYear;
//                 monthToFind = req.query.data ? req.query.data : currentMonth;
//                 term = 'MONTH';
//                 condtion = {
//                     [Op.and]: [
//                         Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchasedAt')), yearToFindYield),
//                         Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('purchasedAt')), monthToFind)
//                     ],
//                 }
//             }
            
//             // Getting the Expected Yields of all plantation to get targeted value
//             const expectedYield = await db.Plantations.findAll({
//                 attributes: ['expected_yield', 'createdAt'],
//                 where: {
//                     [Op.and]: [
//                         Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearToFindYield),
//                     ],
//                     user_id,
//                     is_deleted: false
//                 },
//                 raw: true
//             })
//             if (expectedYield) {
//                 expectedYield.forEach(element => {
//                     console.log(element);
//                     targetedValue += element.expected_yield;
//                 });
//             }

//             finalTargetedYield = targetedValue;
//             if (req.query.duration === 'month') {
//                 finalTargetedYield = targetedValue / 12;
//             }
//             // Getting Selling Data of farmer
//             const farmerSoldData = await db.BuyingStationOrder.findAll({
//                 attributes: ['coffeeCherryQty', 'purchasedAt'],
//                 where: {
//                     ...condtion,
//                     farmerId: user_id,
//                     isdeleted: null
//                 },
//                 raw: true
//             })
//             if(isEmpty(farmerSoldData)){
//                 return res.json(
//                     errorRespSync({
//                         msg: "No Data Available for this month"
//                     })
//                 )
//             }
//             if (farmerSoldData) {
//                 farmerSoldData.forEach(element => {
//                     finalScore += element.coffeeCherryQty;
//                 });
//             }
//             // composing Final Data to send to front end
//             productionChartData.push({
//                 "targetedValue": finalTargetedYield,
//                 "finalScore": finalScore
//             })
//         }

//         // If Filter Type is list
//         if (req.query.filterType && req.query.filterType == 'list') {
            
//             // Getting Yield Data from plantation for that user
//             const yieldData = await db.Plantations.findAll({
//                 where: {
//                     user_id,
//                     is_deleted: false
//                 },
//                 attributes: [
//                     [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
//                     [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
//                 ],
//                 group: 'year',
//                 raw: true
//             })
            
//             // Getting Final Score From Orders Table
//             const soldData = await db.BuyingStationOrder.findAll({
//                 where: {
//                     farmerId: user_id,
//                     isdeleted: null
//                 },
//                 attributes: [
//                     [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
//                     [Sequelize.fn('sum', Sequelize.col('coffeeCherryQty')), 'finalScore'],
//                 ],
//                 group: 'year',
//                 raw: true
//             })
            
//             for (const data of yieldData) {
//                 const soldRec = soldData.find((x) => data.year == x.year);
//                 if(soldRec){
//                     let finaData = { targetedValue: data.totalExpectedYield, finalScore: soldRec.finalScore, year: data.year};
//                     productionChartData.push(finaData);
//                 } 
                
//             }
//         }

//         return res.json(
//             successRespSync({
//                 msg: success.FETCH,
//                 data: {
//                     numRows: productionChartData?.length ?? 0, 
//                     productionChartData
//                 },
//             })
//         );
//     } catch (err) {
//         logErrorOccurred(__filename, err);
//         return serverError(res, err);
//     }
// })

// /**
//  * @swagger
//  * /production-chart/farmer/getPDFReport:
//  *   get:
//  *     description: Get Production chart PDF For Farmer
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
//  *                   message: Fetched successfully.
//  *
//  */

// router.get('/farmer/getPDFReport', auth, async (req, res) => {
//     try {
//         const user_id = req.user.id;
//         const userName = await db.user.findOne({
//             attributes: ['firstName', 'lastName'],
//             where: {
//               id: user_id
//             }
//         })
//         let productionChartData = [];
            
//         // Getting Yield Data from plantation for that user
//         const yieldData = await db.Plantations.findAll({
//             where: {
//                 user_id,
//                 is_deleted: false
//             },
//             attributes: [
//                 [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
//                 [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
//             ],
//             group: 'year',
//             raw: true
//         })
//         // Getting Final Score From Orders Table
//         const soldData = await db.BuyingStationOrder.findAll({
//             where: {
//                 farmerId: user_id,
//                 isdeleted: null
//             },
//             attributes: [
//                 [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
//                 [Sequelize.fn('sum', Sequelize.col('coffeeCherryQty')), 'finalScore'],
//             ],
//             group: 'year',
//             raw: true
//         })
        
//         for (const data of yieldData) {
//             const soldRec = soldData.find((x) => data.year == x.year);
//             if(soldRec){
//                 let finalData = { annualAnalysis: data.totalExpectedYield-soldRec.finalScore, targetedValue: data.totalExpectedYield, finalScore: soldRec.finalScore, year: data.year};
//                 productionChartData.push(finalData);
//             } 
            
//         }

//         console.log(productionChartData);
//         if (productionChartData.length > 0) {
//             const data =  {
//               title: 'Farmer Production Report',
//               subHeader: {
//                 user_name: `${userName.firstName} ${userName.lastName}`,
//                 type: 'Yearly Report',
//               },
//               tableData: productionChartData.map(item => ({
//                 annual_analysis: item.annualAnalysis,
//                 year: item.year,
//                 target_value: item.targetedValue,
//                 final_value: item.finalScore
//               }))
//             }
//             const pdfData = await generatePDF(data)
//             if (!pdfData) {
//               return res.json(
//                 errorRespSync({
//                   msg: "PDF report generation failed."
//                 })
//               )
//             } else {
//               res.writeHead(200, {
//                 "Content-Type": "application/octet-stream",
//                 "Content-Disposition": "attachment; filename=" + pdfData.fileName
//               });
//               fs.createReadStream(pdfData.path).pipe(res)
//               return
//             }
//         }
//     } catch (err) {
//         logErrorOccurred(__filename, err);
//         return serverError(res, err);
//     }
// })

// /**
//  * @swagger
//  * /production-chart/farmer/offline:
//  *   get:
//  *     description: Get Production chart For Farmer offline
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
//  *                   message: Fetched successfully.
//  *
//  */

// router.get('/farmer/offline', auth, async (req, res) => {
//     try {
//         const user_id = req.user.id;
//         let productionChartData = [], monthlyExpectedYield = 0;
            
//         // Getting Yield Data from plantation for that user
//         const yieldData = await db.Plantations.findAll({
//             where: {
//                 user_id,
//                 is_deleted: false
//             },
//             attributes: [
//                 [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
//                 [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
//             ],
//             group: 'year',
//             raw: true
//         })
//         // Getting Final Score From Orders Table
//         const soldData = await db.BuyingStationOrder.findAll({
//             where: {
//                 farmerId: user_id,
//                 isdeleted: null
//             },
//             attributes: [
//                 [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
//                 [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%c'), 'month'],
//                 [Sequelize.fn('sum', Sequelize.col('coffeeCherryQty')), 'finalScore'],
//             ],
//             group: ['year', 'month'],
//             raw: true
//         })
//         console.log(soldData);
//         for (const data of yieldData) {
//             let finalScoreSum = 0;
//             let monthsDataArray = [];
//             for (const innerData of soldData) {
//                 if(innerData.year === data.year){
//                     finalScoreSum += innerData.finalScore;
//                     monthsDataArray.push({
//                         targetedValue: data.totalExpectedYield/12,
//                         finalScore: innerData.finalScore,
//                         month: innerData.month
//                     })
//                 }
//             }
//             let finalData = {year: data.year, targetedValue: data.totalExpectedYield, finalScore: finalScoreSum, monthsData: monthsDataArray};
//             productionChartData.push(finalData);
//         }

//         return res.json(
//             successRespSync({
//                 msg: success.FETCH,
//                 data: {
//                     numRows: productionChartData?.length ?? 0, 
//                     productionChartData
//                 },
//             })
//         );
//     } catch (err) {
//         logErrorOccurred(__filename, err);
//         return serverError(res, err);
//     }
// })


// /**
//  * @swagger
//  * /production-chart/dry-milling:
//  *   get:
//  *     description: Get Production chart For Dry Milling
//  *     tags: [Coffee]
//  *     parameters:
//  *      - in: header
//  *        name: oauth-token
//  *        required: true
//  *        schema:
//  *          type: string
//  *        example:
//  *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
//  *      - in: query
//  *        name: filterType
//  *        required: true
//  *        description: choose from ['list', 'graph']
//  *        schema:
//  *          type: string
//  *      - in: query
//  *        name: duration
//  *        description: choose from ['year', 'month'] - if Empty you will receive current year data
//  *        schema:
//  *          type: string
//  *      - in: query
//  *        name: data
//  *        description: choose from if Year ['2022', '2021'] or If month ['01', '02']
//  *        schema:
//  *          type: integer
//  *      - in: query
//  *        name: yearWithMonth
//  *        description: If duration is month then send year otherwise you will receive for current year
//  *        schema:
//  *          type: integer
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
//  *                   message: Fetched successfully.
//  *
//  */

//  router.get('/dry-milling', auth, productionChartValidations(), validationErrorHandler, async (req, res) => { 
//     try {
//         const userId = req.user.id;
//         let targetedValue = 0, finalTargetedYield = 0, finalScore = 0, currentYear = moment().format('YYYY'), currentMonth = moment().format('MM'), yearToFindYield = null, monthToFind = null, productionChartData = [], condtion = null;

//         // Check If Filter Type is graph and compose data and condition according to duration 
//         if (req.query.filterType && req.query.filterType == 'graph') {
//             if (isEmpty(req.query.duration) || req.query.duration === 'year') {
//                 yearToFindYield = req.query.data ? req.query.data : currentYear;
//                 term = 'YEAR';
//                 condtion = {
//                     [Op.and]: [
//                         Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchaseDate')), yearToFindYield)
//                     ],
//                 }
//             }
//             if (req.query.duration === 'month') {
//                 yearToFindYield = req.query.yearWithMonth ? req.query.yearWithMonth : currentYear;
//                 monthToFind = req.query.data ? req.query.data : currentMonth;
//                 term = 'MONTH';
//                 condtion = {
//                     [Op.and]: [
//                         Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchaseDate')), yearToFindYield),
//                         Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('purchaseDate')), monthToFind)
//                     ],
//                 }
//             }
            
//             // Getting the targeted Value set by dry milling
//             const targetData = await db.dryMilling_perYear_target.findOne({
//                 attributes: ['target', 'year'],
//                 where: {
//                     userId,
//                     year: yearToFindYield
//                 },
//                 raw: true
//             })
//             if (targetData) {
//                 targetedValue = targetData.target;
//             }

//             finalTargetedYield = targetedValue;
//             if (req.query.duration === 'month') {
//                 finalTargetedYield = targetedValue / 12;
//             }
//             console.log(finalTargetedYield);
//             // Getting final Score of dry milling at stage of grean beans
//             const dryMillingFinalScore = await db.ParchmentCoffee.findAll({
//                 attributes: ['greenBeansTotal', 'purchaseDate'],
//                 where: {
//                     ...condtion,
//                     dryMillingUserId: userId,
//                     isdeleted: null,
//                     status: "Completed"
//                 },
//                 raw: true
//             })
//             if(isEmpty(dryMillingFinalScore)){
//                 return res.json(
//                     errorRespSync({
//                         msg: "No Data Available"
//                     })
//                 )
//             }
//             if (dryMillingFinalScore) {
//                 dryMillingFinalScore.forEach(element => {
//                     finalScore += element.greenBeansTotal;
//                 });
//             }
//             // composing Final Data to send to front end
//             productionChartData.push({
//                 "targetedValue": finalTargetedYield,
//                 "finalScore": finalScore
//             })
//         }

//         // If Filter Type is list
//         if (req.query.filterType && req.query.filterType == 'list') {
            
//             // Getting targeted Value set by dry milling
//             const targetData = await db.dryMilling_perYear_target.findAll({
//                 where: {
//                     userId
//                 },
//                 attributes: ['target','year'],
//                 raw: true
//             })
            
//             // Getting final Score of dry milling at stage of grean beans
//             const dryMillingFinalScore = await db.ParchmentCoffee.findAll({
//                 where: {
//                     dryMillingUserId: userId,
//                     isdeleted: null,
//                     status: "Completed"
//                 },
//                 attributes: [
//                     [ Sequelize.fn('date_format', Sequelize.col('purchaseDate'), '%Y'), 'year'],
//                     [Sequelize.fn('sum', Sequelize.col('greenBeansTotal')), 'finalScore'],
//                 ],
//                 group: 'year',
//                 raw: true
//             })
            
//             for (const data of targetData) {
//                 const dryMillingRec = dryMillingFinalScore.find((x) => data.year == x.year);
//                 if(dryMillingRec){
//                     let finaData = { targetedValue: data.target, finalScore: dryMillingRec.finalScore, year: data.year};
//                     productionChartData.push(finaData);
//                 } 
//             }
//         }

//         return res.json(
//             successRespSync({
//                 msg: success.FETCH,
//                 data: {
//                     numRows: productionChartData?.length ?? 0, 
//                     productionChartData
//                 },
//             })
//         );
//     } catch (err) {
//         logErrorOccurred(__filename, err);
//         return serverError(res, err);
//     }
// })

// module.exports = router;
