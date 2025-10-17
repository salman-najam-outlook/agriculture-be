"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditProjectFarm extends Model {
    static associate(models) {
      // define associations here
      CarbonCreditProjectFarm.belongsTo(models.CarbonCreditProject, {
        foreignKey: "project_id",
        as: "project",
      });

      CarbonCreditProjectFarm.belongsTo(models.user_farm, {
        foreignKey: "farm_id",
        as: "farm",
      });

      CarbonCreditProjectFarm.hasOne(models.CarbonCreditCropGrowing, {
        foreignKey: "farm_project_id",
        as: "crop_growing"
      });
    }
  }

  CarbonCreditProjectFarm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carbon_credit_projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user_farms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      digitally_signed_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signage_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      farmer_photo_s3_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      land_title_permit_s3_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      digital_signature_s3_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "in_progress",
          "in_review",
          "approved",
          "require_update"
        ),
        allowNull: false,
        defaultValue: "in_review",
      },
      signed_agreement_s3_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recordId'
      },
    },
    {
      sequelize,
      modelName: "CarbonCreditProjectFarm",
      tableName: "carbon_credit_project_farm",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return CarbonCreditProjectFarm;
};
