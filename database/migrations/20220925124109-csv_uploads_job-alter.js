'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('csv_upload_jobs', 'org_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'Organization ID',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('csv_upload_jobs', 'org_id');
  },
};
