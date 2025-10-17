const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorPurchaseOrder = require(rootPath +
  '/helpers/validators/purchaseOrder');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const S3 = require(rootPath + '/components/s3upload');
const QRCode = require('qrcode');
const { getWeightUnit, convertToHectares, allAdmins, createNotification, convertToAlertsUnit} = require(rootPath + '/routes/notification/utils');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const translation = require(rootPath + "/middleware/translation");
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");

const { syncCacaoPurchaseOrderDataToOCC } = require(rootPath + '/helpers/occ-komodo');


/** 
 * CREATE PURCHASE ORDER
 */
router.post(
  '/',
  auth,
  // validatorPurchaseOrder.post(),
  duplicateRecordId.handleDuplicateRecordId('CacaoPurchaseOrder'),
  validationErrorHandler,
  async (req, res) => {
    let transaction = await db.sequelize.transaction();
    try {
      let purchaseOrder;
      //If buyer is there then create
      if(req.body.buyer){
        if (isNaN(parseInt(req.body.buyer, 10))){
           const buyerName = await createCacaoPurchaseOrderBuyer(req)
           req.body.buyer = buyerName.id  
        }
      } 
      if (req.body.farmerId && req.body.farmId) {
        purchaseOrder = await createCacaoPurchaseOrder(req, res, transaction)
        await transaction.commit()
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );
      } else if (req.body.farmerId > 0) {
        let { firstName, middleName, lastName, purchaseOrderId, address, longitude, latitude } = req.body;
        purchaseOrder = await createCacaoPurchaseOrder(req, res, transaction, req.body.farmerId)

        let offlineUser = await db.user.findOne({
          where: {
            id: req.body.farmerId
          }
        })

        if (offlineUser.userType == "offline") {
          await db.CacaoBuyingStationFarmer.bulkCreate([{ userId: req.body.farmerId, address, longitude, latitude }], {
            transaction,
            updateOnDuplicate: ["address", "longitude", "latitude"]
          });
        }
        await transaction.commit();
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);

        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );

      } else {
        let { firstName, middleName, lastName, address, longitude, latitude, userId } = req.body;
        let newUserId = await db.user.create({ firstName,middleName, lastName, organization: req.user.organization, userType: "offline", source: 'saas_api_cacao_purchase' })

        //assign membership
        let membershipRes = await db.sequelize.query(`SELECT
          u.*
            FROM
              (
              SELECT
                um.*
              FROM
                user_role_membership_map AS um
              WHERE
                um.user_role_id = 'coffee_farmer'
                AND um.membership_id NOT IN (
                SELECT
                  membership_id
                FROM
                  user_role_membership_map
                WHERE
                  user_role_id = 'buying_station'
                )
            ) AS urmm
            INNER JOIN user_membership AS u ON
              urmm.membership_id = u.id
            where
          u.org_id = ${req.user.organization};`);
        if (membershipRes && Array.isArray(membershipRes) && membershipRes.length > 0) {
          await db.UserMembershipMap.create({
            user_id: newUserId.id,
            membership_id: membershipRes[0][0].id
          })
        }


        userId = newUserId.id
        purchaseOrder = await createCacaoPurchaseOrder(req, res, transaction, userId)

        await db.CacaoBuyingStationFarmer.bulkCreate([{ userId, purchaseOrderId: purchaseOrder.id, address, longitude, latitude }], {
          transaction,
          updateOnDuplicate: ["address", "longitude", "latitude"]
        });
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);
        await transaction.commit()
        // await db.CacaoBuyingStationFarmer.create({ userId, purchaseOrderId: purchaseOrder.id, address, longitude, latitude });
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );

      }

    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


/**
 * LISTING PURCHASE ORDER
 */

