'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmCertificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FarmCertificate.init({
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_farms',
        key: 'id'
      }
    },
    certificateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'options',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'FarmCertificate',
    tableName:'farm_certifications',
  });
  return FarmCertificate;
};