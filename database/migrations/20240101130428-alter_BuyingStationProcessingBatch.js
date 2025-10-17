'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'wasHuskProduced', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'quantityOfHusk', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'huskCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('BuyingStationProcessingBatches', 'wasHuskProduced');
    await queryInterface.removeColumn('BuyingStationProcessingBatches', 'quantityOfHusk');
    await queryInterface.removeColumn('BuyingStationProcessingBatches', 'huskCode');

  }
};
