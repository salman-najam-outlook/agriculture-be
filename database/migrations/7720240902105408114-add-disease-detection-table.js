'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('disease_detection', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      primaryAccuracy: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      primaryClass: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      primaryInfoLink: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      primaryClassId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      primaryClassImage: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      secondaryAccuracy: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      secondaryClass: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      secondaryInfoLink: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      secondaryClassId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      secondaryClassImage: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('disease_detection');
  },
};
