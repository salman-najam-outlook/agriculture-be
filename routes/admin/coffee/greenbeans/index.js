const express = require("express")
const router = express.Router()
const { Op } = require('sequelize');
const auth = require(rootPath + "/middleware/auth")
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api")
const db = require(rootPath + "/models")
var path = require('path');
const fileUpload = require(rootPath + '/middleware/file_upload');
const S3 = require(rootPath + '/components/s3upload');
var aws = require('aws-sdk');
const multer = require('multer');
var multerS3 = require('multer-s3');
const {
  fileFilterGen,
  logErrorOccurred,
  notEmpty,
} = require(rootPath + '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});

// storage configuration
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ['image/jpeg', 'image/png'];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
// create upload
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});








router.get(
  '/list',
  auth,
  async (req, res) => {
    try {
      let orgId = req.user.organization
      let {

        page,
        limit,
        drymillingId
      } = req.query;

      let query = {}
       query ={

        include: [
          {
            model: db.Cupping,
            as: "cuppingData",
          },
          {
            model: db.ParchmentCoffeeProcessingBatch,
            as: 'parchmentBatchMap',
            include: [
              {
                model: db.BuyingStationProcessingBatch,
                as: 'buyingStationProcessingBatch',

                include: [
                  {
                    model: db.BuyingStationOrder,
                    as: 'buyingStationOrder',
                    through: 'BuyingStationProcessingBatchAndOrder',
                    include: [
                      {
                        model: db.BuyingStationProcessingBatch,
                        through: { model: db.BuyingStationProcessingBatchAndOrder, attributes: [] },
                        attributes: ['batchRating'],
                        as: 'processingBatch'
                      },
                      {
                        model: db.user,
                        as: 'buyingStation',
                        attributes: ['address', 'firstName','middleName', 'lastName', 'fullName'],
                      },
                      {
                        model: db.user,
                        as: 'farmer',
                      },
                      {
                        model: db.Plantations,
                        as: 'plantations',
                        include: [
                          {
                            model: db.CoffeeVariety,
                            as: 'coffeeVariety'
                          },
                          {
                            model: db.HorticultureInformation,
                            as: 'horticultureInformation',
                            through: {
                              model: db.HorticultureInformationMapData,
                              attributes: ['number_of_trees']
                            }
                          },
                          {
                            model: db.WindBreaker,
                            as: 'windBreakerTree',
                            through: {
                              model: db.WindBreakerTreeMapData,
                              attributes: ['number_of_trees']
                            }
                          },
                          {
                            model: db.ShadeTree,
                            as: 'shadeTree',
                            through: {
                              model: db.ShadeTreeMapData,
                              attributes: ['number_of_trees']
                            }
                          },
                          {
                            model: db.user_farm,
                            as: 'userFarms',
                            through: 'PlantationsUserFarmsMap',
                          },
                          {
                            model: db.CoffeeLandImages,
                            as: 'coffeeLandImages',
                          }
                        ]
                      },
                      {
                        model: db.user_farm,
                        as: 'userFarms',
                      },
                      {
                        model: db.CoffeeSpecies,
                        as: 'coffeeSpecies',
                      },
                      {
                        model: db.CoffeeVariety,
                        as: 'coffeeVariety',
                      },
                    ]
                  },
                  {
                    model: db.ProcessingType,
                    as: 'processingType'
                  }
                ]
              },
            ]
          },
          {
            model: db.user,
            as: 'dryMilling',
            attributes: ['address', 'firstName','middleName', 'lastName', 'fullName'],
            where: {
              organization: orgId
            }
          },
        ],
    }

    if (notEmpty(page) && notEmpty(limit)) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }

    query.order =  [['id', 'DESC']]

      let parchmentCoffeeList = await db.ParchmentCoffee.findAll(query);
      let parchmentCount = await db.ParchmentCoffee.count({
        distinct: true,
        col: 'id',
        ...query
      })

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            rows: parchmentCoffeeList,
            count: parchmentCount
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
  '/:id',
  // validationErrorHandler,
  async (req, res) => {
    try {
        let { id } = req.params;

        let parchmentCoffee = await db.ParchmentCoffee.findOne({
            where: { id },
            include: [
              {
                model: db.Cupping,
                as: "cuppingData",
              },
              {
                model: db.ParchmentCoffeeProcessingBatch,
                as: 'parchmentBatchMap',
                include: [
                  {
                    model: db.BuyingStationProcessingBatch,
                    as: 'buyingStationProcessingBatch',

                    include: [
                      {
                        model: db.BuyingStationOrder,
                        as: 'buyingStationOrder',
                        through: 'BuyingStationProcessingBatchAndOrder',
                        include: [
                          {
                            model: db.BuyingStationProcessingBatch,
                            through: { model: db.BuyingStationProcessingBatchAndOrder, attributes: [] },
                            attributes: ['batchRating'],
                            as: 'processingBatch'
                          },
                          {
                            model: db.user,
                            as: 'buyingStation',
                            attributes: ['address', 'firstName','middleName', 'lastName', 'fullName'],
                          },
                          {
                            model: db.user,
                            as: 'farmer',
                          },
                          {
                            model: db.Plantations,
                            as: 'plantations',
                            include: [
                              {
                                model: db.CoffeeVariety,
                                as: 'coffeeVariety'
                              },
                              {
                                model: db.HorticultureInformation,
                                as: 'horticultureInformation',
                                through: {
                                  model: db.HorticultureInformationMapData,
                                  attributes: ['number_of_trees']
                                }
                              },
                              {
                                model: db.WindBreaker,
                                as: 'windBreakerTree',
                                through: {
                                  model: db.WindBreakerTreeMapData,
                                  attributes: ['number_of_trees']
                                }
                              },
                              {
                                model: db.ShadeTree,
                                as: 'shadeTree',
                                through: {
                                  model: db.ShadeTreeMapData,
                                  attributes: ['number_of_trees']
                                }
                              },
                              {
                                model: db.user_farm,
                                as: 'userFarms',
                                through: 'PlantationsUserFarmsMap',
                              },
                              {
                                model: db.CoffeeLandImages,
                                as: 'coffeeLandImages',
                              }
                            ]
                          },
                          {
                            model: db.user_farm,
                            as: 'userFarms',
                          },
                          {
                            model: db.CoffeeSpecies,
                            as: 'coffeeSpecies',
                          },
                          {
                            model: db.CoffeeVariety,
                            as: 'coffeeVariety',
                          },
                        ]
                      },
                      {
                        model: db.ProcessingType,
                        as: 'processingType'
                      }
                      
                    ]
                  },
                ]
              },
              {
                model: db.user,
                as: 'dryMilling',
                attributes: ['address', 'firstName','middleName', 'lastName', 'fullName', 'mobile', 'city', 'stateId'],
              },
            ],
        });

        if (!parchmentCoffee || !parchmentCoffee.id) {
          throw new Error('Parchment coffee not found');
        };

        parchmentCoffee = await parchmentCoffee.toJSON();

        if (parchmentCoffee.buyingStationOrder && parchmentCoffee.buyingStationOrder.processingBatch && parchmentCoffee.buyingStationOrder.processingBatch.length) {
          parchmentCoffee.buyingStationOrder.batchRating = parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
          delete parchmentCoffee.buyingStationOrder.processingBatch;
        }

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data:  parchmentCoffee ,
            })
        );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);


module.exports = router