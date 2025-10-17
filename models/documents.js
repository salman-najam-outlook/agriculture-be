'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      this.belongsTo(models.Document, {
        foreignKey: 'parentId',
        as: 'parentDocument',
        allowNull: true
      });
    }
  }
  Document.init(
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuidName: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.DECIMAL(10, 2),
      },
      docType: {
        type: DataTypes.ENUM(['file', 'folder']),
        allowNull: false,
      },
      format: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Document',
          key: 'id',
        },
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isDefaultFolder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: 'Document',
      tableName: 'document',
    }
  );
  return Document;
};