router.get(
  '/',
  translation,
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { lang } = req?.headers;
      const buyingStationId = req.user.id;
      const { organization } = req.user;
      let {
        page = 1,
        limit = 1000,
        col = 'id',
        order = 'desc',
        dateRange,
        farmer,
        search,
        // duration,
      } = req.query;
      limit = parseInt(limit);

      let where = { [db.Sequelize.Op.or]: [{ buyingStationId }] };
      if (!_.isEmpty(dateRange)) {
        dateRange = dateRange
          .split('-')
          ?.map((date) =>
            moment
              .utc(date, process.env.ACCEPT_DATE_FORMAT)
              .format(process.env.DB_ONLYDATE_FORMAT)
          );
        where.purchasedAt = { [db.Sequelize.Op.between]: dateRange };
      }
      if (!_.isEmpty(farmer)) {
        farmer = farmer.split('/');
        where.farmerId = farmer;
      }
      if (!_.isEmpty(search)) {
        const fields = [
          'perKgPrice',
          'grandTotal',
          'orderCode',
        ];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        searchQuery.push(
          db.Sequelize.where(
            db.Sequelize.fn(
              'CONCAT',
              db.Sequelize.fn(
                'COALESCE',
                db.Sequelize.literal('`farmer`.`firstName`'),
                ''
              ),
              ' ',
              db.Sequelize.fn(
                'COALESCE',
                db.Sequelize.literal('`farmer`.`middleName`'),
                ''
              ),
              ' ',
              db.Sequelize.fn(
                'COALESCE',
                db.Sequelize.literal('`farmer`.`lastName`'),
                ''
              )
            ),
            {
              [db.Sequelize.Op.substring]: search,
            }
          )
        );
        

        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      // if (!_.isEmpty(duration)) {
      //   let durationDate;
      //   switch (duration) {
      //     case '7days':
      //       durationDate = moment
      //         .utc()
      //         .subtract(7, 'days')
      //         .format(process.env.DB_ONLYDATE_FORMAT);
      //       where.createdAt = { [db.Sequelize.Op.gt]: durationDate };
      //       break;
      //     default:
      //   }
      //   console.log();
      // }

      let { count: totalRows, rows } =
        await db.CacaoPurchaseOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: 'farmer',
              attributes: ['id', 'firstName', 'address', 'middleName','lastName', 'userType'],
              // include: [
              //   {
              //     model: db.CacaoBuyingStationFarmer,
              //     as: "offlineFarmerData",
              //     required: false,
              //   },
              // ],
              where: { organization },
            },
            {
              model:db.CacaoBuyingStationLandImages,
              as:'cacaoBuyingStationLandImages',
              attributes:['id','file_name','s3_key']
            },
            {
              model: db.user_farm,
              as: 'userFarms',
              attributes: ['id', 'farmName'],
            },
            {
              model: db.Geofence,
              as: 'segments',
              attributes: ['id', 'geofenceName'],
            },
            {
              model: db.CacaoVariety,
              as: 'cacaoVariety',
              attributes: ["id", "name",],
            },
            {
              model: db.CacaoSpecies,
              as: 'cacaoSpecies',
              attributes: ["id", "name",],
            },
            {
              model: db.CacaoPlantations,
              as: 'cacaoPlantations',
              attributes: ['id', 'plantation_name'],
            },
            {
              model:db.CacaoDeliveryMethod,
              as:'cacaoDeliveryMethods',
              attributes:['id','name'],
            },
            {
              model:db.Currency,
              attributes:['id','symbol','abbreviation','name'],
              as:'currency'
            },{
              model:db.CacaoCoffeePurchaseBuyer,
              attributes:['id','name'],
              as:"cacaoPurchaseBuyer",
              required: false, // This allows orders with or without a buyer name to be included.
              where: {
                id: db.sequelize.col("CacaoPurchaseOrder.buyer"),
              },
            }
          ],
          where,
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, order]],
          distinct: true,
          attributes: { exclude: ['updatedAt', 'isdeleted'] },
        });

      rows = await Promise.all(
        rows?.map(async (order) => {
          order = await order.toJSON();
          if (order.buyer && order.cacaoPurchaseBuyer) {
            order.buyer = order.cacaoPurchaseBuyer.name;
          }
          const {
            id,
            perKgPrice,
            grandTotal,
            farmer,
            userFarms,
            purchasedAt,
            orderCode,
            external_traceability_id
          } = order;
          const qrCodeData = {
            id,
            perKgPrice,
            grandTotal,
            farmer,
            userFarms,
            purchasedAt,
            orderCode,
            external_traceability_id
          };
          let qrCodeDataString = JSON.stringify(qrCodeData);

          let externalQRLink=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${external_traceability_id}`

          return { ...order, qrCodeDataString , external_traceability_link:externalQRLink };
        })
      );

      let tempRow = JSON.parse(JSON.stringify(rows))
      let resRow = []
      resRow = tempRow.map(r => {
        return r
      })
      
      if (lang && lang !== "en") {
        console.log(lang)
        resRow = req.translateFunction(
          resRow,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: true,
            moduleName: "cacao/purchase"
          }
        );
      }
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            cacaoPurchaseOrder: { totalRows, numRows: rows?.length ?? 0, rows: resRow },
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/orders',
  auth,
  validatorPurchaseOrder.list(),
  validationErrorHandler,
  async (req, res) => {
    // for creating processing batch only
    try {
      let { page = 1, limit = 10000 } = req.query;
      limit = parseInt(limit);

      const where = {};
      where.availableWeight = { [db.Sequelize.Op.not]: 0 };

      let rows = await db.CacaoPurchaseOrder.findAll({
        include: [
          {
            model: db.user,
            as: 'farmer',
            attributes: ['firstName', 'middleName','lastName'],
            // include: [
            //   {
            //     model: db.activationKeys,
            //     as: 'activation',
            //     where: {
            //       org_id: req.user.organization || 3
            //     },
            //     required: false,
            //   }
            // ]
          },
          {
            model: db.user_farm,
            as: 'userFarms',
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'segments',
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.CacaoVariety,
            as: 'cacaoVariety',
            attributes: ["id", "name",],
          },
          {
            model: db.CacaoSpecies,
            as: 'cacaoSpecies',
            attributes: ["id", "name",],
          },
          {
            model: db.CacaoPlantations,
            as: 'cacaoPlantations',
            attributes: ['id', 'plantation_name'],
          },
          {
            model: db.user,
            as: 'buyingStation',
          },
          {
            model:db.Currency,
            attributes:['id','symbol','abbreviation','name'],
            as:'currency'
          }
        ],
        attributes: [
          'id',
          'orderCode',
          'perKgPrice',
          'grandTotal',
          'cacao_weight',
          'purchasedAt',
          'availableWeight'
        ],
        where,
        offset: (page - 1) * limit,
        limit: limit,
        order: [['id', 'desc']],
        distinct: true,
      });

      // org filter
      rows = rows.filter(rowEl => (rowEl.buyingStation.organization == req.user.organization))


      // remove activation object
      let resRows = []
      resRows = JSON.parse(JSON.stringify(rows))
      rows = resRows.map(rowEl => {
        delete rowEl.farmer.activation
        return rowEl
      })

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

router.put(
  '/:orderId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('CacaoPurchaseOrder'),
  // validatorPurchaseOrder.post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const { orderId } = req.params
      let {
        buyer,
        premiumPrice,
        zoneId,
        farmId,
        farmerId,
        plantationId,
        speciesId,
        varietyId,
        perKgPrice,
        currencyId,
        grandTotal,
        purchasedAt,
        cacaoWeight,
        cacaoWeightUnitId,
        cacaoType,
        address, longitude, latitude,
        productType,
        moisture,
        deliveryMethodId = null,
        cacaoCherryPic,
        hasHarvestingDateInfo,
        harvestingStartDate,
        harvestingEndDate,
      } = req.body;
      
      if(buyer){
        if (isNaN(parseInt(req.body.buyer, 10))){
           const buyerName = await createCacaoPurchaseOrderBuyer(req)
           buyer = buyerName.id  
        }
      } 

      let set = {
        ...(buyer && { buyer }),
        ...(premiumPrice && { premiumPrice }),
        ...(farmerId && { farmerId: farmerId }),
        ...(farmId && { farmId: farmId }),
        ...(zoneId && { zoneId: zoneId }),
        ...(plantationId && { cacao_plantation: plantationId }),
        ...(speciesId && { cacao_species: speciesId }),
        ...(cacaoWeight && { cacao_weight: cacaoWeight }),
        ...(cacaoWeightUnitId && { cacao_weight_unit_id: cacaoWeightUnitId }),
        ...(cacaoType && { cacao_type: cacaoType }),
        ...(perKgPrice && { perKgPrice: perKgPrice }),
        ...(currencyId && { currencyId: currencyId }),
        ...(grandTotal && { grandTotal: grandTotal }),
        ...(purchasedAt && { purchasedAt: moment.utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT) }),
        ...(productType && { product_type: productType }),
        ...(moisture && { moisture: moisture }),
        ...(hasHarvestingDateInfo && { hasHarvestingDateInfo: hasHarvestingDateInfo }),
        ...(harvestingStartDate && { harvestingStartDate: harvestingStartDate }),
        ...(harvestingEndDate && { harvestingEndDate: harvestingEndDate }),
        ...(deliveryMethodId && { cacao_delivery_method_id: deliveryMethodId }),
        cacao_cherry_pic: cacaoCherryPic?.s3_key ? {
          s3_key: cacaoCherryPic.s3_key,
          file_name: `${ process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/" }${cacaoCherryPic.s3_key}`
        } : null ,
      };

      var transaction = await db.sequelize.transaction();

      
      if (varietyId && varietyId.length > 0) {
        await db.CacaoPurchaseOrderVarieties.destroy({
          where:{
            cacao_purchase_id : orderId
          },
          transaction
        });

        const purchaseVarietyObj = varietyId.map((variety_id) => {
          return {
            cacao_purchase_id: orderId,
            cacao_variety_id: variety_id
          }
        })
        await db.CacaoPurchaseOrderVarieties.bulkCreate(purchaseVarietyObj, { transaction })
      }

      let cacaoPurchaseOrder = await db.CacaoPurchaseOrder.update(set, {
        where: {
          id: orderId
        },
        transaction,
      });
      // orderCode = `PO-000${buyingStationOrder?.id}`;
      // await buyingStationOrder.set({ orderCode }).save({ transaction });

      //update offline farmer data
      if (address || farmId > 0 || farmId == null) {
        await db.CacaoBuyingStationFarmer.update({ address, longitude, latitude }, {
          where: {
            userId: farmerId
          },
          transaction
        });
      }

      await transaction.commit();

      let resObj = await db.CacaoPurchaseOrder.findOne({
        where: {
          id: orderId
        },
        include:[
          {
            model:db.Currency,
            attributes:['id','symbol','abbreviation','name'],
            as:'currency'
          }
        ]
      });
      await syncCacaoPurchaseOrderDataToOCC(orderId);
      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: resObj,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


router.delete(
  '/:orderId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('CacaoPurchaseOrder'),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const { orderId } = req.params

      let set = {
        isdeleted: new Date()
      };

      var transaction = await db.sequelize.transaction();

      let cacaoPurchaseOrder = await db.CacaoPurchaseOrder.update(set, {
        where: {
          id: orderId
        },
        transaction,
      });
      await transaction.commit();

      let resObj = await db.CacaoPurchaseOrder.findOne({
        where: {
          id: orderId
        }
      });
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: resObj,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get('/cacao-purchase-buyers',auth, async (req, res) => {
  try {
    const cacaoPurchaseBuyers = await db.CacaoCoffeePurchaseBuyer.findAll({
      attributes:['id', 'name'],
      where:{
        buyer_belong_to:req.user.id
      }
    }) 
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data:cacaoPurchaseBuyers,
      })
    );
  }catch(err){
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

async function createCacaoPurchaseOrderBuyer(req) {
  let purchase_buyer = await db.CacaoCoffeePurchaseBuyer.create({
     name:req.body.buyer,
     buyer_belong_to:req.user.id
  })
  return purchase_buyer
}


// CREATE CACAO PURCHASE ORDER
async function createCacaoPurchaseOrder(req, res, transaction, newUserId) {
  const {organization, id: buyingStationId} = req.user;
  const {
    buyer,
    premiumPrice,
    farmerId,
    farmId,
    zoneId,
    plantationId,
    speciesId,
    varietyId,
    cacaoWeight,
    cacaoWeighUnitId,
    cacaoType,
    currencyId,
    perKgPrice,
    grandTotal,
    recordId,
    purchasedAt,
    images,
    cacaoCherryPic, //"cacaoCherryPic": { "s3_key": "IMG_20240627085802.png" }
    productType,
    moisture,
    deliveryMethodId = null,
    hasHarvestingDateInfo,
    harvestingStartDate,
    harvestingEndDate,
  } = req.body;


  let set = {
    buyer, // Once registered_buyer table is available, it will reference id of that table
    premiumPrice,
    buyingStationId,
    farmerId: newUserId || farmerId,
    farmId,
    zoneId,
    cacao_plantation: plantationId,
    cacao_species: speciesId,
    cacao_weight: cacaoWeight,
    cacao_weight_unit_id: cacaoWeighUnitId,
    cacao_type: cacaoType,
    currencyId,
    perKgPrice,
    grandTotal,
    recordId,
    cacao_cherry_pic: cacaoCherryPic?.s3_key ? {
      s3_key: cacaoCherryPic.s3_key,
      file_name: `${ process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/" }${cacaoCherryPic.s3_key}`
    } : null ,
    product_type: productType,
    cacao_delivery_method_id:deliveryMethodId,
    moisture: moisture,
    availableWeight: cacaoWeight,
    purchasedAt: moment.utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT),
    hasHarvestingDateInfo,
    harvestingStartDate,
    harvestingEndDate,
  }

  let purchaseOrder = await db.CacaoPurchaseOrder.create(set, {
    transaction,
  })

  orderCode = `PO-000${purchaseOrder?.id}`;

  const externalId = await insertTraceabilityExternalId(
    "cacao_purchase_order",
    purchaseOrder.id
  );
  
  if (images && images.length > 0) {
    let filesArr = [];

    images.forEach(async (res, index) => {
      filesArr.push({
        purchase_id: purchaseOrder.id,
        s3_key: res.s3_key,
        file_name: `${
          process.env.PUBLIC_BUCKET_URL ||
          "https://dimitra-public-images.s3.amazonaws.com/"
        }${res.s3_key}`,
      });
    });
    await db.CacaoBuyingStationLandImages.bulkCreate(filesArr, { transaction });
  }
  
  if (purchaseOrder && purchaseOrder.id) {

    if (varietyId && varietyId.length > 0) {
      const purchaseOrderVarietyObj = varietyId.map((variety_id) => {
        return {
          cacao_purchase_id: purchaseOrder.id,
          cacao_variety_id: variety_id
        }
      })
      await db.CacaoPurchaseOrderVarieties.bulkCreate(purchaseOrderVarietyObj, { transaction })
    }

    // Create plantation_purchaseorder table;

    if(plantationId && plantationId.length > 0){
      let setData=plantationId?.map(pId=>({
        plantationId:pId,
        purchaseOrderId:purchaseOrder.id
      }));

      await db.CacaoPlantationPurchaseOrder.bulkCreate(setData,{transaction})
    }

    await db.CacaoPurchaseOrder.update({ orderCode, external_traceability_id: externalId.id }, {
      where: {
        id: purchaseOrder?.id
      },
      transaction
    });



    let harvestWhere = {
      organization,
    }
  
    // check crops exists or not;
    const cacaoData = await db.Option.findAll({
      attributes:['id', 'region'],
      where: {
        [Op.or]: [
          { name: { [Op.like]: '%cacao%' } },
          { name: { [Op.like]: '%cocoa%' } }
        ]
      }
    })

    const cacaoCropIds = cacaoData.map(item=>item.id);
    const cacaoCountrys = cacaoData.map(item=>item.region)

    if(cacaoCropIds.length > 0){
      harvestWhere.cropId = {
        [Op.in]:cacaoCropIds
      }
      harvestWhere.country = {
        [Op.in]:cacaoCountrys
      }
    }

    const alertCriteria = await db.HarvestAlert.findOne({
      where: harvestWhere,
      include: [
        {
          model: db.Option,
          as: 'crop',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: db.UnitsList,
          as: "unit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
    });

    if (alertCriteria) {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      // converts baseMaxAllowed to kg / hector / year
      let maxAllowedPerKgHaYr = 0;
      if(alertCriteria && alertCriteria.maxAllowed && alertCriteria.unit){
        maxAllowedPerKgHaYr = parseFloat(await getWeightUnit(+alertCriteria.maxAllowed, alertCriteria.unit))
      }


      const cacaoData = await db.CacaoPurchaseOrder.findAll({
        attributes: ['id','cacao_weight','cacao_weight_unit_id'],
        include: [
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName","area"],
          },
        ],
        where: {
          buyingStationId,
          createdAt: {
            [Op.gte]: twelveMonthsAgo,
          },
        },
      });

      // console.log(cacaoData.map((item=>({id:item.id,weight:item.cacao_weight,unit:item.cacao_weight_unit_id}))))


      const totalCacaoPerKgHaYr = new Promise(async (resolve, reject) => {
        try {
          let totalCacaoYield = 0;

          for (const ch of cacaoData) {
              let cacaoYieldInKg = 0;
              let areaInHector = 0;
              let yieldPerHectare = 0;

              if (ch && ch.cacao_weight) {
                  cacaoYieldInKg = parseFloat(await getWeightUnit(+ch.cacao_weight, alertCriteria.unit));
              }

              if (ch && ch.userFarms && ch.userFarms.area) {
                  areaInHector = await convertToHectares(ch.userFarms.area);
              }

              console.log("areaHA", cacaoYieldInKg, areaInHector, ch.cacao_weight);

              if(areaInHector){
                yieldPerHectare = cacaoYieldInKg / areaInHector;
              }
              console.log({ yieldPerHectare });

              totalCacaoYield += yieldPerHectare;
          }

          resolve(totalCacaoYield);
          } catch (error) {
              reject(error);
          }
        });
        let farm 
        if(farmId) {
          farm = await db.user_farm.findOne({ where: { id: farmId } });
        }
        let newCacaoQtyKgPerHA = 0;
  
        if(farm && farm.area){
          const newAreaInHectare = await convertToHectares(farm.area);
          newCacaoQtyKgPerHA = parseFloat(cacaoWeight/newAreaInHectare);
        }
   try {
      const [maxAllowed, totalCacao] = await Promise.allSettled([maxAllowedPerKgHaYr, totalCacaoPerKgHaYr]);
    
      const totalCacaoQty = totalCacao.value + newCacaoQtyKgPerHA; // newly created quantity added

      console.log("Max Allowed Per Kg Ha Yr:", maxAllowed.value);
      console.log("Total Cacao Per Kg Ha Yr:", totalCacao.value);
    
      if (maxAllowed.value < totalCacaoQty) {
        let totalReported = convertToAlertsUnit(totalCacaoQty, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
        let maxAllowedConverted = convertToAlertsUnit(maxAllowed.value, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
        const listRes = await allAdmins(organization);
        const farmer = await db.user.findOne({ where: { id: set.farmerId }, attributes: ['firstName', 'middleName','lastName'] });
    
        let message;
        let title = "High production Alert!";
        let type = "crop_harvest";
        if (farmId) {
          message = `High production Alert! Farm: ${farm?.farmName}, Farmer: ${farmer.firstName} ${farmer.lastName}, Crop: Cacao, Total reported: ${totalReported}, Max allowed: ${maxAllowedConverted}`;
        } else {
          message = `High production Alert! Farmer: ${farmer.firstName} ${farmer.lastName}, Crop: Cacao, Total reported: ${totalReported}, Max allowed: ${maxAllowedConverted}`;
        }
    
        const notificationAdmin = {
          user: { id: buyingStationId },
          body: {
            notify: 'admin',
            message,
            title,
            type,
            users: listRes,
          }
        };
    
        const notificationUser = {
          user: { id: buyingStationId },
          body: {
            notify: 'user',
            message,
            title,
            type,
            users: [buyingStationId],
          }
        };
    
        if (alertCriteria.alertAdmin && alertCriteria.alertFarmer) {
          await Promise.all([
            createNotification(notificationAdmin, ),
            createNotification(notificationUser, )
          ]);
        } else if (alertCriteria.alertAdmin) {
          await createNotification(notificationAdmin, );
        } else if (alertCriteria.alertFarmer) {
          await createNotification(notificationUser, );
        }
      }
      } catch (error) {
        console.error("Error:", error);
      }
    }  

    purchaseOrder = await db.CacaoPurchaseOrder.findOne({
      where: {
        id: purchaseOrder?.id
      },
      include:[
        {
          model:db.CacaoBuyingStationLandImages,
          as:'cacaoBuyingStationLandImages',
          attributes:['id','file_name','s3_key']
        }
      ],
      transaction
    });

  }



  return purchaseOrder;
}

module.exports = router;