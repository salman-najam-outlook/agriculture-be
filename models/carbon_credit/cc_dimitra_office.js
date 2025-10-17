'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DimitraOffice extends Model {
    static associate(models) {
      // define association here
      DimitraOffice.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'organization'
      });
    }
  }
  
  DimitraOffice.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    officeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'DimitraOffice',
    tableName: 'dimitra_offices',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  
  return DimitraOffice;
}; 