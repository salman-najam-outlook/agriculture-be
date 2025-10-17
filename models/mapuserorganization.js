'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapUserOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapUserOrganization.init(
    {
      userId: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
      isdeleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'MapUserOrganization',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return MapUserOrganization;
};
