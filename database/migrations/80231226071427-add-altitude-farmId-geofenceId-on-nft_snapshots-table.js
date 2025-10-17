'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          'nft_snapshots',
          'userFarmId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
              model: 'user_farms',
              key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'nft_snapshots',
          'geofenceId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
              model: 'geofences',
              key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'nft_snapshots',
          'altitude',
          {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: null,
          },
          { transaction }
        ),
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn('nft_snapshots', 'userFarmId', { transaction }),
        queryInterface.removeColumn('nft_snapshots', 'geofenceId', { transaction }),
        queryInterface.removeColumn('nft_snapshots', 'altitude', { transaction }),
      ])
    );
  },
};
