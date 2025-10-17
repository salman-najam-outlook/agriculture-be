const express=require('express');
const router= express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath +
    '/middleware/validation_error_handler');
    const validatorProduction = require(rootPath +
        '/helpers/validators/productionAnalysis');
const moment = require('moment');
const { isEmpty } = require('lodash');

router.post(
    '/target',
    auth,
    validationErrorHandler,
    async (req, res) => {
      try {
        const buyingStationId = req.user.id;
        const { targetVal, year, recordId } = req.body;
  
        const set = { buyingStationId, targetVal, year, recordId };
  
        const production = await db.CacaoBuyingStationProduction.create(set);
  
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: production ,
          })
        );
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    }
  );

  router.get(
    '/target',
    auth,
    validatorProduction.list(),
    validationErrorHandler,
    async (req, res) => {
      try {
        const buyingStationId = req.user.id;
        let { page = 1, limit = 1000, col = 'id', order = 'desc' } = req.query;
        limit = parseInt(limit);
  
        let where = { buyingStationId };
  
        let { count: totalRows, rows } =
          await db.CacaoBuyingStationProduction.findAndCountAll({
            where,
            offset: (page - 1) * limit,
            limit: limit,
            order: [[col, order]],
            distinct: true,
            attributes: { exclude: ['updatedAt', 'isdeleted'] },
          });
  
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: {
              productionTarget: { totalRows, numRows: rows?.length ?? 0, rows },
            },
          })
        );
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    }
  );
  
   router.put('/target/:id', auth, validatorProduction.editProductionTarget(), validationErrorHandler, async (req, res) => {
    try {  
        const buyingStationId = req.user.id, currentYear = moment().format("YYYY");;
        let id = req.params.id;
        let { targetVal } = req.body;
  
        // Check If target Already set for this year
        const targetRecord = await db.CacaoBuyingStationProduction.findOne({
            where: {
            id, buyingStationId
            }
        })
        
        if(isEmpty(targetRecord)){
            return res.json(
                errorRespSync({
                    code: error.code.NOT_FOUND,
                    msg: error.TARGET_NOT_FOUND,
                })
            );
        }
        if(targetRecord.year < currentYear){
        return res.status(error.code.SERVER_ERROR).json(
            errorRespSync({
                msg: "You cannot Edit Target from Past"
            })
        )
        }
        
        let set = {targetVal};
  
        const transaction = await db.sequelize.transaction();
        try {
            // Updating the Target
            await db.CacaoBuyingStationProduction.update(set, {
                where: {
                    id
                }
            }, { transaction });
  
            await transaction.commit();
            return res.json(
                successRespSync({
                msg: success.TARGET_UPDATED
                })
            )
        } catch (err) {
            await transaction.rollback()
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    } catch (err) {
     logErrorOccurred(__filename, err);
     return serverError(res, err);
    }
  })


  router.get(
  '/chart',
  auth,
  validatorProduction.chart(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      let { type, val } = req.query;
      const replacements = { buyingStationId };

      let sql = `SELECT COALESCE(MAX(cbsp.targetVal), 0) target,SUM(COALESCE(cpo.grandTotal, 0 )) final, cbsp.year ,(SUM(COALESCE(cpo.grandTotal, 0 )) - SUM(COALESCE(cbsp.targetVal, 0 ))) variable FROM cacao_buying_station_productions cbsp LEFT JOIN cacao_purchase_orders cpo on cbsp.year=DATE_FORMAT(cpo.purchasedAt, '%Y') where cbsp.buyingStationId=:buyingStationId`;

      switch (type) {
        case 'year':
          sql += ` and cbsp.year=:year`;
          replacements.year = val;
          break;
        case 'month':
          sql += ` and DATE_FORMAT(cpo.createdAt, '%Y-%m')=:month`;
          replacements.month = val;
          break;
      }

      sql += ` GROUP BY cbsp.year`;

      const chartData = await db.sequelize.query(sql, {
        type: db.Sequelize.QueryTypes.SELECT,
        replacements,
        plain: true,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { chartData },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports=router;