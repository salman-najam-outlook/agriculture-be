const express = require('express');
const router = express.Router();
const _ = require('lodash');
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

router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('CacaoInBoundWarehouse'),
  warehouseValidator.saveInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        productNameId,
        productName,
        senderId,
        quantity,
        quantityUom,
        unitSize,
        unitCount,
        unitUom,
        amount,
        amountUom,
        productED,
        images,
        recordId,
        lots,
        type,
      } = req.body;

      let totalLotQuantity = 0

      // generate url for s3keys if images not empty
      images = images?.map((s3Key) => ({
        s3Key,
        s3Location: `${
          process.env.PUBLIC_BUCKET_URL ||
          'https://dimitra-public-images.s3.amazonaws.com/'
        }${s3Key}`,
      }));
      let cacaoProduct=null;
      if(productName){
         cacaoProduct = await db.CacaoWarehouseProduct.create({
          name:productName,
          userId,
        });
      }

      const setCacaoInBoundWarehouse = {
        userId,
        senderId,
        productNameId: (productName && cacaoProduct) ? cacaoProduct.id : productNameId,
        quantity,
        quantityUom,
        unitSize,
        unitCount,
        unitUom,
        amount,
        amountUom,
        ...(productED && { productED: productED }),
        images,
        recordId,
        type
      };

      let inboundWarehouse = await db.CacaoInBoundWarehouse.create(
        setCacaoInBoundWarehouse
      );

      lots.forEach(lot => {
       totalLotQuantity += lot?.cacao?.greenBeansBagWeighInKg
      });
      await db.dryCacaoInboundWarehouseMap.bulkCreate(lots.map(lot => {
        return{
          dryRegisterId : lot.id,
          inboundLotId :  inboundWarehouse.id,
          totalLotQuantity
        }
      
      }))

      return res.json(
        successRespSync({
          msg: success.INSERTED,
          data: inboundWarehouse,
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
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        col = 'id',
        desc = 'true',
        lowQty,
        expDays,
        search,
      } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // generate having condition based on condition
      let having = {};
      if (!_.isEmpty(lowQty)) {
        having = {
          ...having,
          $availableQuantity$: {
            [db.Sequelize.Op.lte]: lowQty,
          },
        };
      }
      if (!_.isEmpty(expDays)) {
        having = {
          ...having,
          $productExpDays$: {
            [db.Sequelize.Op.lte]: expDays,
          },
        };
      }

      // generate where condition based on condition
      let where = { userId: userId };
      // for searching
      if (!_.isEmpty(search)) {
        const fields = ['recordId', 'quantity', '$warehouseProduct.name$'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      let rows = await db.CacaoInBoundWarehouse.findAll({
        include: [
          {
            model: db.CacaoWarehouseProduct,
            as: 'cacaowarehouseProduct',
            attributes: ['id', 'name'],
          },
          {
            model: db.user,
            as: 'cacaowarehouseSender',
            attributes: [
              'id',
              [
                db.Sequelize.fn(
                  'CONCAT',
                  db.Sequelize.col('firstName'),
                  ' ',
                  db.Sequelize.fn('COALESCE', db.Sequelize.col('middleName'), ''),
                  ' ',
                  db.Sequelize.col('lastName')
                ),
                'name',
              ],
            ],            
          },
          // {
          //   model: db.Cupping,
          //   as: 'cuppingData',
          // },
          // {
          //   model: db.InboundWarehouseCupping,
          //   as: 'inboundWarehouseCupping',
          //   attributes: ['cupping_name', 'fragrance'],
          // },
        ],
        attributes: {
          exclude: [
            'userId',
            'senderId',
            'productNameId',
            'isdeleted',
            'createdAt',
            'updatedAt',
          ],
          include: [
            [
              db.Sequelize.fn(
                'datediff',
                db.Sequelize.col('productED'),
                db.Sequelize.literal('CURRENT_DATE()')
              ),
              'productExpDays',
            ],
            [
              db.Sequelize.fn(
                'concat',
                'IB-0',
                db.Sequelize.col('CacaoInBoundWarehouse.id')
              ),
              'inboundLotCode',
            ],
            [
              db.Sequelize.literal(`
                (CacaoInBoundWarehouse.amount * (
                  CacaoInBoundWarehouse.quantity - COALESCE(
                    (SELECT SUM(COBW.totalQty) FROM cacao_out_bound_warehouse AS COBW WHERE COBW.inboundLotId = CacaoInBoundWarehouse.id),
                    0
                  )
                ))
              `),
              'totalAmount'
            ],
            [
              db.Sequelize.literal(
                'CacaoInBoundWarehouse.quantity - COALESCE((SELECT SUM(COBW.totalQty) from `cacao_out_bound_warehouse` as COBW where inboundLotId=CacaoInBoundWarehouse.id),0)'
              ),
              'availableQuantity',
            ],
            [
              db.Sequelize.fn(
                'DATE_FORMAT',
                db.Sequelize.col('CacaoInBoundWarehouse.createdAt'),
                '%Y-%m-%d'
              ),
              'createdDate',
            ],
          ],
        },
        where,
        having,
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
        raw: true,
        nest: true,
        subQuery: false,
      });

      // rows = JSON.parse(JSON.stringify(rows));
      // // for adding qrCode
      // const data = await Promise.all(
      //   rows?.map( async (inboundWarehouse) => {
      //     const {
      //       id,
      //       inboundLotCode,
      //       warehouseProduct,
      //       amount,
      //       amountUom,
      //       unitSize,
      //       unitCount,
      //       unitUom,
      //       quantity,
      //       quantityUom,
      //       recordId,
      //       type,
      //       cuppingData
      //     } = inboundWarehouse;

      //     // const cuppingResult = cuppingData.map(cupping => ({
      //     //   ...cupping,
      //     //   fragrance_qualities: cupping.fragrance_qualities ? cupping.fragrance_qualities.split('|') : [],
      //     //   flavour_qualities: cupping.flavour_qualities ? cupping.flavour_qualities.split('|') : [],
      //     //   after_taste_qualities: cupping.after_taste_qualities ? cupping.after_taste_qualities.split('|') : [],
      //     //   acidity_qualities: cupping.acidity_qualities ? cupping.acidity_qualities.split('|') : [],
      //     //   body_qualities: cupping.body_qualities ? cupping.body_qualities.split('|') : [],
      //     // }));

      //     // const qrCode = JSON.stringify({
      //     //   inboundLotId: id,
      //     //   inboundLotCode,
      //     //   warehouseProduct,
      //     //   amount,
      //     //   amountUom,
      //     //   unitSize,
      //     //   unitCount,
      //     //   unitUom,
      //     //   quantity,
      //     //   quantityUom,
      //     //   recordId,
      //     //   type,
      //     //   cuppingResult
      //     // });

      //     return rows;
      //   })
      // );

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
  '/lots',
  auth,
  warehouseValidator.listInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 100000,
        col = 'id',
        desc = 'true',
        warehouseProductNameId:productNameId,
      } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // generate where condition based on condition
      let where = { userId: userId };
      if (!_.isEmpty(productNameId)) {
        where = { productNameId, ...where };
      }

      let rows = await db.CacaoInBoundWarehouse.findAll({
        attributes: [
          'id',
          'unitSize',
          'quantityUom',
          'unitCount',
          'unitUom',
          [
            db.Sequelize.fn(
              'concat',
              'IB-0',
              db.Sequelize.col('CacaoInBoundWarehouse.id')
            ),
            'inboundLotCode',
          ],
          [
            db.Sequelize.literal(`
              (CacaoInBoundWarehouse.amount * (
                CacaoInBoundWarehouse.quantity - COALESCE(
                  (SELECT SUM(cobw.totalQty) FROM cacao_out_bound_warehouse AS cobw WHERE cobw.inboundLotId = CacaoInBoundWarehouse.id),
                  0
                )
              ))
            `),
            'totalAmount'
          ],
          [
            db.Sequelize.literal(
              'CacaoInBoundWarehouse.quantity - COALESCE((SELECT SUM(cobw.totalQty) from `cacao_out_bound_warehouse` as cobw where inboundLotId=CacaoInBoundWarehouse.id),0)'
            ),
            'availableQuantity',
          ],
        ],
        where,
        having: { $availableQuantity$: { [db.Sequelize.Op.gt]: 0 } },
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
        raw: true,
        nest: true,
        subQuery: false,
      });

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
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { id: userId } = req.user;
      let { id } = req.params;

      let inboundWarehouse = await db.CacaoInBoundWarehouse.findOne({
        where: { id, userId: userId },
      });

      let qrCode=null;

      if(inboundWarehouse){

        inboundWarehouse = await inboundWarehouse.toJSON();

        const {
          amount,
          product,
          quantity,
          inboundUnitValue,
          inboundUnitId,
          recordId,
        } = inboundWarehouse;
        qrCode = JSON.stringify({
          amount,
          product,
          quantity,
          inboundUnitId,
          inboundUnitValue,
          recordId,
        });
                
      }


      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { inboundWarehouse, qrCode },
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
  // validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.CacaoInBoundWarehouse.destroy({
          where: { id: id, userId: userId },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: 'Cacao inbound warehouse deleted.',
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

module.exports = router;
