'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parchment_quality_gradings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      parchmentCoffeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'parchment_coffees',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      uniqueIdentifier: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      qualityTitle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      quantityUnit: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      unitSize: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      unitSizeUnit: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parchment_quality_gradings');
  }
};
