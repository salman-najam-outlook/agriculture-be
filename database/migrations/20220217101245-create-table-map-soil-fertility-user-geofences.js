'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_soil_fertility_audit_geofences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      geofenceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'geofences', key: 'id' },
        onDelete: 'CASCADE'
      },
      soilFertilityAuditId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soil_fertility_audit',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('map_soil_fertility_audit_geofences');
  }
};
