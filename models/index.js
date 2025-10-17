"use strict";
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../components/config.js")[env];
const { retriveAllFilesInDirectory } = require("../helpers/utils");
const db = {};

let sequelize;

if (config.use_env_variable) {
  console.log("Using environment variable configuration:", config);
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {
    logging: console.log, // Enable logging SQL queries to the console
  });
} else {
  console.log("Using specific configuration for", env, config);
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      logging: console.log, // Enable logging SQL queries to the console
    }
  );
}

const originalTransaction = sequelize.transaction;
sequelize.transaction = async function (...args) {
  console.log("Transaction started from:\n", new Error().stack);
  return originalTransaction.apply(this, args);
};

const models = retriveAllFilesInDirectory(__dirname);

models
  .filter((file) => {
    const fileName = file.split("/").pop();
    return (
      fileName.indexOf(".") !== 0 &&
      path.basename(fileName) !== basename &&
      fileName.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    try {
      const model = require(file)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } catch (error) {
      console.log(error);
    }
    // var filename = file.replace(__dirname,'').slice(1);
    // var filename = filename.replace("\\", '/');
    // if(filename != 'index.js'){
    //   const model = require('./'+filename)(sequelize, Sequelize.DataTypes);
    //   db[model.name] = model;
    // }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Association starts from here

// # association 1

db.HarvestMethod.hasMany(db.HarvestMethodType, {
  foreignKey: "harvestMethodId",
  as: "harvest_method_type",
});

db.user_language.belongsTo(db.language, {
  foreignKey: "languageId",
});
db.user.hasMany(db.user_language, {
  foreignKey: "userId",
  as: "languageDetails",
});

// # association 3
db.shipment.belongsTo(db.order, {
  foreignKey: "orderId",
});

// # association 4
// association for location
db.Geofence.hasMany(db.GeofenceCoordinate, {
  foreignKey: "geoFenceId",
  as: "coordinates",
});

// association for area
db.Geofence.belongsTo(db.Unit, {
  foreignKey: "geofenceAreaUOMId",
  as: "areaUnit",
});
// association for parameter
db.Geofence.belongsTo(db.Unit, {
  foreignKey: "geofenceParameterUOMId",
  as: "parameterUnit",
});
// association with the farm
db.Geofence.belongsTo(db.user_farm, {
  foreignKey: "farmId",
  as: "farm",
});

// user farm association with the configuration
db.Geofence.hasMany(db.UnitConfiguration, {
  sourceKey: "userId",
  foreignKey: "userId",
  as: "configuration",
});

// # association 4

db.UserPlantField.belongsTo(db.Unit, {
  foreignKey: "plantQtyUmoId",
  as: "plantQtyUnit",
});

// many to many relationship between userplantfield and geofence table
db.UserPlantField.belongsToMany(db.Geofence, {
  through: db.MapPlantingGeofencing,
  foreignKey: "plantingId",
  otherKey: "geoFenceId",
});

// association for area
// db.user_farm.belongsTo(db.Unit, {
//   foreignKey: "areaUOMId",
//   as: "areaUnit",
// });

// association for parameteres
// db.user_farm.belongsTo(db.Unit, {
//   foreignKey: "parameterUomId",
//   as: "parameterUnit",
// });

// association with the farm_coordinates
db.user_farm.hasMany(db.UserFarmCoordinate, {
  foreignKey: "farmId",
  as: "coordinates",
});

// user farm association with the configuration
db.user_farm.hasMany(db.UnitConfiguration, {
  sourceKey: "userId",
  foreignKey: "userId",
  as: "configuration",
});

// configuration and unit association
// db.Configuration.hasMany(db.Unit, {
//   sourceKey: "value",
//   foreignKey: "id",
//   as: "unit",
// });

// Associationg user with mode of operations for equipments
db.user.hasMany(db.EquipmentModeOfOperation, {
  foreignKey: "userID",
  as: "user_equipment_mode_of_operations",
});

// Associationg user with organization
db.user.belongsTo(db.Organization, {
  foreignKey: "organization",
  as: "user_organization",
});

// Associationg user with equipment group
db.user.hasMany(db.EquipmentGroup, {
  foreignKey: "userID",
  as: "user_equipment_group",
});

// Associationg user with equipment names
db.user.hasMany(db.EquipmentName, {
  foreignKey: "userID",
  as: "user_equipment_names",
});

// Associating user equipments with user farms

db.Equipment.belongsToMany(db.Geofence, {
  through: db.EquipmentUserSegment,
  foreignKey: "equipmentID",
  otherKey: "geoFenceID",
  as: "equipment_geoFence",
});

db.Equipment.belongsToMany(db.EquipmentActivity, {
  through: db.EquipmentEquipmentActivity,
  as: "equipment_equipment_activity",
  foreignKey: "equipment_id",
  otherKey: "equipment_activity_id",
});

db.EquipmentActivity.belongsToMany(db.Equipment, {
  through: "EquipmentEquipmentActivity",
  as: "equipment_equipment_activity",
  foreignKey: "equipment_activity_id",
  otherKey: "equipment_id",
});

db.Equipment.belongsToMany(db.user_farm, {
  through: db.EquipmentUserFarm,
  foreignKey: "equipmentID",
  otherKey: "farmID",
  as: "equipment_farm",
});

// Associating equipment category with activity
db.EquipmentCategory.hasMany(db.EquipmentActivity, {
  foreignKey: "category",
  as: "equipment_category_activity",
});

db.Equipment.belongsTo(db.EquipmentName, {
  foreignKey: "equipmentName",
  as: "equipment_name",
});

// Association Equipment with equipment group
db.Equipment.belongsTo(db.EquipmentModeOfOperation, {
  foreignKey: "modeOfOperation",
  as: "equipment_mode_of_operation",
});

// Association Equipment with equipment group
db.Equipment.belongsTo(db.EquipmentCategory, {
  foreignKey: "category",
  as: "equipment_category",
});

db.Equipment.belongsTo(db.EquipmentActivity, {
  foreignKey: "activity",
  as: "equipment_activity",
});

// ** user goal
// association for area

db.UserGoal.hasOne(db.Soil_PH, {
  foreignKey: "id",
  sourceKey: "soilPhId",
  as: "soilPH",
});

db.UserGoal.hasOne(db.Option, {
  foreignKey: "id",
  sourceKey: "cropTypeOptId",
  as: "cropType",
});

db.UserGoal.hasMany(db.UserCropsHistory, {
  foreignKey: "goalId",
  sourceKey: "id",
  as: "cropHistory",
});

// user farm association with the configuration
db.UserCropsHistory.hasMany(db.UnitConfiguration, {
  sourceKey: "userId",
  foreignKey: "userId",
  as: "configuration",
});

// user farm association with the configuration
db.Unit.hasMany(db.Unit, {
  sourceKey: "id",
  foreignKey: "id",
  as: "category",
});

// unit configuration table association

db.UnitConfiguration.hasOne(db.Unit, {
  sourceKey: "unit_category_id",
  foreignKey: "id",
  as: "category",
});

db.UnitConfiguration.hasOne(db.Unit, {
  sourceKey: "unit_subCategory_id",
  foreignKey: "id",
  as: "subCategory",
});

db.UnitConfiguration.hasOne(db.Unit, {
  sourceKey: "unit_id",
  foreignKey: "id",
  as: "unit",
});

db.UserfarmCrop.hasMany(db.UserfarmCropVariety, {
  foreignKey: "userFarmCropId",
  as: "user_farm_crop_variety",
});

db.UserfarmCrop.belongsTo(db.Option, {
  foreignKey: "cropTypeOptId",
  as: "user_farm_crop_name",
});

db.UserfarmCropVariety.belongsTo(db.Crop, {
  foreignKey: "cropId",
  as: "crop_variety",
});

db.Crop.belongsTo(db.Option, {
  foreignKey: "cropTypeOptId",
  as: "crop_variety_type",
});

db.UserfarmCrop.belongsTo(db.user_farm, {
  foreignKey: "farmId",
  as: "user_crop_farm",
});

db.UserfarmCrop.belongsTo(db.Geofence, {
  foreignKey: "segmentId",
  as: "user_crop_segment",
});

db.UserfarmCrop.belongsTo(db.Option, {
  foreignKey: "vegetativePropagationTypeOptId",
  as: "vegetativePropagation",
});

db.UserfarmCrop.belongsTo(db.Option, {
  foreignKey: "cropSeasonOptId",
  as: "cropSeason",
});

db.UserfarmCrop.belongsTo(db.Option, {
  foreignKey: "cropLifecycleOptId",
  as: "cropLifecycle",
});

db.UserfarmCrop.belongsTo(db.Option, {
  foreignKey: "cropWaterMgmtOptId",
  as: "cropWaterMgmt",
});

db.satellite_report.hasMany(db.satellite_report_coordinates, {
  as: "coordinates",
});
// db.Currency.hasMany(db.UserCurrencySettings, { as: "currencySettings" });
db.UserCurrencySettings.belongsTo(db.Currency, {
  foreignKey: "currencyId",
  as: "currency",
});

module.exports = db;
