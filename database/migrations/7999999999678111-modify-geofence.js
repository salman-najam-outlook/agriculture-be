'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('geofences', 'mobileRecordId', {
      type: Sequelize.STRING,
      allowNull: true,

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('geofences', 'mobileRecordId');
  },
};
