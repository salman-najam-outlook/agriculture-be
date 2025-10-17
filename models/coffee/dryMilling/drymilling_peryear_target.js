'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dryMilling_perYear_target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  dryMilling_perYear_target.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recordId: { 
     type: DataTypes.STRING,
     allowNull: true
    }
  }, {
    sequelize,
    modelName: 'dryMilling_perYear_target',
  });
  return dryMilling_perYear_target;
};