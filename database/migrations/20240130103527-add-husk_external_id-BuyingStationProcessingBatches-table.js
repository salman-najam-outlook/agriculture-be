'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BuyingStationProcessingBatches', 'husk_external_id', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: "traceability_external_ids",
        key: "id",
      },
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
