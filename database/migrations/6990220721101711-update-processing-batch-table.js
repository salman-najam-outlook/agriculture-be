'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'BuyingStationProcessingBatches',
      'batchRating',
      {
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E','Platinum','Gold','Silver','Bronze'),
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {

  },
};
