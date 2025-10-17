'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_soil_prep_practice_soil_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soilTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'soil_types', key: 'id' },
        onDelete: 'CASCADE'
      },
      soil_prep_practiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'soil_prep_practice', key: 'id' },
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
    await queryInterface.dropTable('map_soil_prep_practice_soil_type');
  }
};
