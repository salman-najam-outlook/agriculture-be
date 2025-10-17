'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.changeColumn('geofences', 'geofenceCenterLat', {
          type: Sequelize.DOUBLE,
          allowNull: true,
        }, { transaction }),
        queryInterface.changeColumn('geofences', 'geofenceCenterLog', {
          type: Sequelize.DOUBLE,
          allowNull: true,
        }, { transaction }),
        queryInterface.changeColumn('geofences', 'geofenceRadius', {
          type: Sequelize.DOUBLE,
          allowNull: true,
        }, { transaction }),
      ])
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.changeColumn('geofences', 'geofenceCenterLat', {
          type: Sequelize.FLOAT,
          allowNull: true,
        }, { transaction }),
        queryInterface.changeColumn('geofences', 'geofenceCenterLog', {
          type: Sequelize.FLOAT,
          allowNull: true,
        }, { transaction }),
        queryInterface.changeColumn('geofences', 'geofenceRadius', {
          type: Sequelize.FLOAT,
          allowNull: true,
        }, { transaction }),
      ])
    });
  }
};
