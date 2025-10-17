"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WeatherAnalysisReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });

      this.belongsTo(models.user_farm, {
        foreignKey: "farm_id",
        as: "userFarm",
      }); 
      this.hasMany(models.WeatherAnalysisDetail,{
        foreignKey:'weather_report_id',
        sourceKey:'id',
        as:'weather_analysis_details'
      })
    }
  }
  WeatherAnalysisReport.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },

      farm_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "user_farms",
          key: "id",
        },
      },
      crop_id:{
        allowNull: true,
        type: DataTypes.STRING,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      issuedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bbox_coordinates:{
        type:DataTypes.JSON,
        allowNull:true,
      },
      overall_score:{
        type:DataTypes.DECIMAL,
        allowNull:true
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "weather_analysis_reports",
      modelName: "WeatherAnalysisReport",
    }
  );
  return WeatherAnalysisReport;
};
