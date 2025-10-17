const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync
} = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const _ = require('lodash');
const moment = require('moment');

const html2pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const generatePDF = require(rootPath + "/helpers/pdfGenerator");

router.get(
  '/list',
  auth,
  // validate.listValidation(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { col = 'createdAt', desc = 'true', dateRange } = req.query;
      let { id: userId } = req.user;
      const { inboundWarehouse, outboundWarehouse } = await getReport(userId, dateRange);
      let reports = [...inboundWarehouse.inboundRows, ...outboundWarehouse.outboundRows];
      let reportsData = [];

      reports = _.orderBy(reports, [(item) => {
        return item.createdAt;
      }], ['desc']);
      reports = _.groupBy(reports, 'createdAt');
    
      for (const report in reports) {
        reportsData.push(...reports[report]);
      }

      reportsData = reportsData.map(item => {
        let isInBound = item instanceof db.CacaoInBoundWarehouse
        return {
          "id": item.id,
          "amount": ( (isInBound ? item.quantity : item.totalQty) || 0) * (item.amount || 0),
          "pricePerUnit": (item.amount || 0),
          "quantity": (isInBound ? item.quantity : item.totalQty) || 0,
          "unitValue": (isInBound ? item.unitCount : item.unitCount) || 0,
          "recordId": item.recordId,
          "createdAt": item.createdAt,
          "updatedAt": item.updatedAt,
          "status": isInBound ? 'Inbound' : 'Outbound',
        }
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: reportsData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/pdf',
  auth,
  async (req, res) => {
    try {
      let { dateRange } = req.query;
      let { id: userId } = req.user;
      const userName = await db.user.findOne({
        attributes: ['firstName','middleName', 'lastName'],
        where: {
          id: userId
        }
      });
 
      let dates;
      if (dateRange) {
        dates = dateRange.split('-');
      }

      const { inboundWarehouse, outboundWarehouse } = await getReport(userId, dateRange);
      let reports = [...inboundWarehouse.inboundRows, ...outboundWarehouse.outboundRows];
      let reportsData = [];
      let inboundTotal = _.sumBy(inboundWarehouse.inboundRows, function(item) { 
        
        return item.quantity || item.totalQty; 
      });
      let outboundTotal = _.sumBy(outboundWarehouse.outboundRows, function(item) { 
        
        return item.quantity || item.totalQty; 
      });

      reports = _.orderBy(reports, [(item) => {
        return item.createdAt;
      }], ['desc']);
      reports = _.groupBy(reports, 'createdAt');
    
      for (const report in reports) {
        reportsData.push(...reports[report]);
      }
      let productIdToName = {}

      reportsData.forEach(rep => {
        productIdToName[rep.productNameId] = rep.productName
      })

      const data =  {
        title: 'Warehouse Report',
        subHeader: {
          user_name: [userName.firstName, userName.middleName, userName.lastName]
                      .filter(Boolean)
                      .join(' '),
          date: dateRange ? `${dates[0]} to ${dates[1]}` : moment(new Date()).format('DD/MM/YYYY'),
        },
        total: {
          'product_name': `In ${inboundTotal} KG`,
          'status': `Out ${outboundTotal} KG`,
          [`price_(total)`]: `${inboundTotal - outboundTotal} KG`,
        },
        tableData: reportsData.map(item => {
        let isInBound = item instanceof db.CacaoInBoundWarehouse
        return  {
            date: moment(item.createdAt).format('DD-MM-YYYY'),
            weight: `${isInBound ? item.quantity : item.totalQty} KG`,
            bags: `${item.unitCount} Bags`,
            product_name: item.productName || productIdToName[item.productNameId],
            status: isInBound ? 'Inbound' : 'Outbound',
            [`price_(total)`]: `${( (isInBound ? item.quantity : item.totalQty) || 0) * (item.amount || 0)} USD`,
          }
        }
          )
      };
      const pdfData = await generatePDF(data, req);
  
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed."
          })
        )
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'attachment; filename=' + pdfData.fileName,
        });

        fs.createReadStream(pdfData.path).pipe(res);

        return;
     }
    } catch (error) {
      return serverError(res, error)
    }
  }
);

async function getReport(userId, dateRange = null, col = 'id', desc = 'true') {
    let where = { userId: userId };

    if (!_.isEmpty(dateRange)) {
      dateRange = dateRange
        .split('-')
        ?.map((date) =>
          moment
            .utc(date, process.env.ACCEPT_DATE_FORMAT)
            .format(process.env.DB_ONLYDATE_FORMAT)
        );
      where.createdAt = { [db.Sequelize.Op.between]: dateRange };
    }

    let { count: totalInboundRows, rows: inboundRows } = await db.CacaoInBoundWarehouse.findAndCountAll({
        attributes: {
            exclude: [
                'userId',
                'isdeleted',
            ],
        },
        where,
        distinct: true,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
    });

    let { count: totalOutboundRows, rows: outboundRows } = await db.CacaoOutBoundWarehouse.findAndCountAll({
        attributes: {
            exclude: [
              'userId',
              'isdeleted',
            ],
        },
        where,
        distinct: true,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
    });

    return {
        inboundWarehouse: { totalInboundRows, numRows: inboundRows?.length ?? 0, inboundRows },
        outboundWarehouse: { totalOutboundRows, numRows: outboundRows?.length ?? 0, outboundRows },
    }
}

module.exports = router;
