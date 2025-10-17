'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parchment_coffee_processing_batches', {
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
        allowNull: true,
        onDelete: 'CASCADE'
      },
      buyingStationParchmentId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      quantityUnit: {
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
    await queryInterface.dropTable('parchment_coffee_processing_batches');
  }
};
