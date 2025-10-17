'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'nft_snapshots',
          'snapshottedAt',
          {
            allowNull: true,
            type: Sequelize.DATE,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          'nft_snapshots',
          'userId',
          {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          { transaction }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'nft_snapshots',
          'snapshottedAt',
          {
            allowNull: false,
            type: Sequelize.DATE,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          'nft_snapshots',
          'userId',
          {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          { transaction }
        ),
      ]);
    });
  },
};
