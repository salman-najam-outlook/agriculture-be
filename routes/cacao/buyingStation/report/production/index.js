const express= require('express')
const router= express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const moment = require('moment');
const { success,error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const generatePDF = require(rootPath + '/helpers/pdfGenerator');
const fs = require('fs');
const { isEmpty } = require('lodash');


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
          const targetData = await db.CacaoBuyingStationProduction.findAll({
              where: {
              buyingStationId : userId
              },
              attributes: ['targetVal','year'],
              raw: true,
              order: [['year', 'desc']]
          })
  
          if(isEmpty(targetData)){
              return res.send(error.code.NOT_FOUND);
          }
  
          // Getting final Score of dry milling at stage of grean beans
          const buyingStationParchmentOut = await db.CacaoFermentationProcess.findAll({
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
                //   [ db.Sequelize.fn('sum', db.Sequelize.col('parchmentOut')), 'final'],
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
                user_name: `${userName.firstName} ${userName.middleName ? `${userName.middleName} ` : ''}${userName.lastName}`,
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