const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError, errorResp, errorRespSync,  } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');

const fileUpload = require(rootPath + '/middleware/file_upload');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');

const _ = require('lodash');
const QRCode = require('qrcode');
const moment = require('moment');
const translation = require(rootPath + '/middleware/translation');
const { Op } = require('sequelize');

router.get('/', auth, async (req, res) => {
  try {
    let where = {
      // '$dryMillingParchment.dryMillingUserId$': userId,
      // '$dryMillingParchment.usedForWarehouse$': false,
    };

    // get parchment cacao list
    let rows = await db.user.findAll({
      subQuery: false,
      where,
      order: [
        ['createdAt', 'desc'],
      ],
      attributes: [
        'id',
        [
          db.Sequelize.fn(
            'CONCAT',
            db.Sequelize.col('user.firstName'),
            ' ',
            db.Sequelize.fn(
              'COALESCE',
              db.Sequelize.col('user.middleName'),
              ''
            ),
            ' ',
            db.Sequelize.col('user.lastName')
          ),
          'name',
        ],
      ],      
      include: [
        {
          required: true,
          model: db.CacaoDryingProcess,
          as: 'cacaoDryingProcess',
          attributes: [
            'id',
            'dryingCode',
            'finalWeight',
            [
              db.Sequelize.fn(
                'DATE_FORMAT',
                db.Sequelize.col('dryingInitialDate'),
                '%d/%m/%Y'
              ),
              'dryingInitialDate',
            ],
            'status'
          ],
          where:{
            status:'Incomplete',
          }
        },
        {
          model:db.CacaoPurchaseOrder,
          as:'cacaoBuyingStationOrder',
          attributes:['id'],
          include: [
            {
              model: db.CacaoSpecies,
              as: 'cacaoSpecies',
              attributes: ['id', 'name'],
            },
            {
              model: db.CacaoVariety,
              as: 'cacaoVariety',
              attributes: ['id', 'name'],
            },
          ],
        }
      ],
    });

    rows = await Promise.all(
      rows?.map(async (user) => {
        user = await user.toJSON();

        // user.dryMillingParchment = user.dryMillingParchment.map(parchment => {
        //   const species = parchment.parchmentCoffeeProcessingBatches && parchment.parchmentCoffeeProcessingBatches.length
        //     ? parchment.parchmentCoffeeProcessingBatches.map(parchmentCoffeeProcessingBatch => {
        //       return parchmentCoffeeProcessingBatch?.buyingStationProcessingBatch?.buyingStationOrder[0]?.coffeeSpecies;
        //     }) : [];
        //   const varieties = parchment.parchmentCoffeeProcessingBatches && parchment.parchmentCoffeeProcessingBatches.length
        //     ? parchment.parchmentCoffeeProcessingBatches.map(parchmentCoffeeProcessingBatch => {
        //       return parchmentCoffeeProcessingBatch?.buyingStationProcessingBatch?.buyingStationOrder[0]?.coffeeVariety;
        //     }) : [];
        //   const qrCode = JSON.stringify({
        //     id: parchment.idNum,
        //     purchaseDate: parchment.purchaseDate,
        //     species: species,
        //     varieties: varieties,
        //   });
        //   // const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

        //   return { ...parchment, qrCode }
        // });


        return user;
      })
    );
    // get buyingstation parchment out list
  
    usersRes = await db.user.findAll({where: {organization: req.user.organization}})
    buyingStationWhere = usersRes?.map(userEl => userEl.id)


    let buyingStationParchData = await db.user.findAll({
      attributes: ['firstName','middleName', 'lastName', 'fullName', 'id'],
      where: {
        id: buyingStationWhere,
        // '$buyingStationProcessingBatches.usedForWarehouse$': false,
      },
      // include: {
      //   model: db.BuyingStationProcessingBatch,
      //   as: 'buyingStationProcessingBatches',
      //   required: true,
      //   include: [
      //     {
      //       model: db.user,
      //       as: 'buyingStation',
      //       attributes: ['firstName', 'lastName', 'fullName'],
      //     },
      //     // {
      //     //   model: db.BuyingStationOrder,
      //     //   through: 'BuyingStationProcessingBatchAndOrder',
      //     //   as: 'buyingStationOrder',
      //     //   attributes: ['id'],
      //     //   include: [
      //     //     {
      //     //       model: db.CoffeeSpecies,
      //     //       as: 'coffeeSpecies',
      //     //       attributes: ['id', 'name'],
      //     //     },
      //     //     {
      //     //       model: db.CoffeeVariety,
      //     //       as: 'coffeeVariety',
      //     //       attributes: ['id', 'name'],
      //     //     },
      //     //     {
      //     //       model: db.user,
      //     //       as: 'buyingStation',
      //     //       attributes: ['firstName', 'lastName', 'fullName'],
      //     //     },
      //     //   ],
      //     //   through: {
      //     //     attributes: [],
      //     //   },
      //     // },
      //   ],
      // }
      
    })

    let buyingStationParchDataCopy = JSON.parse(JSON.stringify(buyingStationParchData))
    let finalBuyingStationData = buyingStationParchDataCopy.map((el) => {
          let tmpObj = {};
          tmpObj.id = el.id;
          tmpObj.name = el.fullName;
          // tmpObj.buyingStationProcessingBatches = []
          // tmpObj.buyingStationProcessingBatches =  el.buyingStationProcessingBatches.filter((fel => {
          //     if(fel.parchmentOut) {
          //       let tmpVar = fel.buyingStation.fullName
          //       fel.buyingStation = tmpVar
          //       return fel
          //     }else {
          //       return
          //     }
          //   }));

          tmpObj.type = "BUYING_STATION";
          return tmpObj;
        })
    rows = [
      ...rows.map((el) => {
        el.type = "DRY_REGISTER";
        return el;
      }),
      // ...finaBluyingStationData.filter(fel => {
      //   if(fel.buyingStationProcessingBatches.length > 0) {
      //     return fel
      //   } else {
      //     return
      //   }
      // })
    ];

    // for translation
    // const { lang } = req?.headers;
    // if (lang && lang !== 'en') {
    //   rows = req.translateFunction(rows, globalTranslationCache, {
    //     lvl1: true,
    //     moduleName: 'coffee/dryMilling/parchmentCoffee',
    //   });
    // }

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
});



module.exports = router;