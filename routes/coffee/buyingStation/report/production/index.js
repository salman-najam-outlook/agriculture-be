const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const moment = require('moment');
const { success,error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const generatePDF = require(rootPath + '/helpers/pdfGenerator');
const fs = require('fs');
const { isEmpty } = require('lodash');
/**
 * @swagger
 * /coffee/buying-station/report/production:
 *   get:
 *     description: Get Production chart PDF For Buying Station
 *     tags: [Coffee Buying Station Production]
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
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let productionChartData = [];
      const userName = await db.user.findOne({
        attributes: ['firstName','middleName', 'lastName'],
        where: {
          id: userId,
        },
      });

        // Getting Yield Data from plantation for that user
        const targetData = await db.BuyingStationProduction.findAll({
            where: {
            buyingStationId : userId
            },
            attributes: ['targetVal','year'],
            raw: true,
            order: [['year', 'desc']]
        })

        console.log(userId,targetData);

        if(isEmpty(targetData)){
            return res.send(error.code.NOT_FOUND);
        }

        // Getting final Score of dry milling at stage of grean beans
        const buyingStationParchmentOut = await db.BuyingStationProcessingBatch.findAll({
            where: {
                buyingStationId: userId,
                isdeleted: null,
                endDate : {
                    [db.Sequelize.Op.lt]: moment
                    .utc()
                    .format(process.env.DB_ONLYDATE_FORMAT)
                } 
            },
            attributes: [
                [ db.Sequelize.fn('date_format', db.Sequelize.col('endDate'), '%Y'), 'year'],
                [ db.Sequelize.fn('sum', db.Sequelize.col('parchmentOut')), 'final'],
            ],
            group: 'year',
            raw: true
        })

        if(isEmpty(buyingStationParchmentOut)){
            return res.send(error.code.NOT_FOUND);
        }
        
        for (const data of targetData) {
            const soldRec = buyingStationParchmentOut.find((x) => data.year == x.year);
            if(soldRec){
                let finalData = { annualAnalysis: data.targetVal-soldRec.final, targetedValue: data.targetVal, finalScore: soldRec.final, year: data.year};
                productionChartData.push(finalData);
            } 
            
        }
        // console.log(productionChartData); return;
        if (productionChartData.length > 0) {
            const data =  {
            title: 'Buying Station Production Report',
            subHeader: {
                user_name: `${userName.firstName} ${userName.middleName || ''} ${userName.lastName}`.trim(),
                type: 'Yearly Report',
            },
            tableData: productionChartData.map(item => ({
                annual_analysis: item.annualAnalysis,
                year: item.year,
                target_value: item.targetedValue,
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
  }
);

module.exports = router;
