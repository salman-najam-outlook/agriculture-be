'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'map_plantation_seedlings',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        plantationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'plantations',
            key: 'id',
          },
        },
        seedlingId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'seedlings',
            key: 'id',
          },
        },
        bearingFruitStatus: {
          type: Sequelize.ENUM('producing_fruits', 'need_more_time'),
        },
        timeToBearFruit: {
          type: Sequelize.DATEONLY,
        },
        producedCoffeeTreeCount: {
          type: Sequelize.INTEGER,
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
      },
      {
        uniqueKeys: {
          uniqPlantationSeedling: {
            fields: ['plantationId', 'seedlingId'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('map_plantation_seedlings');
  },
};
