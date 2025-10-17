const express = require('express');
const moment = require('moment');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { Op, Sequelize } = require('sequelize');
const { errorRespSync } = require(rootPath + '/helpers/api');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { productionChartValidations } = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { isEmpty } = require('lodash');
const generatePDF = require(rootPath + '/helpers/pdfGenerator');
const fs = require('fs');
/**
 * @swagger
 * /cacao/production-chart:
 *   get:
 *     description: Get Production chart For Farmer
 *     tags: [cacao]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: query
 *        name: filterType
 *        required: true
 *        description: choose from ['list', 'graph']
 *        schema:
 *          type: string
 *      - in: query
 *        name: duration
 *        description: choose from ['year', 'month'] - if Empty you will receive current year data
 *        schema:
 *          type: string
 *      - in: query
 *        name: data
 *        description: choose from if Year ['2022', '2021'] or If month ['01', '02']
 *        schema:
 *          type: integer
 *      - in: query
 *        name: yearWithMonth
 *        description: If duration is month then send year otherwise you will receive for current year
 *        schema:
 *          type: integer
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *
 */

router.get('/', auth, productionChartValidations(), validationErrorHandler, async (req, res) => {
    try {
        const user_id = req.user.id;
        let targetedValue = 0, finalTargetedYield = 0, finalScore = 0, currentYear = moment().format('YYYY'), currentMonth = moment().format('MM'), yearToFindYield = null, monthToFind = null, productionChartData = [], condtion = null;

        // Check If Filter Type is graph and compose data and condition according to duration 
        if (req.query.filterType && req.query.filterType == 'graph') {
            if (isEmpty(req.query.duration) || req.query.duration === 'year') {
                yearToFindYield = req.query.data ? req.query.data : currentYear;
                term = 'YEAR';
                condtion = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchasedAt')), yearToFindYield)
                    ],
                }
            }
            if (req.query.duration === 'month') {
                yearToFindYield = req.query.yearWithMonth ? req.query.yearWithMonth : currentYear;
                monthToFind = req.query.data ? req.query.data : currentMonth;
                term = 'MONTH';
                condtion = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('purchasedAt')), yearToFindYield),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('purchasedAt')), monthToFind)
                    ],
                }
            }
            
            // Getting the Expected Yields of all plantation to get targeted value
            const expectedYield = await db.CacaoPlantations.findAll({
                attributes: ['expected_yield', 'createdAt'],
                where: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearToFindYield),
                    ],
                    user_id,
                    is_deleted: false
                },
                raw: true
            })
            if (expectedYield) {
                expectedYield.forEach(element => {
                    console.log(element);
                    targetedValue += element.expected_yield;
                });
            }

            finalTargetedYield = targetedValue;
            if (req.query.duration === 'month') {
                finalTargetedYield = targetedValue / 12;
            }
            // Getting Selling Data of farmer
            const farmerSoldData = await db.CacaoPurchaseOrder.findAll({
                attributes: ['cacao_weight', 'purchasedAt'],
                where: {
                    ...condtion,
                    farmerId: user_id,
                    isdeleted: null
                },
                raw: true
            })
            if(isEmpty(farmerSoldData)){
                return res.json(
                    errorRespSync({
                        msg: "No Data Available for this month"
                    })
                )
            }
            if (farmerSoldData) {
                farmerSoldData.forEach(element => {
                    finalScore += element.cacao_weight;
                });
            }
            // composing Final Data to send to front end
            productionChartData.push({
                "targetedValue": finalTargetedYield,
                "finalScore": finalScore
            })
        }

        // If Filter Type is list
        if (req.query.filterType && req.query.filterType == 'list') {
            
            // Getting Yield Data from plantation for that user
            const yieldData = await db.CacaoPlantations.findAll({
                where: {
                    user_id,
                    is_deleted: false
                },
                attributes: [
                    [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
                    [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
                ],
                group: 'year',
                raw: true
            })
            
            // Getting Final Score From Orders Table
            const soldData = await db.CacaoPurchaseOrder.findAll({
                where: {
                    farmerId: user_id,
                    isdeleted: null
                },
                attributes: [
                    [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
                    [Sequelize.fn('sum', Sequelize.col('cacao_weight')), 'finalScore'],
                ],
                group: 'year',
                raw: true
            })
            
            for (const data of yieldData) {
                const soldRec = soldData.find((x) => data.year == x.year);
                if(soldRec){
                    let finaData = { targetedValue: data.totalExpectedYield, finalScore: soldRec.finalScore, year: data.year};
                    productionChartData.push(finaData);
                } 
                
            }
        }

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: {
                    numRows: productionChartData?.length ?? 0, 
                    productionChartData
                },
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
})

/**
 * @swagger
 * /cacao/farmers/production-chart/getPDFReport:
 *   get:
 *     description: Get Production chart PDF For Farmer
 *     tags: [cacao]
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *
 */

router.get('/getPDFReport', auth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const userName = await db.user.findOne({
            attributes: ['firstName','middleName', 'lastName'],
            where: {
              id: user_id
            }
        })
        let productionChartData = [];
            
        // Getting Yield Data from plantation for that user
        const yieldData = await db.CacaoPlantations.findAll({
            where: {
                user_id,
                is_deleted: false
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
                [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
            ],
            group: 'year',
            raw: true
        })

        if(isEmpty(yieldData)){
            return res.send(error.code.NOT_FOUND);
        }
        // Getting Final Score From Orders Table
        const soldData = await db.CacaoPurchaseOrder.findAll({
            where: {
                farmerId: user_id,
                isdeleted: null
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
                [Sequelize.fn('sum', Sequelize.col('cacao_weight')), 'finalScore'],
            ],
            group: 'year',
            raw: true
        })

        if(isEmpty(soldData)){
            return res.send(error.code.NOT_FOUND);
        }
        for (const data of yieldData) {
            const soldRec = soldData.find((x) => data.year == x.year);
            if(soldRec){
                let finalData = { annualAnalysis: data.totalExpectedYield-soldRec.finalScore, targetedValue: data.totalExpectedYield, finalScore: soldRec.finalScore, year: data.year};
                productionChartData.push(finalData);
            } 
            
        }

        if (productionChartData.length > 0) {
            const data =  {
              title: 'Farmer Production Report',
              subHeader: {
                user_name: [userName.firstName, userName.middleName, userName.lastName].filter(Boolean).join(' '),
                type: 'Yearly Report',
              },
              tableData: productionChartData.map(item => ({
                annual_analysis: parseFloat(item.annualAnalysis).toFixed(2),
                year: item.year,
                target_value: parseFloat(item.targetedValue).toFixed(2),
                final_value: item.finalScore
              }))
            }
            const pdfData = await generatePDF(data, req)
            if (!pdfData) {
              return res.json(
                errorRespSync({
                  msg: "PDF report generation failed."
                })
              )
            } else {
              res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + pdfData.fileName
              });
              fs.createReadStream(pdfData.path).pipe(res)
              return
            }
        }else{
            return res.send(error.code.NOT_FOUND);
        }
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
})


