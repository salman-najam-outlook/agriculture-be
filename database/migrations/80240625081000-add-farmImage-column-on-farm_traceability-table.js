'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('farm_traceability', 'farmImage', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('farm_traceability', 'farmImage');
  },
};
