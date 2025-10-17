"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TraceabilityExternalId extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  TraceabilityExternalId.init(
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(
          'coffee_plantation',
          'coffee_purchase_order',
          'coffee_processing_batch',
          'cacao_plantation',
          'cacao_purchase_order',
          'cacao_processing_batch',
          'parchment_coffee',
          'parchment_cacao',
          'husk_processing_batch',
          "purchase_confirmation", 
          "batch_mgmt", 
          "final_product"
        ),
      },
      type_id: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      tableName: "traceability_external_ids",
      modelName: "TraceabilityExternalId",
    }
  );

  return TraceabilityExternalId;
};
