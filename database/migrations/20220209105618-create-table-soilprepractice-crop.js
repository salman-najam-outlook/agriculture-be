'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_soil_prep_practice_crop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soil_prep_practiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soil_prep_practice',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      cropId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'crops',
          key: 'id',
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
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('map_soil_prep_practice_crop');
  }
};
