'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('organization', 'licenseId', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('organization', 'accessmentReportUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('organization', 'primaryUserId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('organization', 'licenseId');
    await queryInterface.removeColumn('organization', 'accessmentReportUrl');
    await queryInterface.removeColumn('organization', 'primaryUserId');
  }
};
