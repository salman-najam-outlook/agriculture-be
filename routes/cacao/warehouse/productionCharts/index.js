const express = require('express');
const moment = require('moment');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { Op, Sequelize } = require('sequelize');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { productionChartValidations } = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath + '/middleware/validation_error_handler');
const { isEmpty } = require('lodash');
const fs = require('fs');
const generatePDF = require(rootPath + '/helpers/pdfGenerator');


 router.get('/', auth, productionChartValidations(), validationErrorHandler, async (req, res) => { 
    try {
        const userId = req.user.id;
        let targetedValue = 0, finalTargetedYield = 0, finalScore = 0, currentYear = moment().format('YYYY'), currentMonth = moment().format('MM'), yearToFindYield = null, monthToFind = null, productionChartData = [], condtion = null;

        // Check If Filter Type is graph and compose data and condition according to duration 
        if (req.query.filterType && req.query.filterType == 'graph') {
            if (isEmpty(req.query.duration) || req.query.duration === 'year') {
                yearToFindYield = req.query.data ? req.query.data : currentYear;
                term = 'YEAR';
                condtion = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dryingInitialDate')), yearToFindYield)
                    ],
                }
            }
            if (req.query.duration === 'month') {
                yearToFindYield = req.query.yearWithMonth ? req.query.yearWithMonth : currentYear;
                monthToFind = req.query.data ? req.query.data : currentMonth;
                term = 'MONTH';
                condtion = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dryingInitialDate')), yearToFindYield),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dryingInitialDate')), monthToFind)
                    ],
                }
            }
            
            // Getting the targeted Value set by dry milling
            const targetData = await db.CacaoProductionTarget.findOne({
                attributes: ['target', 'year'],
                where: {
                    userId,
                    year: yearToFindYield
                },
                raw: true
            })
            if (targetData) {
                targetedValue = targetData.target;
            }

            finalTargetedYield = targetedValue;
            if (req.query.duration === 'month') {
                finalTargetedYield = targetedValue / 12;
            }
            console.log(finalTargetedYield);
            // Getting final Score of dry milling at stage of grean beans
            const cacaoFinalScore = await db.CacaoDryingProcess.findAll({
                attributes: ['finalWeight', 'dryingInitialDate'],
                where: {
                    ...condtion,
                    dryRegisterUserId: userId,
                    isdeleted: null,
                    // status: "Completed"
                },
                raw: true
            })
            if(isEmpty(cacaoFinalScore)){
                return res.json(
                    errorRespSync({
                        msg: "No Data Available"
                    })
                )
            }
            if (cacaoFinalScore) {
                cacaoFinalScore.forEach(element => {
                    finalScore += element.finalWeight;
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
            
            // Getting targeted Value set by dry milling
            const targetData = await db.CacaoProductionTarget.findAll({
                where: {
                    userId
                },
                attributes: ['target','year'],
                raw: true
            })
            
            // Getting final Score of fermentation at stage of grean beans
            const cacaoDryingProcess = await db.CacaoDryingProcess.findAll({
                where: {
                    dryRegisterUserId: userId,
                    isdeleted: null,
                    // status: "Completed"
                },
                attributes: [
                    [ Sequelize.fn('date_format', Sequelize.col('dryingInitialDate'), '%Y'), 'year'],
                    [Sequelize.fn('sum', Sequelize.col('finalWeight')), 'finalScore'],
                ],
                group: 'year',
                raw: true
            })
            
            for (const data of targetData) {
                const dryMillingRec = cacaoDryingProcess.find((x) => data.year == x.year);
                if(dryMillingRec){
                    let finaData = { targetedValue: data.target, finalScore: dryMillingRec.finalScore, year: data.year};
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

router.get('/offline', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        let productionChartData = [];
            
        // Getting targeted Value set by dry milling
        const targetData = await db.CacaoProductionTarget.findAll({
            where: {
                userId
            },
            attributes: ['target','year', 'recordId'],
            order: [['year', 'desc']],
            raw: true
        })
        
        // Getting final Score of dry milling at stage of grean beans
        const dryMillingFinalScore = await db.CacaoDryingProcess.findAll({
            where: {
                dryRegisterUserId: userId,
                isdeleted: null,
                // status: "Completed"
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('dryingInitialDate'), '%Y'), 'year'],
                [ Sequelize.fn('date_format', Sequelize.col('dryingInitialDate'), '%c'), 'month'],
                [ Sequelize.fn('sum', Sequelize.col('finalWeight')), 'finalScore'],
            ],
            group: ['year', 'month'],
            raw: true
        })
        console.log(dryMillingFinalScore);
        for (const data of targetData) {
            let finalScoreSum = 0;
            let monthsDataArray = [];
            for (const innerData of dryMillingFinalScore) {
                if(innerData.year == data.year){
                    finalScoreSum += innerData.finalScore;
                    monthsDataArray.push({
                        targetedValue: data.target/12,
                        finalScore: innerData.finalScore,
                        month: innerData.month
                    })
                }
            }
            let finalData = {year: data.year, targetedValue: data.target, finalScore: finalScoreSum, monthsData: monthsDataArray, recordId: data.recordId};
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


 router.get('/getPDFReport', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const userName = await db.user.findOne({
            attributes: ['firstName', 'middleName', 'lastName'],
            where: {
              id: userId
            }
        })
        let productionChartData = [];
            
        // Getting targeted Value set by dry milling
        const targetData = await db.CacaoProductionTarget.findAll({
            where: {
                userId
            },
            attributes: ['target','year'],
            raw: true
        })

        if(isEmpty(targetData)){
            return res.status(error.code.NOT_FOUND).json(
                errorRespSync({
                    msg: "Target data not found"
                })
            );
        }
        
        // Getting final Score of dry milling at stage of grean beans
        const dryProcessFinalScore = await db.CacaoDryingProcess.findAll({
            where: {
                dryRegisterUserId: userId,
                isdeleted: null,
                // status: "Completed"
            },
            attributes: [
                [ Sequelize.fn('date_format', Sequelize.col('dryingInitialDate'), '%Y'), 'year'],
                [Sequelize.fn('sum', Sequelize.col('finalWeight')), 'finalScore'],
            ],
            group: 'year',
            raw: true
        })
        
        if(isEmpty(dryProcessFinalScore)){
            return res.status(error.code.NOT_FOUND).json(
                errorRespSync({
                    msg: "Dry Register final score not found"
                })
            );
        }

        for (const data of targetData) {
            const dryMillingRec = dryProcessFinalScore.find((x) => data.year == x.year);
            if(dryMillingRec){
                let finalData = { annualAnalysis: data.target-dryMillingRec.finalScore, targetedValue: data.target, finalScore: dryMillingRec.finalScore, year: data.year};
                productionChartData.push(finalData);
            } 
        }

        console.log(productionChartData);
        if (productionChartData.length > 0) {
            const data =  {
              title: 'Dry Milling Production Report',
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
module.exports = router;