const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const warehouseValidator = require(rootPath +
  '/helpers/validators/warehouseCacao');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const includeAssociations = [
];

router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('CacaoOutboundWarehouse'),
  warehouseValidator.saveOutbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        clientId,
        clientName,
        parchmentId,
        inboundLotId,
        productNameId,
        productName,
        unitSize,
        unitUom,
        totalQty,
        totalQtyUom,
        amount,
        amountUom,
        recordId,
      } = req.body;

      const set = {
        clientId,
        clientName,
        parchmentId,
        inboundLotId,
        productNameId,
        productName,
        unitSize,
        unitUom,
        totalQty,
        totalQtyUom,
        amount,
        amountUom,
        recordId,
        userId: userId,
      };

      let outboundWarehouse = await db.CacaoOutBoundWarehouse.create(set);
     
      return res.json(
        successRespSync({
          msg: success.INSERTED,
          data: outboundWarehouse,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


router.get(
  '/list',
  auth,
  warehouseValidator.listOutbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 10, col = 'id', desc = 'true', dateRange, search } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // where condition with condition
      let where = { userId: userId };
      // for searching
      if (!_.isEmpty(search)) {
        const fields = ['warehouseProductName', 'totalQty', 'clientName'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      // for date filter
      if (!_.isEmpty(dateRange)) {
        const dates = dateRange.split('-');
        dates[0] = moment
          .utc(dates[0], process.env.ACCEPT_DATE_FORMAT)
          .format('YYYY-MM-DD 00:00:00');
        dates[1] =  moment
          .utc(dates[1], process.env.ACCEPT_DATE_FORMAT)
          .format('YYYY-MM-DD 23:59:59');
        console.log(dates);
        where.createdAt = { [db.Sequelize.Op.between]: dates };
      }

      let rows = await db.CacaoOutBoundWarehouse.findAll({
        attributes: {
          exclude: ['userId', 'isdeleted', 'updatedAt', 'createdAt'],
          include: [
            [
              db.Sequelize.fn(
                'concat',
                'OB-0',
                db.Sequelize.col('CacaoOutBoundWarehouse.id')
              ),
              'outboundCode',
            ],
           
            [
              db.Sequelize.fn(
                'DATE_FORMAT',
                db.Sequelize.col('CacaoOutBoundWarehouse.createdAt'),
                '%d/%m/%Y'
              ),
              'createdDate',
            ],
          ],
        },
        where,
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
        order: [[db.Sequelize.literal(col), desc == 'false' ? 'ASC' : 'DESC']],
      });

      rows = await Promise.all(
        rows?.map(async (outboundWarehouse) => {
          outboundWarehouse = await outboundWarehouse.toJSON();

          // const { cuppingData } = outboundWarehouse;

          // const cuppingResult = cuppingData.map(cupping => ({
          //   ...cupping,
          //   fragrance_qualities: cupping.fragrance_qualities ? cupping.fragrance_qualities.split('|') : [],
          //   flavour_qualities: cupping.flavour_qualities ? cupping.flavour_qualities.split('|') : [],
          //   after_taste_qualities: cupping.after_taste_qualities ? cupping.after_taste_qualities.split('|') : [],
          //   acidity_qualities: cupping.acidity_qualities ? cupping.acidity_qualities.split('|') : [],
          //   body_qualities: cupping.body_qualities ? cupping.body_qualities.split('|') : [],
          // }));

          // const qrCode = JSON.stringify({...outboundWarehouse, cuppingData: cuppingResult});
          return { ...outboundWarehouse};
        })
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: rows,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


router.get(
  '/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
        let { id: userId } = req.user;
        let { id } = req.params;

        let outboundWarehouse = await db.CacaoOutBoundWarehouse.findOne({
            where: { id, userId: userId },
            // include: includeAssociations,
        });


        let qrCode=null;

        if(outboundWarehouse){
          outboundWarehouse = await outboundWarehouse.toJSON();
          const { amount, product, quantity, outboundUnitValue, outboundUnitId, recordId } = outboundWarehouse;
          qrCode = ({
            amount,
            product,
            quantity,
            outboundUnitId,
            outboundUnitValue,
            recordId
          });
        }

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: { outboundWarehouse, qrCode },
            })
        );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


router.delete(
  '/delete/:id',
  auth,
  // validatorSoilMgmt.exist(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.CacaoOutBoundWarehouse.destroy({
          where: { id: id, userId: userId },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: 'Cacao outbound warehouse deleted.',
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/lot-history/:inboundLotId',
  auth,
  warehouseValidator.inboundLotOutboundHistory(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { inboundLotId } = req.params;
      let { page = 1, limit = 10 } = req.query;
      limit = parseInt(limit);

      let outboundHistory = await db.CacaoOutBoundWarehouse.findAll({
        attributes: [
          'id',
          [
            db.Sequelize.fn(
              'concat',
              'OB-0',
              db.Sequelize.col('CacaoOutBoundWarehouse.id')
            ),
            'outboundCode',
          ],
          'clientName',
          'totalQty',
          'totalQtyUom',
          [
            db.Sequelize.fn(
              'DATE_FORMAT',
              db.Sequelize.col('CacaoOutBoundWarehouse.createdAt'),
              '%d/%m/%Y'
            ),
            'createdDate',
          ],
          'productName',
        ],
        where: { inboundLotId },
        offset: (page - 1) * limit,
        limit: limit,
        raw: true,
      });

      let inboundLot = await db.CacaoInBoundWarehouse.findOne({
        attributes: [
          [
            db.Sequelize.fn(
              'concat',
              'IB-0',
              db.Sequelize.col('CacaoInBoundWarehouse.id')
            ),
            'inboundLotCode',
          ],
          'quantity',
          [
            db.Sequelize.literal(
              'CacaoInBoundWarehouse.quantity - COALESCE((SELECT SUM(cobw.totalQty) from `cacao_out_bound_warehouse` as cobw where inboundLotId=CacaoInBoundWarehouse.id),0)'
            ),
            'availableQuantity',
          ],
          'images',
        ],
        where: { id: inboundLotId },
        raw: true,
      });

     outboundHistory = outboundHistory?.map((outbound) => {
       const qrCode = JSON.stringify({
         productName: outbound.productName,
         productNameId: outbound.productNameId,
         lotId: inboundLot.inboundLotCode,
         totalQuantity: outbound.totalQty,
         totalQuantityUom: outbound.totalQtyUom,
         unitSize: outbound.unitSize,
         unitUom: outbound.unitUom,
       });
       return { ...outbound, qrCode };
     });

       return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { inboundLot, outboundHistory },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


module.exports = router;
