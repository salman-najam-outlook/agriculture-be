"use strict";
const moment = require("moment");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.FarmLocation, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "mainLocation"
      });
      this.hasMany(models.FarmLocation, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "secondaryLocations"
      });
      this.hasMany(models.FarmLocation, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "locations"
      });
      this.belongsToMany(models.UserfarmCrop, {
        through: "UserCropFarm",
        foreignKey: "farmId",
        sourceKey: "id",
        as: "farmCrops",
      });
      this.hasMany(models.UserFarmingGoal, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "farmGoals",
      });
      this.belongsToMany(models.Equipment, {
        through: "EquipmentUserFarm",
        foreignKey: "farmID",
        otherKey: "equipmentID",
        as: "farmEquipments",
      });
      this.belongsToMany(models.userLiveStock, {
        through: "userLiveStockFarm",
        foreignKey: "farm",
        otherKey: "userLiveStock",
        as: "farmLivestocks",
      });
      this.belongsToMany(models.Plantations,{
        through: "PlantationsUserFarmsMap",
        as:'farmPlantations',
        foreignKey:'farm_id',
        otherKey:'plantation_id'
      })
      this.belongsToMany(models.CacaoPlantations, {
        through: 'CacaoPlantationsUserFarmsMap',
        foreignKey: 'farm_id',
        otherKey: 'plantation_id',
        as: 'cacaoPlantations',
      });
      this.hasOne(models.user, {
        foreignKey: "id",
        sourceKey: "farmOwner",
        as: "includeFarmOwner",
      });
      this.hasOne(models.Option, {
        foreignKey: "id",
        sourceKey: "farmType",
        as: "includeFarmType",
      });
      this.hasOne(models.Option, {
        foreignKey: "id",
        sourceKey: "farmType",
        as: "includeProductionSystem",
      });
      this.hasMany(models.UserFarmCoordinate, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "farmCoordinates",
      });
      this.hasMany(models.HarvestingFarm, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "harvestingFarm",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      this.hasMany(models.Geofence, {
        foreignKey: "farmId",
        as: "zones",
      });
      this.hasMany(models.Geofence, {
        foreignKey: "farmId",
        as: "segments",
      });
      this.hasOne(models.Geofence, {
        foreignKey: "farmId",
        as: "circularGeofence",
      });
      this.hasMany(models.MapSowingFarms, {
        foreignKey: "userFarmId",
        sourceKey: "id",
        as: "sowingFarm",
      });
      this.hasMany(models.UserfarmCrop, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "UserfarmCrop",
      });
      this.hasMany(models.PlantationsUserFarmsMap, {
        foreignKey: 'farm_id',
        as: 'farmPlantationMap'
      })
      this.belongsToMany(models.Option, {
        through: "FarmCertificate",
        foreignKey: "farmId",
        otherKey: "certificateId",
        as: "farmCertifications",
      });
      this.hasMany(models.FarmReport, {
        foreignKey: "farmId",
        as: "FarmReport",
      });
      this.hasMany(models.BuyingStationOrder,{
        as:'buyingStationOders',
        foreignKey:'farmId',
        sourceKey: "id",
      });
      this.hasMany(models.CacaoPurchaseOrder,{
        as:'cacaoBuyingStationOders',
        foreignKey:'farmId',
        sourceKey: "id",
      })
      this.belongsTo(models.user, {
        foreignKey: "technicianId",
        as: "technician",
      });
      this.belongsTo(models.user, {
        foreignKey: "societyId",
        as: "society",
      });

      this.belongsTo(models.user, {
        foreignKey: "adminTechnicianId",
        as: "adminTechnician",
      });
      this.belongsTo(models.user, {
        foreignKey: "oldUserId",
        as: "oldUser",
      });
      this.hasMany(models.TreeDetail, {
        foreignKey: "farmId",
        as: "trees",}),
      this.hasOne(models.FarmTraceability, {
        foreignKey: "farmId",
        sourceKey: "id",
        as: "farmTraceability",
      });
      this.hasMany(models.Event, {
        foreignKey: "farmId",

      });
      this.hasMany(models.MyTree, {
        foreignKey: "farm_id",
      });
      this.hasMany(models.MyTreeHistory, {
        foreignKey: "farm_id",
      });
      this.hasMany(models.CarbonCreditProjectFarm, {
        foreignKey: 'farm_id',
        as: 'projectFarms'
      });
    }
  }
  UserFarm.init(
    {
      adminTechnicianId: DataTypes.INTEGER,
      source: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      technicianId: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      technicianId: DataTypes.INTEGER,
      societyId: DataTypes.INTEGER,
      oldUserId: DataTypes.INTEGER,
      district: DataTypes.INTEGER,
      farmingGoalOptId: DataTypes.INTEGER,
      zipCode: DataTypes.STRING(45),
      farmName: DataTypes.STRING(100),
      region: DataTypes.STRING(200),
      registrationNo: DataTypes.STRING(200),
      ownerName: DataTypes.STRING(100),
      communityName: DataTypes.STRING(200),
      farmerFirstName: DataTypes.STRING,
      farmerMiddleName: DataTypes.STRING,
      farmerLastName: DataTypes.STRING,
      dimitraFarmId: DataTypes.STRING,
      farmerId: DataTypes.INTEGER,
      lat: DataTypes.DOUBLE,
      log: DataTypes.DOUBLE,
      farmingActivity: DataTypes.ENUM("crops", "live stock", "both"),
      farmOwnershipType: DataTypes.ENUM("personal", "community"),
      parameter: DataTypes.FLOAT, // This is in feet
      area: DataTypes.FLOAT, // This is in acre
      areaUomId:DataTypes.INTEGER,
      isPrimaryFarm: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
      isTechnician: DataTypes.BOOLEAN,
      farmGeofenceName:DataTypes.STRING,
      farmGeofenceCategory:DataTypes.STRING,
      farm_created_from:{
        type:DataTypes.ENUM,
        values:['mobile','admin','bulk_import','dds','other'],
        allowNull:true
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          let doe = this.getDataValue("createdAt");
          return moment.utc(doe).format(process.env.DISPLAY_DATE_FORMAT);
        },
      },
      // new col added
      // drop downs start
      farmType: {
        type: DataTypes.INTEGER,
        references: { model: "options", key: "id" },
      },
      productionSystem: {
        type: DataTypes.INTEGER,
        references: { model: "options", key: "id" },
      },
      farmOwner: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      // drop downs ends
      country: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      govRegistrationNum: {
        type: DataTypes.STRING,
      },
      contractMating: {
        type: DataTypes.STRING,
      },
      cooperativeId: {
        type: DataTypes.STRING,
      },
      licenceNum: {
        type: DataTypes.STRING,
      },
      licenceExpiryDate: {
        type: DataTypes.DATEONLY,
      },
      regulatorName: {
        type: DataTypes.STRING,
      },
      regulatorRepresentiveName: {
        type: DataTypes.STRING,
      },
      houseNum: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      inviteLink: {
        type: DataTypes.STRING,
      },
      recordId: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      reject_msg: {
        type: DataTypes.STRING,
      },
      productionType:{
        type:DataTypes.ENUM("Organic","Conventional"),
        allowNull:true
      },
      farmTitleDocument:{
        type:DataTypes.STRING,
        allowNull:true
      },
      farmRegistrationId:{
        type:DataTypes.STRING,
        allowNull:true
      },
      farmerRegistrationId:{
        type:DataTypes.STRING,
        allowNull:true
      }
    },
    {
      sequelize,
      modelName: "user_farm",
    }
  );
  return UserFarm;
};
