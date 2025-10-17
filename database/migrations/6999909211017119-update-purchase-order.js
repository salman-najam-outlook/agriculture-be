'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BuyingStationOrders", "farmId", {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addColumn("BuyingStationOrders", "segmentId", {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },
  down: async (queryInterface, Sequelize) => {

  }
};
