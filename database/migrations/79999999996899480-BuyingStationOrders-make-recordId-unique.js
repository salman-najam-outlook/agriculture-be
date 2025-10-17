'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BuyingStationOrders', 'recordId', {
      type: Sequelize.DataTypes.STRING, // or the column's actual data type
      allowNull: true, 
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('BuyingStationOrders', 'recordId', {
      type: Sequelize.DataTypes.STRING, // keep the original column type
      allowNull: true, 
      unique: false,
    });
  }
};
