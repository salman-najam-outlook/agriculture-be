'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('geofences', 'dimitraGeofenceId', {
      allowNull: true,
      type: Sequelize.STRING,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('geofences', 'dimitraGeofenceId');
  },
};
