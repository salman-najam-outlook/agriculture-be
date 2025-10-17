'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserImport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserImport.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fileOriginalName: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      fileS3Name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        get() {
          let fileSize = this.getDataValue('fileSize');
          if (fileSize == null || fileSize == '') return null;
          fileSize = fileSize / 1000;
          return fileSize;
        },
      },
      location: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(),
        values: ['pending', 'success', 'failed'],
        defaultValue: 'pending',
      },
      error: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.ENUM(),
        values: ['1', '0'],
        defaultValue: '0',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'user_import',
      modelName: 'UserImport',
    }
  );
  return UserImport;
};
