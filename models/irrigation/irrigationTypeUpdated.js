'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationTypeUpdated extends Model {
    static associate(models) {
      // Self-referencing association for parent-child relationship
      this.belongsTo(models.IrrigationTypeUpdated, {
        foreignKey: 'parentId',
        as: 'parent'
      });
      this.hasMany(models.IrrigationTypeUpdated, {
        foreignKey: 'parentId',
        as: 'children'
      });
    }
  }
  IrrigationTypeUpdated.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Main category like Ground Water, Surface Water, etc.'
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'irrigation_type_updated',
          key: 'id',
        },
        comment: 'Reference to parent category (null for main categories)'
      },
      isCategory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'True if this is a main category, false if it\'s a subcategory'
      },
      isUserSpecific: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'True if this is a user-specific custom entry'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        comment: 'User ID for user-specific entries (null for system defaults)'
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Order within the category'
      }
    },
    {
      sequelize,
      modelName: 'IrrigationTypeUpdated',
      tableName: 'irrigation_type_updated',
      indexes: [
        {
          unique: true,
          fields: ['name', 'category', 'userId'],
          where: {
            userId: null
          }
        },
        {
          fields: ['parentId']
        },
        {
          fields: ['category']
        },
        {
          fields: ['isCategory']
        }
      ],
    }
  );
  return IrrigationTypeUpdated;
}; 