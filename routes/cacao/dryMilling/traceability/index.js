const express= require('express');
const router= express.Router();
const db = require(rootPath + "/models");
const {
    successRespSync,
    serverError,
    errorResp,
    errorRespSync,
  } = require(rootPath + "/helpers/api");
  const { success } = require(rootPath + "/helpers/language");
  const { logErrorOccurred } = require(rootPath + "/helpers/general");
  

router.get(
    "/:id",
    // validationErrorHandler,
    async (req, res) => {
      try {
        let { id } = req.params;
  
        let cacaoDryingProcess = await db.CacaoDryingProcess.findOne({
          where: { id },
          include: [
            {
                model:db.CacaoDryMillingFlavor,
                as:'dryMillingFlavor',
                attributes:['id','name']
            },
            {
              model: db.CacaoFermentationDryingProcess,
              as: "fermentationsDryingProcess",
              include: [
                {
                  model: db.CacaoFermentationProcess,
                  as: "fermentation",
  
                  include: [
                    {
                      model: db.user,
                      as: "fermentationUser",
                      attributes: ["address", "firstName", "middleName","lastName", "fullName",'profilePicUrl'],
                    },
                    {
                      model: db.CacaoPurchaseOrder,
                      as: "cacaoPurchaseOrder",
                      through: "CacaoFermentationAndPurchaseOrder",
                      include: [
                        // {
                        //   model: db.BuyingStationProcessingBatch,
                        //   through: {
                        //     model: db.BuyingStationProcessingBatchAndOrder,
                        //     attributes: [],
                        //   },
                        //   attributes: ["batchRating"],
                        //   as: "processingBatch",
                        // },
                        {
                          model: db.user,
                          as: "buyingStation",
                          attributes: [
                            "address",
                            "firstName",
                            "middleName",
                            "lastName",
                            "fullName",
                            "profilePicUrl",
                          ],
                        },
                        {
                          model: db.user,
                          as: "farmer",
                        },
                        {
                          model: db.CacaoPlantations,
                          as: "cacaoPlantations",
                          include: [
                            {
                              model: db.CacaoVariety,
                              as: "cacaoVariety",
                            },
                            {
                              model: db.HorticultureInformation,
                              as: "horticultureInformation",
                              through: {
                                model: db.CacaoHorticultureInformationMapData,
                                attributes: ["number_of_trees"],
                              },
                            },
                            {
                              model: db.WindBreaker,
                              as: "windBreakerTree",
                              through: {
                                model: db.CacaoWindBreakerTreeMapData,
                                attributes: ["number_of_trees"],
                              },
                            },
                            {
                              model: db.ShadeTree,
                              as: "shadeTree",
                              through: {
                                model: db.CacaoShadeTreeMapData,
                                attributes: ["number_of_trees"],
                              },
                            },
                            {
                              model: db.user_farm,
                              as: "userFarms",
                              through: "PlantationsUserFarmsMap",
                            },
                            {
                              model: db.CacaoLandImages,
                              as: "cacaoLandImages",
                            },
                          ],
                        },
                        {
                          model: db.user_farm,
                          as: "userFarms",
                        },
                        {
                          model: db.CacaoSpecies,
                          as: "cacaoSpecies",
                        },
                        {
                          model: db.CacaoVariety,
                          as: "cacaoVariety",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: db.user,
              as: "dryMilling",
              attributes: ["address", "firstName", "middleName","lastName", "fullName",'profilePicUrl'],
            },
          ],
        });
  
        if (!cacaoDryingProcess || !cacaoDryingProcess.id) {
          throw new Error("Cacao dry register not found");
        }
  
        cacaoDryingProcess = await cacaoDryingProcess.toJSON();
        const org_id = await db.user.findOne({ 
          where: { id: cacaoDryingProcess.dryRegisterUserId},
          attributes: ["organization"]
        })
  
        let globalSetting = {};
        globalSetting["areaunit"] = await db.GlobalSetting.findOne({
          attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
          include: [
            {
              model: db.UnitsList,
              as: "areaUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
            {
              model: db.UnitsList,
              as: "weightUnit",
              attributes: ["id", "name", "abbvr", "unitType", "factor"],
            },
          ],
          where: { org_id }
        });
        
        //default global area unit
        if (Object.keys(globalSetting).length) {
          globalSetting["areaunit"] = await db.UnitsList.findOne({ 
            where: { name: 'Acre' },
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          })
          globalSetting["weightunit"] = await db.UnitsList.findOne({ 
            where: { name: 'Kilogram' },
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          })
        }
  
        // if (
        //   parchmentCoffee.buyingStationOrder &&
        //   parchmentCoffee.buyingStationOrder.processingBatch &&
        //   parchmentCoffee.buyingStationOrder.processingBatch.length
        // ) {
        //   parchmentCoffee.buyingStationOrder.batchRating =
        //     parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
        //   delete parchmentCoffee.buyingStationOrder.processingBatch;
        // }
  
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: { cacaoDryingProcess, globalSetting },
          })
        );
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    }
  );


router.get(
  "/fermentation/:id",
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { id } = req.params;

      let fermentationProcess = await db.CacaoFermentationProcess.findOne({
        where: { id },
        include: [
            {
              model: db.user,
              as: "fermentationUser",
              attributes: ["address", "firstName", "middleName","lastName", "fullName",'profilePicUrl'],
            },
            {
              model: db.CacaoPurchaseOrder,
              as: "cacaoPurchaseOrder",
              through: "CacaoFermentationAndPurchaseOrder",
              include: [
                // {
                //   model: db.BuyingStationProcessingBatch,
                //   through: {
                //     model: db.BuyingStationProcessingBatchAndOrder,
                //     attributes: [],
                //   },
                //   attributes: ["batchRating"],
                //   as: "processingBatch",
                // },
                {
                  model: db.user,
                  as: "buyingStation",
                  attributes: [
                    "address",
                    "firstName",
                    "middleName",
                    "lastName",
                    "fullName",
                    "profilePicUrl",
                  ],
                },
                {
                  model: db.user,
                  as: "farmer",
                },
                {
                  model: db.CacaoPlantations,
                  as: "cacaoPlantations",
                  include: [
                    {
                      model: db.CacaoVariety,
                      as: "cacaoVariety",
                    },
                    {
                      model: db.HorticultureInformation,
                      as: "horticultureInformation",
                      through: {
                        model: db.CacaoHorticultureInformationMapData,
                        attributes: ["number_of_trees"],
                      },
                    },
                    {
                      model: db.WindBreaker,
                      as: "windBreakerTree",
                      through: {
                        model: db.CacaoWindBreakerTreeMapData,
                        attributes: ["number_of_trees"],
                      },
                    },
                    {
                      model: db.ShadeTree,
                      as: "shadeTree",
                      through: {
                        model: db.CacaoShadeTreeMapData,
                        attributes: ["number_of_trees"],
                      },
                    },
                    {
                      model: db.user_farm,
                      as: "userFarms",
                      through: "PlantationsUserFarmsMap",
                    },
                    {
                      model: db.CacaoLandImages,
                      as: "cacaoLandImages",
                    },
                  ],
                },
                {
                  model: db.user_farm,
                  as: "userFarms",
                },
                {
                  model: db.CacaoSpecies,
                  as: "cacaoSpecies",
                },
                {
                  model: db.CacaoVariety,
                  as: "cacaoVariety",
                },
              ],
            },
            {
              model:db.CacaoFermentationDryingProcess,
              as:'fermentationDryRegister',
              include:[
                {
                  model:db.CacaoDryingProcess,
                  as:'dryRegister',
                  include:[
                    {
                      model:db.CacaoDryMillingFlavor,
                      as:'dryMillingFlavor',
                      attributes:['id','name']
                    },
                    {
                      model: db.user,
                      as: "dryMilling",
                      attributes: ["address", "firstName", "middleName","lastName", "fullName",'profilePicUrl'],
                    },
                  ]
                },
              ]
            }
        ],
      });

      if (!fermentationProcess || !fermentationProcess.id) {
        throw new Error("Fermentation process not found");
      }

      fermentationProcess = await fermentationProcess.toJSON();
      const org_id = await db.user.findOne({ 
        where: { id: fermentationProcess.buyingStationId},
        attributes: ["organization"]
      })

      let globalSetting = {};
      globalSetting["areaunit"] = await db.GlobalSetting.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
        include: [
          {
            model: db.UnitsList,
            as: "areaUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.UnitsList,
            as: "weightUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
        ],
        where: { org_id }
      });
      
      //default global area unit
      if (Object.keys(globalSetting).length) {
        globalSetting["areaunit"] = await db.UnitsList.findOne({ 
          where: { name: 'Acre' },
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        })
        globalSetting["weightunit"] = await db.UnitsList.findOne({ 
          where: { name: 'Kilogram' },
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        })
      }

      // if (
      //   parchmentCoffee.buyingStationOrder &&
      //   parchmentCoffee.buyingStationOrder.processingBatch &&
      //   parchmentCoffee.buyingStationOrder.processingBatch.length
      // ) {
      //   parchmentCoffee.buyingStationOrder.batchRating =
      //     parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
      //   delete parchmentCoffee.buyingStationOrder.processingBatch;
      // }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { fermentationProcess, globalSetting },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports=router;