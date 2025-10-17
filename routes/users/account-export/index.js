const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const translation = require(rootPath + "/middleware/translation");
const auth = require(rootPath + "/middleware/auth");
const _ = require("lodash");
const { Op } = require("sequelize");
const {
  serverError,
  errorResp,
  successRespSync,
  errorRespSync,
} = require(rootPath + "/helpers/api");

const { logErrorOccurred } = require(rootPath + "/helpers/general");
const mailer = require(rootPath + "/components/mailer");

const exportCacaoData = async (req) => {
  const { farmId } = req.body;
  const userId = req.user.id;
  let farmFinalData = []
  const cacaoInfo = await db.user.findOne(
    {
      attributes: [
        "id",
        "firstName",
        "middleName",
        "lastName",
        "gender",
        "countryCode",
        "mobile",
        "email",
        "language",
        "countryId",
        "countryIsoCode",
        "country",
        "stateId",
        "city",
        "district",
        "village",
        "buisnessName",
        "address",
        "fax",
        "website",
        "verified",
        "profilePicUrl",
        "registration_type",
        "organization",
        "createdAt",
      ],
      where: {
        id: userId,
      },

      raw:true
    },

  );
  

  let farmDataRes = await db.user_farm.findAll({
    where: {
      id: farmId
    },
    includes: [
      {
        model: db.CacaoPlantations,
        as: "cacaoPlantations",
        attributes: [
          "id",
          "plantation_name",
          "cacao_species",
          "no_of_cacao_trees",
          "expected_yield",
          "expected_yield_unit_id",
          "bearing_fruit_status",
          "time_to_bear_fruit",
          "no_of_trees_bearing_fruit",
          "isExistingPlantation",
          "plantationStatus",
          "status",
          "rejection_reason",
          "createdAt",
        ],
        through: {
          attributes: [],
        },
        include: [
          {
            model: db.CacaoSpecies,
            as: "cacaoSpecies",
            attributes: ["id", "name", "createdAt"],
          },
          {
            model: db.CacaoVariety,
            as: "cacaoVariety",
            attributes: ["id", "name", "createdAt"],
          },
          {
            model: db.CacaoLandImages,
            as: "cacaoLandImages",
            attributes: ["id", "file_name", "createdAt"],
          },
          {
            model: db.CacaoManageTrees,
            as: "manageCacaoTreesData",
            attributes: ["id", "no_of_cacao_trees", "createdAt"],
          },
          {
            model: db.ShadeTree,
            as: "shadeTree",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
          {
            model: db.WindBreaker,
            as: "windBreakerTree",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
          {
            model: db.HorticultureInformation,
            as: "horticultureInformation",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
        ],
      },
      {
        model: db.BuyingStationOrder,
        as: "buyingStationOders",
      },
    ],
    raw: true
  })


   // fetch farm locations key is "locations"
   let farmLocations,
   farmSegments,
   circularGeofence,
   farmLocationsHash = {},
   farmSegmentsHash = {},
   circularGeofenceHash = {};
 farmLocations = await db.FarmLocation.findAll({
   where: {
     farmId: farmId,
   },
   include: [
     {
       model: db.Geofence,
       where: { deletedAt: null },
       required: false,
       as: "zones",
       include: [
         {
           model: db.GeofenceCoordinate,
           as: "geofence_coordinates",
         },
       ],
     },
   ],

 });
 farmSegments = await db.Geofence.findAll({
   include: [
     {
       attributes: ["unit_subCategory_id"],
       model: db.UnitConfiguration,
       as: "configuration",
       required: false,
       where: {
         unit_subCategory_id: [3, 14],
       },
       include: [
         {
           model: db.Unit,
           attributes: [["field", "name"]],
           as: "subCategory",
         },
         {
           model: db.Unit,
           attributes: ["id", ["field", "name"], "abbreviation"],
           as: "unit",
         },
       ],
     },
     {
       model: db.GeofenceCoordinate,
       attributes: ["id", "lat", "log"],
       as: "coordinates",
       required: false,
     },
   ],
   where: {
     [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
     farmId: farmId,
   },

 });
 circularGeofence = await db.Geofence.findAll({
   where: {
     isPrimary: true,
     geofenceRadius: {
       [Op.ne]: null,
       [Op.not]: 0,
     },
     farmId: farmId,
   },
   attributes: [
     "id",
     "geofenceRadius",
     "geofenceCenterLat",
     "geofenceCenterLog",
     "farmId",
   ],

 });

 farmLocations.forEach((el) => {
   farmLocationsHash[el.farmId] = [
     ...(farmLocationsHash[el.farmId] || []),
     el,
   ];
 });
 farmSegments.forEach((el) => {
   farmSegmentsHash[el.farmId] = [
     ...(farmSegmentsHash[el.farmId] || []),
     el,
   ];
 });
 circularGeofence.forEach((el) => {
   circularGeofenceHash[el.farmId] = [
     ...(circularGeofenceHash[el.farmId] || []),
     el,
   ];
 });

 for (let el of farmDataRes) {

  el.locations = farmLocationsHash[el.id];
  el.segments = farmSegmentsHash[el.id];
  el.circularGeofence =
  Array.isArray(circularGeofenceHash[el.id]) &&
  circularGeofenceHash[el.id].length > 0
    ? circularGeofenceHash[el.id][0]
    : null;

    farmFinalData.push(el)
 }
 cacaoInfo.farms = farmFinalData

 
  return cacaoInfo;
};

const exportCoffeeDatta = async (req, ) => {
  const { farmId } = req.body;
  const userId = req.user.id;
  const coffeeInfo = await db.user.findOne(
    {
      attributes: [
        "id",
        "firstName",
        "middleName",
        "lastName",
        "gender",
        "countryCode",
        "mobile",
        "email",
        "language",
        "countryId",
        "countryIsoCode",
        "country",
        "stateId",
        "city",
        "district",
        "village",
        "buisnessName",
        "address",
        "fax",
        "website",
        "verified",
        "profilePicUrl",
        "registration_type",
        "organization",
        "createdAt",
      ],
      where: {
        id: userId,
      },
    raw: true
    },

  );

  let farmFinalData = []

  let farmDataRes = await db.user_farm.findAll({
    where: {
      id: farmId
    },
    includes: [
      {
        model: db.Plantations,
        as: "farmPlantations",
        attributes: [
          "id",
          "plantation_name",
          "no_of_coffee_trees",
          "expected_yield",
          "bearing_fruit_status",
          "time_to_bear_fruit",
          "no_of_trees_bearing_fruit",
          "status",
          "isExistingPlantation",
          "createdAt",
        ],
        through: {
          attributes: [],
        },
        include: [
          {
            model: db.CoffeeSpecies,
            as: "coffeeSpecies",
            attributes: ["id", "name", "status", "createdAt"],
          },
          {
            model: db.CoffeeVariety,
            as: "coffeeVariety",
            attributes: ["id", "name", "status", "createdAt"],
          },
          {
            model: db.CoffeeLandImages,
            as: "coffeeLandImages",
            attributes: ["id", "file_name", "createdAt"],
          },
          {
            model: db.ManageTrees,
            as: "manageTreesData",
            attributes: [
              "id",
              "no_of_coffee_trees",
              "comment",
              "createdAt",
            ],
          },
          {
            model: db.ShadeTree,
            as: "shadeTree",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
          {
            model: db.WindBreaker,
            as: "windBreakerTree",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
          {
            model: db.HorticultureInformation,
            as: "horticultureInformation",
            attributes: ["id", "name", "status", "createdAt"],
            through: {
              attributes: [],
            },
          },
          {
            model: db.Geofence,
            as: "segments",
            attributes: [
              "id",
              "geofenceName",
              "geofenceArea",
              "geofenceParameter",
              "geofenceParameterUOMId",
              "createdAt",
            ],
            through: {
              attributes: [],
            },
          },
          {
            model: db.Seedlings,
            as: "seedlings",
            attributes: [
              "id",
              "seedling_date",
              "no_of_seeds",
              "origin_of_the_seeds",
              "seed_producer",
              "no_of_coffee_trees",
              "time_to_bear_fruit",
              "bearing_fruit_status",
              "seedlingStatus",
              "createdAt",
            ],
            through: {
              attributes: [],
            },
          },
        ],
      },
      {
        model: db.BuyingStationOrder,
        as: "buyingStationOders",
      },
    ],
    raw: true
  })

     // fetch farm locations key is "locations"
     let farmLocations,
     farmSegments,
     circularGeofence,
     farmLocationsHash = {},
     farmSegmentsHash = {},
     circularGeofenceHash = {};
   farmLocations = await db.FarmLocation.findAll({
     where: {
       farmId: farmId,
     },
     include: [
       {
         model: db.Geofence,
         where: { deletedAt: null },
         required: false,
         as: "zones",
         include: [
           {
             model: db.GeofenceCoordinate,
             as: "geofence_coordinates",
           },
         ],
       },
     ],
   });
   farmSegments = await db.Geofence.findAll({
     include: [
       {
         attributes: ["unit_subCategory_id"],
         model: db.UnitConfiguration,
         as: "configuration",
         required: false,
         where: {
           unit_subCategory_id: [3, 14],
         },
         include: [
           {
             model: db.Unit,
             attributes: [["field", "name"]],
             as: "subCategory",
           },
           {
             model: db.Unit,
             attributes: ["id", ["field", "name"], "abbreviation"],
             as: "unit",
           },
         ],
       },
       {
         model: db.GeofenceCoordinate,
         attributes: ["id", "lat", "log"],
         as: "coordinates",
         required: false,
       },
     ],
     where: {
       [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
       farmId: farmId,
     },
   });
   circularGeofence = await db.Geofence.findAll({
     where: {
       isPrimary: true,
       geofenceRadius: {
         [Op.ne]: null,
         [Op.not]: 0,
       },
       farmId: farmId,
     },
     attributes: [
       "id",
       "geofenceRadius",
       "geofenceCenterLat",
       "geofenceCenterLog",
       "farmId",
     ],
   });

   farmLocations.forEach((el) => {
     farmLocationsHash[el.farmId] = [
       ...(farmLocationsHash[el.farmId] || []),
       el,
     ];
   });
   farmSegments.forEach((el) => {
     farmSegmentsHash[el.farmId] = [
       ...(farmSegmentsHash[el.farmId] || []),
       el,
     ];
   });
   circularGeofence.forEach((el) => {
     circularGeofenceHash[el.farmId] = [
       ...(circularGeofenceHash[el.farmId] || []),
       el,
     ];
   });

   for (let el of farmDataRes) {

    el.locations = farmLocationsHash[el.id];
    el.segments = farmSegmentsHash[el.id];
    el.circularGeofence =
    Array.isArray(circularGeofenceHash[el.id]) &&
    circularGeofenceHash[el.id].length > 0
      ? circularGeofenceHash[el.id][0]
      : null;

      farmFinalData.push(el)
   }
   coffeeInfo.farms = farmFinalData
  return coffeeInfo;
};

router.post("/", auth, translation, async (req, res) => {

  try {
    const { appType, exportType, email } = req.body;
    const userId = req.user.id
    let exportedData = {};


    if (appType == "cacao") {
      exportedData = await exportCacaoData(req, );
    } else if (appType == "coffee") {
      exportedData = await exportCoffeeDatta(req, );
    }

    const jsonData = JSON.stringify(exportedData, null, 2);
    const title = "Account Details";
    const template = `
              <p>Dear ${exportedData?.firstName || "User"},</p>
              <p>We are pleased to provide you with the requested account details. You will find the information you requested attached as a Text file named <strong>data.txt</strong>.</p>
              <p>Please download and open the attachment to access your account details.</p>
              <p>If you have any questions or require further assistance, feel free to reach out to our support team.</p>
              <br>
              <p>Best regards,<br> Team Dimitra</p>
                      `;

    const base64Data = Buffer.from(jsonData).toString("base64");

    const attachment = [
      {
        content: jsonData,
        filename: "data.txt",
      },
    ];
    if (exportType === "email") {
      mailer.sendMail(email, title, template, attachment);
      return res.json(
        successRespSync({
          msg: "Data sent successfully via email",
        })
      );
    } else if (exportType === "download") {
      res.setHeader("Content-disposition", "attachment; filename=data.json");
      res.setHeader("Content-type", "application/json");

      return res.send(jsonData);
    } else {
      mailer.sendMail(email, title, template, attachment);

      res.setHeader("Content-disposition", "attachment; filename=data.json");
      res.setHeader("Content-type", "application/json");

      return res.send(jsonData);
    }
  } catch (err) {

    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
