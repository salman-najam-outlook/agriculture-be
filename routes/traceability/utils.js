const db = require(rootPath + "/models");
const _ = require("lodash")

exports.dryMilling = async (external_id) => {
  let cacaoDryingProcessData = {};
  try {
    cacaoDryingProcessData = await db.CacaoDryingProcess.findOne({
      where: { external_traceability_id: external_id },
      include: [
        {
          model: db.CacaoDryMillingFlavor,
          as: "dryMillingFlavor",
          attributes: ["id", "name"],
        },
        {
          model: db.DryingType,
          as: "cacaoDryingType",
          required: false,
          attributes: ["id", "name"],
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
                  attributes: [
                    "address",
                    "firstName",
                    "lastName",
                    "middleName",
                    "fullName",
                    "profilePicUrl",
                  ],
                },
                {
                  model: db.CacaoPurchaseOrder,
                  as: "cacaoPurchaseOrder",
                  through:  { model: db.CacaoFermentationAndPurchaseOrder, paranoid: true  },
                  include: [
                    {
                      model: db.user,
                      as: "buyingStation",
                      attributes: [
                        "address",
                        "firstName",
                        "lastName",
                        "middleName",
                        "fullName",
                        "profilePicUrl",
                      ],
                    },
                    {
                      model: db.user,
                      as: "farmer",
                      attributes: [
                        "address",
                        "firstName",
                        "lastName",
                        "middleName",
                        "fullName",
                        "profilePicUrl",
                      ],
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
                          model: db.CacaoSpecies,
                          as: "cacaoSpecies",
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
                          model: db.Geofence,
                          as: "segments",
                          through: "CacaoPlantationsGeofenceMap",
                          attributes: ['id', 'geofenceName'],
                          include: [{
                            as: 'farm',
                            model: db.user_farm,
                            attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                            include: [
                              {
                                model: db.FarmTraceability,
                                attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                                as: "farmTraceability"
                              },
                              {
                                model: db.user,
                                as: "user",
                                attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                              }
                            ]
                          }]
                        },
                        {
                          model: db.user_farm,
                          as: "userFarms",
                          through: "PlantationsUserFarmsMap",
                          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                          include: [
                            {
                              model: db.FarmTraceability,
                              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                              as: "farmTraceability"
                            }
                          ]
                        },
                        {
                          model: db.CacaoLandImages,
                          as: "cacaoLandImages",
                        },
                        {
                          model: db.user,
                          as: "user",
                          attributes: [
                            "address",
                            "firstName",
                            "middleName",
                            "lastName",
                            "fullName",
                            "profilePicUrl",
                          ],
                        },
                      ],
                    },
                    {
                      model: db.Geofence,
                      as: "segments",
                      include: [{
                        as: 'farm',
                        model: db.user_farm,
                        attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                        include: [
                          {
                            model: db.FarmTraceability,
                            attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                            as: "farmTraceability"
                          },
                          {
                            model: db.user,
                            as: "user",
                            attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                          }
                        ]
                      }, {
                        model: db.GeofenceCoordinate,
                        as: "geofence_coordinates"
                      }]
                    },
                    {
                      model: db.user_farm,
                      as: "userFarms",
                      attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                      include: [
                        {
                          model: db.FarmTraceability,
                          attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                          as: "farmTraceability"
                        },
                        {
                          model: db.user,
                          as: "user",
                          attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                        },
                        {
                          attributes: ["id", "lat", "log"],
                          model: db.UserFarmCoordinate,
                          as: "coordinates",
                        },
                        {
                          model: db.Geofence,
                          as: "segments"
                        },
                      ]
                    },
                    {
                      model: db.CacaoSpecies,
                      as: "cacaoSpecies",
                    },
                    {
                      model: db.CacaoVariety,
                      through:"CacaoPurchaseOrderVarieties",
                      as: "cacaoVariety",
                    },
                  ],
                  paranoid: true
                },
              ],
            },
          ],
        },
        {
          model: db.user,
          as: "dryMilling",
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
          model: db.CacaoInBoundWarehouse,
          as: "inboundWarehouses",
          through:  { model: db.dryCacaoInboundWarehouseMap, paranoid: true  },
          include: [
            {
              model: db.CacaoOutBoundWarehouse
            },
            {
              model: db.user,
              as: "warehouseOwner",
              attributes: ["fullName", "firstName","middleName", "lastName", "address", "profilePicUrl",],

            }
          ]
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }

  if (cacaoDryingProcessData && typeof cacaoDryingProcessData.toJSON === 'function') {
    cacaoDryingProcessData = await cacaoDryingProcessData.toJSON();
  }
  let cacaoFermentationData = cacaoDryingProcessData?.fermentationsDryingProcess?.map(batch => batch.fermentation);

  let purchaseOrderData = cacaoFermentationData?.flatMap(data => data.cacaoPurchaseOrder)?.filter(cacaoPurchaseOrder => cacaoPurchaseOrder !== null)?.flat();
  let plantationData = purchaseOrderData?.map(data => data.cacaoPlantations)?.filter(cacaoPlantations => cacaoPlantations !== null);
  let farmData = purchaseOrderData?.map(data => {
    if(data.userFarms) {
      return  data.userFarms
    } else if(data.segments) {
      let tmpObj = {}
      tmpObj = JSON.parse(JSON.stringify(data.segments.farm));
      tmpObj.coordinates = data.segments.geofence_coordinates;
      return  tmpObj
    }
  })?.filter(userFarms => userFarms !== null) || null;

  if (cacaoFermentationData && cacaoFermentationData.length > 0) {
    
    if (purchaseOrderData && purchaseOrderData.length > 0) {
      for (item of purchaseOrderData) {
        delete item.cacaoPlantations;
      }
    }
  }

  
  return {  
    cacaoDryingProcessData,
    cacaoFermentationData,
    purchaseOrderData,
    plantationData,
    farmData
  };
};

