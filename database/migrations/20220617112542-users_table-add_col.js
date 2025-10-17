'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'partnerTribe', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'buyingStationPic', {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn('users', 'partnerPic', {
      type: Sequelize.JSON,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'partnerTribe');
    await queryInterface.removeColumn('users', 'buyingStationPic');
    await queryInterface.removeColumn('users', 'partnerPic');
  },
};