/**
 * @swagger
 * /cacao/farmers/production-chart/offline:
 *   get:
 *     description: Get Production chart For Farmer offline
 *     tags: [cacao]
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *
 */

router.get('/offline', auth, async (req, res) => {
    try {
        const user_id = req.user.id;
        let productionChartData = [], monthlyExpectedYield = 0;
            
        // Getting Yield Data from plantation for that user
        const yieldData = await db.CacaoPlantations.findAll({
            where: {
                user_id,
                is_deleted: false
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y'), 'year'],
                [Sequelize.fn('sum', Sequelize.col('expected_yield')), 'totalExpectedYield'],
            ],
            group: 'year',
            raw: true
        })
        // Getting Final Score From Orders Table
        const soldData = await db.CacaoPurchaseOrder.findAll({
            where: {
                farmerId: user_id,
                isdeleted: null
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%Y'), 'year'],
                [ Sequelize.fn('date_format', Sequelize.col('purchasedAt'), '%c'), 'month'],
                [Sequelize.fn('sum', Sequelize.col('cacao_weight')), 'finalScore'],
            ],
            group: ['year', 'month'],
            raw: true
        })
        console.log(soldData);
        for (const data of yieldData) {
            let finalScoreSum = 0;
            let monthsDataArray = [];
            for (const innerData of soldData) {
                if(innerData.year === data.year){
                    finalScoreSum += innerData.finalScore;
                    monthsDataArray.push({
                        targetedValue: data.totalExpectedYield/12,
                        finalScore: innerData.finalScore,
                        month: innerData.month
                    })
                }
            }
            let finalData = {year: data.year, targetedValue: data.totalExpectedYield, finalScore: finalScoreSum, monthsData: monthsDataArray};
            productionChartData.push(finalData);
        }

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: {
                    numRows: productionChartData?.length ?? 0, 
                    productionChartData
                },
            })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
})
module.exports = router;