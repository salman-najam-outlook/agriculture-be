'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HarvestMethodType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.HarvestMethod, {
        foreignKey: 'harvestMethodId',
        as: 'method_for_harvesting',
      });
    }
  };
  HarvestMethodType.init({
    harvestMethodId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'harvest_method',
        key: 'id',
      },
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'HarvestMethodTypes',
    modelName: 'HarvestMethodType',
  });
  return HarvestMethodType;
};