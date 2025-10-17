'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soil_prep_practice',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onDelete: 'CASCADE'
        },
        cropId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'crops', key: 'id' },
          onDelete: 'CASCADE'
        },
        cropVariety: {
          allowNull: true,
          type: Sequelize.STRING
        },
        activityId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {model: 'soil_prep_activity', key: 'id'}
        },
        startDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        endDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('soil_prep_practice');
  }
};
