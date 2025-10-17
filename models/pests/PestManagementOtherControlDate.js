'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PestManagementOtherControlDate extends Model {
    static associate(models) {}
  }
  PestManagementOtherControlDate.init(
    {
      pestManagementId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'PestManagement',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PestManagementOtherControlDate',
      tableName: 'pest_management_other_control_date',
    }
  );
  return PestManagementOtherControlDate;
};
