'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft_snapshots', {
      id: {
        type: Sequelize.BIGINT({ unsigned: true }),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nftId: {
        type: Sequelize.BIGINT({ unsigned: true }),
        allowNull: true,
        references: {
          model: 'nfts',
          key: 'id',
        },
      },
      snapshottedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      lng: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      submittedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      status: {
        type: Sequelize.ENUM('Requested', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Requested',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nft_snapshots');
  },
};
