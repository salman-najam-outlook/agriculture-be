'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('harvest_alert_info', 'cropId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { 
        model: 'options', 
        key: 'id' 
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addColumn('harvest_alert_info', 'country', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('harvest_alert_info', 'cropId');
    await queryInterface.removeColumn('harvest_alert_info', 'country');
  }
};
