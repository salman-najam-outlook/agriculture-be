'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'nft_snapshot_attributes',
      {
        id: {
          type: Sequelize.BIGINT({ unsigned: true }),
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        snapshotId: {
          type: Sequelize.BIGINT({ unsigned: true }),
          allowNull: false,
          references: {
            model: 'nft_snapshots',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        traitType: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        value: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        maxValue: {
          type: Sequelize.DOUBLE,
          allowNull: true,
          defaultValue: null,
        },
        displayType: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: null,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      },
      {
        uniqueKeys: {
          snapshotId_traitType_unique: {
            fields: ['snapshotId', 'traitType'],
            customIndex: true,
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nft_snapshot_attributes');
  },
};
