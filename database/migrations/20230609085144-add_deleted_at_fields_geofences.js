'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.addColumn('geofences', 'deletedAt', {
            type:Sequelize.DataTypes.DATE,
            allowNull:true
        })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('geofences', 'deletedAt')
    ])
  }
};
