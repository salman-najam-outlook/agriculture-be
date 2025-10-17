'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlantationTraceability extends Model {
    static associate(models) {
      // Belongs to user (for user-specific data access)
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });

      // Belongs to sowing record (using sowing.id for reliable relationship)
      this.belongsTo(models.Sowing, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'sowing'
      });
    }
  }

  PlantationTraceability.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      plantation_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: 'Reference to sowing ID (sowing.id) for reliable traceability'
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: 'User who owns this plantation'
      },
      activity_type: {
        allowNull: false,
        type: DataTypes.STRING(50),
        comment: 'Type of agricultural activity - validated in application layer'
      },
      activity_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        comment: 'ID of the specific activity record'
      },
      activity_date: {
        allowNull: false,
        type: DataTypes.DATE,
        comment: 'Date when the activity was performed'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      tableName: 'plantation_traceability',
      modelName: 'PlantationTraceability',
      underscored: true,
      indexes: [
        {
          fields: ['plantation_id']
        },
        {
          fields: ['user_id']
        },
        {
          fields: ['activity_type']
        },
        {
          fields: ['activity_id']
        },
        {
          fields: ['activity_date']
        }
      ]
    }
  );

  return PlantationTraceability;
}; 