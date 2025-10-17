'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('organization', 'recordId', {
      type: Sequelize.STRING(60),
      defaultValue: null,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('organization', 'recordId');
  },
};