exports.processingBatch = async (external_id) => {
  let cacaoFermentationData = {};
  try {
    cacaoFermentationData = await db.CacaoFermentationProcess.findAll({
      where: { external_traceability_id: external_id },
      include: [
        {
          model: db.user,
          as: "fermentationUser",
          attributes: [
            "address",
            "firstName",
            "lastName",
            "middleName",
            "fullName",
            "profilePicUrl",
          ],
        },
        {
          model: db.CacaoPurchaseOrder,
          as: "cacaoPurchaseOrder",
          through: "CacaoFermentationAndPurchaseOrder",
          include: [
            {
              model: db.user,
              as: "buyingStation",
              attributes: [
                "address",
                "firstName",
                "lastName",
                "middleName",
                "fullName",
                "profilePicUrl",
              ],
            },
            {
              model: db.user,
              as: "farmer",
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
              model: db.CacaoPlantations,
              as: "cacaoPlantations",
              include: [
                {
                  model: db.CacaoVariety,
                  as: "cacaoVariety",
                },
                {
                  model: db.CacaoSpecies,
                  as: "cacaoSpecies",
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
                  attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                  include: [
                    {
                      model: db.FarmTraceability,
                      attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                      as: "farmTraceability"
                    },
                    {
                      model: db.user,
                      as: "user",
                      attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                    }
                  ]
                },
                {
                  model: db.Geofence,
                  as: "segments",
                  through: "CacaoPlantationsGeofenceMap",
                  attributes: ['id', 'geofenceName'],
                  include: [{
                    as: 'farm',
                    model: db.user_farm,
                    attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                    include: [
                      {
                        model: db.FarmTraceability,
                        attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                        as: "farmTraceability"
                      },
                      {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                      }
                    ]
                  }]
                },
                {
                  model: db.CacaoLandImages,
                  as: "cacaoLandImages",
                },
                {
                  model: db.user,
                  as: "user",
                  attributes: [
                    "address",
                    "firstName",
                    "middleName",
                    "lastName",
                    "fullName",
                    "profilePicUrl",
                  ],
                },
              ],
            },
            {
              model: db.Geofence,
              as: "segments",
              include: [{
                as: 'farm',
                model: db.user_farm,
                attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                include: [
                  {
                    model: db.FarmTraceability,
                    attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                    as: "farmTraceability"
                  },
                  {
                    model: db.user,
                    as: "user",
                    attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                  }
                ]
              }, {
                        model: db.GeofenceCoordinate,
                        as: "geofence_coordinates"
                      }]
            },
            {
              model: db.user_farm,
              as: "userFarms",
              attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
              include: [
                {
                  model: db.FarmTraceability,
                  attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                  as: "farmTraceability"
                },
                {
                  model: db.user,
                  as: "user",
                  attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                },
                   {
                          attributes: ["id", "lat", "log"],
                          model: db.UserFarmCoordinate,
                          as: "coordinates",
                        },
                        {
                          model: db.Geofence,
                          as: "segments"
                        },
              ]
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
    });
  } catch (error) {
    console.log(error);
  }
  if (cacaoFermentationData && typeof cacaoFermentationData.toJSON === 'function') {
    cacaoFermentationData = await cacaoFermentationData.toJSON();
  }
  const purchaseOrderData = cacaoFermentationData[0]?.cacaoPurchaseOrder;
  const plantationData = purchaseOrderData?.map(data => data.cacaoPlantations)?.filter(cacaoPlantations => cacaoPlantations !== null);
  let farmData = purchaseOrderData?.map(data => {
    if(data.userFarms) {
      return  data.userFarms
    } else if(data.segments) {
      let tmpObj = {}
      tmpObj = JSON.parse(JSON.stringify(data.segments.farm));
      tmpObj.coordinates = data.segments.geofence_coordinates;
      return  tmpObj
    }
  })?.filter(userFarms => userFarms !== null) || null;
  // if (farmData && farmData.length < 1){
  //   farmData = plantationData?.map(data => data.userFarms)?.filter(userFarms => userFarms !== null);
  // }
  delete cacaoFermentationData[0]?.cacaoPurchaseOrder;
  if (purchaseOrderData && purchaseOrderData.length > 0) {
      for (item of purchaseOrderData) {
        delete item.plantations;
      }
    }

  return {
    cacaoFermentationData,
    purchaseOrderData,
    plantationData,
    farmData,
  };
};

exports.purchaseOrder = async (external_traceability_id) => {
  let purchaseOrderData = {};
  try {
    purchaseOrderData = await db.CacaoPurchaseOrder.findAll({
      where: { external_traceability_id },
      include: [
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
          attributes: [
            "address",
            "firstName",
            "middleName",
            "lastName",
            "fullName",
            "profilePicUrl",
          ],
          as: "farmer",
        },
        {
          model: db.CacaoPlantations,
          as: "cacaoPlantations",
          attributes: ["id", "plantation_name", "no_of_cacao_trees", "expected_yield"],
          required: false,
          include: [
            {
              model: db.CacaoSpecies,
              as: "cacaoSpecies",
            },
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
              attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
              include: [
                {
                  model: db.FarmTraceability,
                  attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                  as: "farmTraceability"
                },
                {
                  model: db.user,
                  as: "user",
                  attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                }
              ]
            },
            {
              model: db.Geofence,
              as: "segments",
              through: "CacaoPlantationsGeofenceMap",
              include: [{
                attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                as: 'farm',
                model: db.user_farm,
                include: [
                  {
                    model: db.FarmTraceability,
                    attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                    as: "farmTraceability"
                  },
                  {
                    model: db.user,
                    as: "user",
                    attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
                  }
                ]
              }]
            },
            {
              model: db.CacaoLandImages,
              as: "cacaoLandImages",
            },
            {
              model: db.user,
              as: "user",
              attributes: [
                "address",
                "firstName",
                "middleName",
                "lastName",
                "fullName",
                "profilePicUrl",
              ],
            },
          ],
        },
        {
          model: db.Geofence,
          as: "segments",
          include: [{
            as: 'farm',
            model: db.user_farm,
            attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
            include: [
              {
                model: db.FarmTraceability,
                attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                as: "farmTraceability"
              },
              {
                model: db.user,
                as: "user",
                attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
              }
            ]
          }]
        },
        {
          model: db.user_farm,
          as: "userFarms",
          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
          include: [
            {
              model: db.FarmTraceability,
              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
              as: "farmTraceability"
            },
            {
              model: db.user,
              as: "user",
              attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
            }
          ]
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
    });
  } catch (error) {
    console.log(error);
  }
  if (purchaseOrderData && typeof purchaseOrderData.toJSON === 'function') {
    purchaseOrderData = await purchaseOrderData.toJSON();
  }
  const plantationData = purchaseOrderData[0]?.cacaoPlantations;
  let farmData = null
  if(purchaseOrderData[0]?.userFarms)  {
    farmData = purchaseOrderData[0]?.userFarms;
  } else if (purchaseOrderData[0]?.segments) {
    farmData = purchaseOrderData[0]?.segments?.farm;
  } else if(plantationData?.userFarms && plantationData?.userFarms?.length) {
    farmData = plantationData?.userFarms;
  } else if(plantationData?.segments && plantationData?.segments?.length) {
    const uniqueFarmsMap = new Map();
    plantationData?.segments?.forEach(data => {
      const farm = data.farm;
      if (farm !== null) {
        uniqueFarmsMap.set(farm.id, farm);
      }
    });
    farmData = Array.from(uniqueFarmsMap.values());
    if (farmData.length === 0) {
      farmData = null;
    }
  }
  delete purchaseOrderData[0]?.plantations;
  delete purchaseOrderData[0]?.userFarms;
  return {
    purchaseOrderData,
    plantationData,
    farmData,
  };
};

exports.plantation = async (external_traceability_id) => {
  let plantationData = {};
  try {
    plantationData = await db.CacaoPlantations.findOne({
      where: { external_traceability_id },
      include: [
        {
          model: db.CacaoSpecies,
          as: "cacaoSpecies",
        },
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
          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
          include: [
            {
              model: db.FarmTraceability,
              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
              as: "farmTraceability"
            },
            {
              model: db.user,
              as: "user",
              attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
            }
          ]
        },
        {
          model: db.Geofence,
          as: "segments",
          through: "CacaoPlantationsGeofenceMap",
          attributes: ['id', 'geofenceName'],
          include: [{
            as: 'farm',
            model: db.user_farm,
            attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
            include: [
              {
                model: db.FarmTraceability,
                attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                as: "farmTraceability"
              },
              {
                model: db.user,
                as: "user",
                attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
              }
            ]
          }]
        },
        {
          model: db.user,
          as: "user",
          attributes: [
            "address",
            "firstName",
            "middleName",
            "lastName",
            "fullName",
            "profilePicUrl",
          ],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
  if (plantationData && typeof plantationData.toJSON === 'function') {
    plantationData = await plantationData.toJSON();
  }
  let farmData = null
  if(plantationData?.userFarms && plantationData?.userFarms?.length) {
    farmData = plantationData?.userFarms;
  } else if(plantationData?.segments && plantationData?.segments?.length) {
    const uniqueFarmsMap = new Map();
    plantationData?.segments?.forEach(data => {
      const farm = data.farm;
      if (farm !== null) {
        uniqueFarmsMap.set(farm.id, farm);
      }
    });
    farmData = Array.from(uniqueFarmsMap.values());
    if (farmData.length === 0) {
      farmData = null;
    }
  }
  return {
    plantationData,
    farmData
  };
};

exports.parchmentCoffee = async (external_id) => {
  let parchmentCoffeeData = await db.ParchmentCoffee.findOne({
    where: { external_id },
    attributes: ["id", "dryMillingUserId", "purchaseDate"],
    include: [
      {
        model: db.Cupping,
        as: "cuppingData",
      },
      {
        model: db.ParchmentCoffeeProcessingBatch,
        as: "parchmentBatchMap",
        attributes: ["id", "parchmentCoffeeId", "buyingStationParchmentId"],
        include: [
          {
            model: db.BuyingStationProcessingBatch,
            as: "buyingStationProcessingBatch",
            attributes: ["id", "startDate", "endDate", "parchmentReady"],
            required: false,
            include: [
              {
                model: db.BuyingStationOrder,
                as: "buyingStationOrder",
                through: {
                  model: db.BuyingStationProcessingBatchAndOrder,
                  attributes: [],
                },
                attributes: ["id", "purchasedAt", "dateOfEntry", "coffeeCherryQty", "coffeeCherryQlty"],
                include: [
                  {
                    model: db.BuyingStationProcessingBatch,
                    through: {
                      model: db.BuyingStationProcessingBatchAndOrder,
                      attributes: [],
                    },
                    attributes: ["batchRating"],
                    as: "processingBatch",
                  },
                  {
                    model: db.user,
                    as: "buyingStation",
                    attributes: [
                      "address",
                      "firstName",
                      "middleName",
                      "lastName",
                      "fullName",
                      "profilePicUrl"
                    ],
                  },
                  {
                    model: db.user,
                    as: "farmer",
                    attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],               },
                  {
                    model: db.Plantations,
                    as: "plantations",
                    attributes: ["id", "plantation_name", "expected_yield", "no_of_coffee_trees"],
                    include: [
                      {
                        model: db.CoffeeVariety,
                        as: "coffeeVariety",
                      },
                      {
                        model: db.CoffeeSpecies,
                        as: "coffeeSpecies",
                      },
                      {
                        model: db.HorticultureInformation,
                        as: "horticultureInformation",
                        through: {
                          model: db.HorticultureInformationMapData,
                          attributes: ["number_of_trees"],
                        },
                      },
                      {
                        model: db.WindBreaker,
                        as: "windBreakerTree",
                        through: {
                          model: db.WindBreakerTreeMapData,
                          attributes: ["number_of_trees"],
                        },
                      },
                      {
                        model: db.ShadeTree,
                        as: "shadeTree",
                        through: {
                          model: db.ShadeTreeMapData,
                          attributes: ["number_of_trees"],
                        },
                      },
                      {
                        model: db.user_farm,
                        as: "userFarms",
                        through: "PlantationsUserFarmsMap",
                        attributes: ["id", "address", "farmName", "farmOwner", "ownerName","area", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                        include: [
                          {
                            model: db.FarmTraceability,
                            attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                            as: "farmTraceability"
                          },
                          {
                            model: db.user,
                            as: "user",
                            attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                          }
                        ]
                      },
                      {
                        model: db.Geofence,
                        as: "segments",
                        through: "PlantationsGeofenceMap",
                        attributes: ['id', 'geofenceName'],
                        include: [{
                          as: 'farm',
                          model: db.user_farm,
                          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                          include: [
                            {
                              model: db.FarmTraceability,
                              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                              as: "farmTraceability"
                            },
                            {
                              model: db.user,
                              as: "user",
                              attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                            }
                          ]
                        }]
                      },
                      {
                        model: db.CoffeeLandImages,
                        as: "coffeeLandImages",
                      },
                    ],
                  },
                  {
                    model: db.user_farm,
                    as: "userFarms",
                    attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                    include: [
                      {
                        model: db.FarmTraceability,
                        attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                        as: "farmTraceability"
                      },
                      {
                        model: db.user,
                        as: "user",
                        attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                      }
                    ]
                  },
                  {
                    model: db.Geofence,
                    as: "segments",
                    attributes: ['id', 'geofenceName'],
                    include: [{
                      as: 'farm',
                      model: db.user_farm,
                      attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                      include: [
                        {
                          model: db.FarmTraceability,
                          attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                          as: "farmTraceability"
                        },
                        {
                          model: db.user,
                          as: "user",
                          attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                        }
                      ]
                    }]
                  },
                  {
                    model: db.CoffeeSpecies,
                    as: "coffeeSpecies",
                    attributes: ["id", "name", "status"]
                  },
                  {
                    model: db.CoffeeVariety,
                    as: "coffeeVariety",
                  },
                  {
                    model: db.CoffeeType,
                    as: "coffeeType",
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
        required: false,
      },
      {
        model: db.user,
        as: "dryMilling",
        attributes: ["id", "address", "firstName","middleName", "lastName", "fullName", "profilePicUrl"],
      },
    ],
  });


  if (parchmentCoffeeData && typeof parchmentCoffeeData.toJSON === 'function') {
    parchmentCoffeeData = await parchmentCoffeeData.toJSON();
  }
  let processingBatchData = parchmentCoffeeData?.parchmentBatchMap?.map(batch => batch.buyingStationProcessingBatch);

  let purchaseOrderData = processingBatchData?.flatMap(data => data.buyingStationOrder)?.filter(buyingStationOrder => buyingStationOrder !== null)?.flat();
  let plantationData = purchaseOrderData?.map(data => data.plantations)?.filter(plantations => plantations !== null);
  let farmData = purchaseOrderData?.map(data => {
    if(data.userFarms) {
      return userFarms = data.userFarms
    } else if(data.segments) {
      return userFarms = data.segments.farm
    }
  })?.filter(userFarms => userFarms !== null) || null;
  delete parchmentCoffeeData?.parchmentBatchMap;
  if (processingBatchData && processingBatchData.length > 0) {
    for (item of processingBatchData) {
      delete item.buyingStationOrder;
    }

    if (purchaseOrderData && purchaseOrderData.length > 0) {
      for (item of purchaseOrderData) {
        delete item.plantations;
      }
    }
  }

  return {  
    parchmentCoffeeData,
    processingBatchData,
    purchaseOrderData,
    plantationData,
    farmData
  };
};

exports.coffeeProcessingBatch = async (external_id) => {
  let processingBatchData = await db.BuyingStationProcessingBatch.findOne({
    where: { external_id },
    attributes: ["id", "buyingStationId", "startDate", "endDate", "parchmentReady"],
    include: [
      {
        model: db.BuyingStationOrder,
        as: "buyingStationOrder",
        through: "BuyingStationProcessingBatchAndOrder",
        include: [
          {
            model: db.BuyingStationProcessingBatch,
            through: {
              model: db.BuyingStationProcessingBatchAndOrder,
              attributes: [],
            },
            attributes: ["batchRating"],
            as: "processingBatch",
          },
          {
            model: db.user,
            as: "buyingStation",
            attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
          },
          {
            model: db.user,
            attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
            as: "farmer",
          },
          {
            model: db.Plantations,
            as: "plantations",
            attributes: ["id", "plantation_name", "no_of_coffee_trees", "expected_yield"],
            include: [
              {
                model: db.CoffeeVariety,
                as: "coffeeVariety",
              },
              {
                model: db.CoffeeSpecies,
                as: "coffeeSpecies",
              },
              {
                model: db.HorticultureInformation,
                as: "horticultureInformation",
                through: {
                  model: db.HorticultureInformationMapData,
                  attributes: ["number_of_trees"],
                },
              },
              {
                model: db.WindBreaker,
                as: "windBreakerTree",
                through: {
                  model: db.WindBreakerTreeMapData,
                  attributes: ["number_of_trees"],
                },
              },
              {
                model: db.ShadeTree,
                as: "shadeTree",
                through: {
                  model: db.ShadeTreeMapData,
                  attributes: ["number_of_trees"],
                },
              },
              {
                model: db.user_farm,
                as: "userFarms",
                through: "PlantationsUserFarmsMap",
                attributes: ["id", "address", "farmName", "farmOwner", "ownerName",  "area", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                include: [
                  {
                    model: db.FarmTraceability,
                    attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                    as: "farmTraceability"
                  },
                  {
                    model: db.user,
                    as: "user",
                    attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                  }
                ]
              },
              {
                model: db.Geofence,
                as: "segments",
                through: "PlantationsGeofenceMap",
                attributes: ['id', 'geofenceName'],
                include: [{
                  as: 'farm',
                  model: db.user_farm,
                  attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
                  include: [
                    {
                      model: db.FarmTraceability,
                      attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                      as: "farmTraceability"
                    },
                    {
                      model: db.user,
                      as: "user",
                      attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                    }
                  ]
                }]
              },
              {
                model: db.CoffeeLandImages,
                as: "coffeeLandImages",
              },
            ],
          },
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
            include: [
              {
                model: db.FarmTraceability,
                attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                as: "farmTraceability"
              },
              {
                model: db.user,
                as: "user",
                attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
              }
            ]
          },
          {
            model: db.Geofence,
            as: "segments",
            attributes: ['id', 'geofenceName'],
            include: [{
              as: 'farm',
              model: db.user_farm,
              attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
              include: [
                {
                  model: db.FarmTraceability,
                  attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                  as: "farmTraceability"
                },
                {
                  model: db.user,
                  as: "user",
                  attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                }
              ]
            }]
          },
          {
            model: db.CoffeeSpecies,
            as: "coffeeSpecies",
          },
          {
            model: db.CoffeeVariety,
            as: "coffeeVariety",
          },
          {
            model: db.CoffeeType,
            as: "coffeeType",
            required: false,
          },
        ],
      },
    ],
  });

  if (typeof processingBatchData?.toJSON === 'function') {
    processingBatchData = await processingBatchData.toJSON();
  }
  const purchaseOrderData = processingBatchData?.buyingStationOrder;
  const plantationData = purchaseOrderData?.map(data => data.plantations)?.filter(plantations => plantations !== null) || null;
  const farmData = purchaseOrderData?.map(data => {
    if(data.userFarms) {
      return userFarms = data.userFarms
    } else if(data.segments) {
      return userFarms = data.segments.farm
    }
  })?.filter(userFarms => userFarms !== null) || null;
  delete processingBatchData?.BuyingStationOrder;
  if (purchaseOrderData && purchaseOrderData.length > 0) {
      for (item of purchaseOrderData) {
        delete item.plantations;
      }
    }

  return {
    processingBatchData,
    purchaseOrderData,
    plantationData,
    farmData,
  };
};

exports.coffeePurchaseOrder = async (external_id) => {
  let purchaseOrderData = await db.BuyingStationOrder.findOne({
    where: { external_id },
    include: [
      {
        model: db.BuyingStationProcessingBatch,
        through: {
          model: db.BuyingStationProcessingBatchAndOrder,
          attributes: [],
        },
        attributes: ["batchRating"],
        as: "processingBatch",
      },
      {
        model: db.user,
        as: "buyingStation",
        attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
      },
      {
        model: db.user,
        as: "farmer",
        attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
      },
      {
        model: db.Plantations,
        as: "plantations",
        attributes: ["id", "plantation_name", "no_of_coffee_trees", "expected_yield"],
        include: [
          {
            model: db.CoffeeVariety,
            as: "coffeeVariety",
          },
          {
            model: db.CoffeeSpecies,
            as: "coffeeSpecies",
          },
          {
            model: db.HorticultureInformation,
            as: "horticultureInformation",
            through: {
              model: db.HorticultureInformationMapData,
              attributes: ["number_of_trees"],
            },
          },
          {
            model: db.WindBreaker,
            as: "windBreakerTree",
            through: {
              model: db.WindBreakerTreeMapData,
              attributes: ["number_of_trees"],
            },
          },
          {
            model: db.ShadeTree,
            as: "shadeTree",
            through: {
              model: db.ShadeTreeMapData,
              attributes: ["number_of_trees"],
            },
          },
          {
            model: db.user_farm,
            as: "userFarms",
            through: "PlantationsUserFarmsMap",
            attributes: ["id", "address", "farmName", "farmOwner", "ownerName","area", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
            include: [
              {
                model: db.FarmTraceability,
                attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                as: "farmTraceability"
              },
              {
                model: db.user,
                as: "user",
                attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
              }
            ]
          },
          {
            model: db.Geofence,
            as: "segments",
            through: "PlantationsGeofenceMap",
            attributes: ['id', 'geofenceName'],
            include: [{
              as: 'farm',
              model: db.user_farm,
              attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
              include: [
                {
                  model: db.FarmTraceability,
                  attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
                  as: "farmTraceability"
                },
                {
                  model: db.user,
                  as: "user",
                  attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
                }
              ]
            }]
          },
          {
            model: db.CoffeeLandImages,
            as: "coffeeLandImages",
          },
        ],
      },
      {
        model: db.user_farm,
        as: "userFarms",
        attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
        include: [
          {
            model: db.FarmTraceability,
            attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
            as: "farmTraceability"
          },
          {
            model: db.user,
            as: "user",
            attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
          }
        ]
      },
      {
        model: db.Geofence,
        as: "segments",
        attributes: ['id', 'geofenceName'],
        include: [{
          as: 'farm',
          model: db.user_farm,
          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
          include: [
            {
              model: db.FarmTraceability,
              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
              as: "farmTraceability"
            },
            {
              model: db.user,
              as: "user",
              attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
            }
          ]
        }]
      },
      {
        model: db.CoffeeSpecies,
        as: "coffeeSpecies",
      },
      {
        model: db.CoffeeVariety,
        as: "coffeeVariety",
      },
      {
        model: db.CoffeeType,
        as: "coffeeType",
        required: false,
      },
    ],
  });
  if (typeof purchaseOrderData.toJSON === 'function') {
    purchaseOrderData = await purchaseOrderData.toJSON();
  }
  const plantationData = purchaseOrderData?.plantations;
  let farmData = null 
  if(purchaseOrderData?.userFarms)  {
    farmData = purchaseOrderData?.userFarms;
  } else if (purchaseOrderData?.segments) {
    farmData = purchaseOrderData?.segments?.farm;
  } else if(plantationData?.userFarms && plantationData?.userFarms?.length) {
    farmData = plantationData?.userFarms;
  } else if(plantationData?.segments && plantationData?.segments?.length) {
    const uniqueFarmsMap = new Map();
    plantationData?.segments?.forEach(data => {
      const farm = data.farm;
      if (farm !== null) {
        uniqueFarmsMap.set(farm.id, farm);
      }
    });
    farmData = Array.from(uniqueFarmsMap.values());
    if (farmData.length === 0) {
      farmData = null;
    }
  }
  delete purchaseOrderData?.plantations;
  delete purchaseOrderData?.userFarms;
  return {
    purchaseOrderData,
    plantationData,
    farmData,
  };
};

exports.coffeePlantation = async (external_traceability_id) => {
  let plantationData = await db.Plantations.findOne({
    where: { external_traceability_id },
    attributes: ["id", "plantation_name", "user_id","expected_yield", "no_of_coffee_trees"],
    include: [
      {
        model: db.CoffeeVariety,
        as: "coffeeVariety",
      },
      {
        model: db.CoffeeSpecies,
        as: "coffeeSpecies",
      },
      {
        model: db.HorticultureInformation,
        as: "horticultureInformation",
        through: {
          model: db.HorticultureInformationMapData,
          attributes: ["number_of_trees"],
        },
      },
      {
        model: db.WindBreaker,
        as: "windBreakerTree",
        through: {
          model: db.WindBreakerTreeMapData,
          attributes: ["number_of_trees"],
        },
      },
      {
        model: db.ShadeTree,
        as: "shadeTree",
        through: {
          model: db.ShadeTreeMapData,
          attributes: ["number_of_trees"],
        },
      },
      {
        model: db.user_farm,
        as: "userFarms",
        through: "PlantationsUserFarmsMap",
        attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "area", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street",'lat','log'],
        include: [
          {
            model: db.FarmTraceability,
            attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
            as: "farmTraceability"
          },
          {
            model: db.user,
            as: "user",
            attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
          }
        ]
      },
      {
        model: db.Geofence,
        as: "segments",
        through: "PlantationsGeofenceMap",
        attributes: ['id', 'geofenceName'],
        include: [{
          as: 'farm',
          model: db.user_farm,
          attributes: ["id", "address", "farmName", "farmOwner", "ownerName", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log'],
          include: [
            {
              model: db.FarmTraceability,
              attributes: { exclude: ["userId", "farmId", "createdAt", "updatedAt"] },
              as: "farmTraceability"
            },
            {
              model: db.user,
              as: "user",
              attributes: ["id", "address", "firstName", "middleName","lastName", "fullName", "profilePicUrl"],
            }
          ]
        }]
      },
      {
        model: db.CoffeeLandImages,
        as: "coffeeLandImages",
      },
    ],
  });
  if (typeof plantationData.toJSON === 'function') {
    plantationData = await plantationData.toJSON();
  }
  let farmData = null
  if(plantationData?.userFarms && plantationData?.userFarms?.length) {
    farmData = plantationData?.userFarms;
  } else if(plantationData?.segments && plantationData?.segments?.length) {
    const uniqueFarmsMap = new Map();
    plantationData?.segments?.forEach(data => {
      const farm = data.farm;
      if (farm !== null) {
        uniqueFarmsMap.set(farm.id, farm);
      }
    });
    farmData = Array.from(uniqueFarmsMap.values());
    if (farmData.length === 0) {
      farmData = null;
    }
  }
   
  return {
    plantationData,
    farmData,
  };
};

exports.getFinalProductData = async (external_id) => {
  let finalProductData = await db.FinalProductManagement.findOne({
    where: { external_id },
    include: [
      {
        model: db.BatchProcessingManagement,
        as: "batchProcessing",
        include: [
          {
            model: db.Option,
            as: "cropType",
          },
          {
            model: db.PurchaseOrderManagement,
            as: "purchaseOrders",
            through: {
              model: db.MapPurchaseOrderAndProcessingBatches,
              attributes: ["totalPrice", "purchase_quantity"],
              as: "purchase_batch_mapping",
            },
            include: [
              {
                model: db.user_farm,
                attributes: [
                  "id",
                  "address",
                  "farmName",
                  "farmOwner",
                  "ownerName",
                  "district",
                  "region",
                  "registrationNo",
                  "farmerFirstName",
                  "farmerLastName",
                  "farmerMiddleName",
                  "country",
                  "state",
                  "city",
                  "street",
                  "area",
                  "lat",
                  "log",
                ],
                as: "userFarms",
                include: [
                  {
                    model: db.FarmTraceability,
                    attributes: {
                      exclude: ["userId", "farmId", "createdAt", "updatedAt"],
                    },
                    as: "farmTraceability",
                  },
                  {
                    model: db.user,
                    attributes: [
                      "address",
                      "firstName",
                      "lastName",
                      "middleName",
                      "fullName",
                      "profilePicUrl",
                    ],
                    as: "user",
                  },
                  {
                    attributes: ["id", "lat", "log"],
                    model: db.UserFarmCoordinate,
                    as: "coordinates",
                  },
                  {
                    model: db.Geofence,
                    attributes: ["id", "geofenceName", "geofenceRadius"],
                    as: "circularGeofence",
                  },
                ],
              },
              {
                model: db.Option,
                attributes: ["id", "name"],
                as: "cropType",
              },
              {
                model: db.Crop,
                through: "PurchaseTraceabilityCropVarProduct",
                as: "cropVarieties",
                include: [
                  {
                    model: db.Option,
                    as: "crop_variety_type",
                  },
                ],
              },
              {
                model: db.user,
                attributes: [
                  "address",
                  "firstName",
                  "lastName",
                  "middleName",
                  "fullName",
                  "profilePicUrl",
                ],
                as: "farmer",
              },
              {
                model: db.AllPurchaseTraceabilityImages,
                as: "images",   
                attributes: ["file_url"],           
              }
            ],
          },
          {
            model: db.user,
            attributes: [
              "address",
              "firstName",
              "lastName",
              "middleName",
              "fullName",
              "profilePicUrl",
            ],
            as: "user",
          },
          {
            model: db.AllPurchaseTraceabilityImages,
            as: "batch_images",
            attributes: ["file_url"],
          },
        ],
        through: {
          model: db.FinalReportBatchProcessing,
          attributes: [],
        },
      },
      {
        model:db.AllPurchaseTraceabilityImages,
        as: "final_product_images",
        attributes: ["file_url"],
      }
    ],
  });
  if (typeof finalProductData.toJSON === "function") {
    finalProductData = await finalProductData.toJSON();
  }
  let processingBatch = finalProductData.batchProcessing.map((el) => el);
  let purchaseOrder = finalProductData.batchProcessing
    .map((pb) => {
      return pb.purchaseOrders.map((pbEl) => {
        return pbEl;
      });
    })
    .flat();

  let farmData = [];
  finalProductData.batchProcessing.forEach((fp) => {
    fp.purchaseOrders.forEach((po) => {
      farmData.push(po.userFarms);
    });
  });

  farmData = _.uniqBy(farmData, "id");
  return { finalProductData, farmData, processingBatch, purchaseOrder };
};

exports.getBatchData = async (external_id) => {
  let batchData = await db.BatchProcessingManagement.findOne({
    where: { external_id },
    include: [
      {
        model: db.user,
        attributes: [
          "address",
          "firstName",
          "lastName",
          "middleName",
          "fullName",
          "profilePicUrl",
        ],
        as: "user",
      },
      {
        model: db.Option,
        as: "cropType",
      },
      {
        model: db.PurchaseOrderManagement,
        as: "purchaseOrders",
        through: {
          model: db.MapPurchaseOrderAndProcessingBatches,
          attributes: ["totalPrice", "purchase_quantity"],
          as: "purchase_batch_mapping",
        },
        include: [
          {
            model: db.user,
            attributes: [
              "address",
              "firstName",
              "lastName",
              "middleName",
              "fullName",
              "profilePicUrl",
            ],
            as: "farmer",
          },
          {
            model: db.Option,
            attributes: ["id", "name"],
            as: "cropType",
          },
          {
            model: db.Crop,
            through: "PurchaseTraceabilityCropVarProduct",
            as: "cropVarieties",
            include: [
              {
                model: db.Option,
                as: "crop_variety_type",
              },
            ],
          },
          {
            model: db.user_farm,
            attributes: [
              "id",
              "address",
              "farmName",
              "farmOwner",
              "ownerName",
              "district",
              "region",
              "registrationNo",
              "farmerFirstName",
              "farmerLastName",
              "farmerMiddleName",
              "country",
              "state",
              "city",
              "street",
              "area",
              "lat",
              "log",
            ],
            as: "userFarms",
            include: [
              {
                model: db.FarmTraceability,
                attributes: {
                  exclude: ["userId", "farmId", "createdAt", "updatedAt"],
                },
                as: "farmTraceability",
              },
              {
                model: db.user,
                attributes: [
                  "address",
                  "firstName",
                  "lastName",
                  "middleName",
                  "fullName",
                  "profilePicUrl",
                ],
                as: "user",
              },
              {
                attributes: ["id", "lat", "log"],
                model: db.UserFarmCoordinate,
                as: "coordinates",
              },
              {
                model: db.Geofence,
                attributes: ["id", "geofenceName", "geofenceRadius"],
                as: "circularGeofence",
              },
            ],
          },
          {
            model: db.AllPurchaseTraceabilityImages,
            as: "images",
            attributes: ["file_url"],
          }
        ],
      },
      {
        model: db.AllPurchaseTraceabilityImages,
        as: "batch_images",
        attributes: ["file_url"],
      },
    ],
  });
  if (typeof batchData.toJSON === "function") {
    batchData = await batchData.toJSON();
  }

  let farmData = [];

  batchData.purchaseOrders.forEach((po) => {
    farmData.push(po.userFarms);
  });

  let purchaseOrder = batchData.purchaseOrders.map((pbEl) => {
    return pbEl;
  });

  farmData = _.uniqBy(farmData, "id");
  return { processingBatch: [batchData], purchaseOrder, farmData };
};
exports.getPurchaseData = async (external_id) => {
  let purchaseData = await db.PurchaseOrderManagement.findOne({
    where: { external_id },
    include: [
      {
        model: db.user,
        attributes: [
          "address",
          "firstName",
          "lastName",
          "middleName",
          "fullName",
          "profilePicUrl",
        ],
        as: "farmer",
      },
      {
        model: db.BatchProcessingManagement,
        through: "MapPurchaseOrderAndProcessingBatches",
        as: "processingBatches",
      },
      {
        model: db.Option,
        attributes: ["id", "name"],
        as: "cropType",
      },
      {
        model: db.Crop,
        through: "PurchaseTraceabilityCropVarProduct",
        as: "cropVarieties",
        include: [
          {
            model: db.Option,
            as: "crop_variety_type",
          },
        ],
      },
      {
        model: db.user_farm,
        attributes: [
          "id",
          "address",
          "farmName",
          "farmOwner",
          "ownerName",
          "district",
          "region",
          "registrationNo",
          "farmerFirstName",
          "farmerLastName",
          "farmerMiddleName",
          "country",
          "state",
          "city",
          "street",
          "area",
          "lat",
          "log",
        ],
        as: "userFarms",
        include: [
          {
            model: db.FarmTraceability,
            attributes: {
              exclude: ["userId", "farmId", "createdAt", "updatedAt"],
            },
            as: "farmTraceability",
          },
          {
            model: db.user,
            attributes: [
              "address",
              "firstName",
              "lastName",
              "middleName",
              "fullName",
              "profilePicUrl",
            ],
            as: "user",
          },
          {
            attributes: ["id", "lat", "log"],
            model: db.UserFarmCoordinate,
            as: "coordinates",
          },
          {
            model: db.Geofence,
            attributes: ["id", "geofenceName", "geofenceRadius"],
            as: "circularGeofence",
          },
        ],
      },
      {
        model: db.AllPurchaseTraceabilityImages,
        as: "images",
        attributes: ["file_url"],
      },
    ],
  });

  let processingBatchRes = await db.BatchProcessingManagement.findAll({
    include: [
      {
        model: db.user,
        attributes: [
          "address",
          "firstName",
          "lastName",
          "middleName",
          "fullName",
          "profilePicUrl",
        ],
        as: "user",
      },
      {
        model: db.Option,
        as: "cropType",
      },
      {
        model: db.PurchaseOrderManagement,
        as: "purchaseOrders",
        where: {
          id: purchaseData.id,
        },
        through: {
          model: db.MapPurchaseOrderAndProcessingBatches,
          as: "purchase_batch_mapping",
        },
        include: [
          {
            model: db.Option,
            attributes: ["id", "name"],
            as: "cropType",
          },
          {
            model: db.Crop,
            through: "PurchaseTraceabilityCropVarProduct",
            as: "cropVarieties",
            include: [
              {
                model: db.Option,
                as: "crop_variety_type",
              },
            ],
          },
          {
            model: db.user_farm,
            attributes: [
              "id",
              "address",
              "farmName",
              "farmOwner",
              "ownerName",
              "district",
              "region",
              "registrationNo",
              "farmerFirstName",
              "farmerLastName",
              "farmerMiddleName",
              "country",
              "state",
              "city",
              "street",
              "area",
              "lat",
              "log",
            ],
            as: "userFarms",
            include: [
              {
                model: db.FarmTraceability,
                attributes: {
                  exclude: ["userId", "farmId", "createdAt", "updatedAt"],
                },
                as: "farmTraceability",
              },
              {
                model: db.user,
                attributes: [
                  "address",
                  "firstName",
                  "lastName",
                  "middleName",
                  "fullName",
                  "profilePicUrl",
                ],
                as: "user",
              },
              {
                attributes: ["id", "lat", "log"],
                model: db.UserFarmCoordinate,
                as: "coordinates",
              },
              {
                model: db.Geofence,
                attributes: ["id", "geofenceName", "geofenceRadius"],
                as: "circularGeofence",
              },
            ],
          },
        ],
      },

      {
        model: db.AllPurchaseTraceabilityImages,
        as: "batch_images",
        attributes: ["file_url"],
      },
    ],
  });
  if (typeof purchaseData.toJSON === "function") {
    purchaseData = await purchaseData.toJSON();
  }

  let farmData = [];

  farmData.push(purchaseData.userFarms);
  farmData = _.uniqBy(farmData, "id");

  return {
    purchaseOrder: [purchaseData],
    processingBatch: processingBatchRes,
    farmData,
  };
};

