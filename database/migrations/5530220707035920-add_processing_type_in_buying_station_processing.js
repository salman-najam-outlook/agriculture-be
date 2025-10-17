'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('processing_types', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    await  queryInterface.bulkInsert('processing_types', [
      { name : "Honey" },
      { name : "Natural (Dry)" },
      { name : "Wine" },
      { name : "Semi-Washed" },
      { name : "Full-Washed" },
    ])        

    await queryInterface.addColumn(
      'BuyingStationProcessingBatches',
      'processingTypeId',
      {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'BuyingStationProcessingBatches',
      'processingTypeId'
    );
  },
};
