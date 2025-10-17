'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('geofences', 'mobileRecordId');
    // await queryInterface.addColumn('geofences', 'recordId', {
    //   type: Sequelize.STRING,
    //   allowNull: true,

    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('geofences', 'mobileRecordId');
  },
};
