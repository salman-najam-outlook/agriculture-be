'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          'satellite_reports',
          'generatedByUserId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'satellite_reports',
          'reportGroup',
          {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Satellite Report',
          },
          { transaction }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn('satellite_reports', 'generatedByUserId', { transaction }),
        queryInterface.removeColumn('satellite_reports', 'reportGroup', { transaction }),
      ]);
    });
  },
};
