'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soil_prep_practice_equipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      equipmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'equipment', key: 'id' },
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
    await queryInterface.dropTable('soil_prep_practice_equipments');
  }
};
