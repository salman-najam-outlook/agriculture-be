'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('crop_storage', 'didYieldStoredInBags', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: 'status of if yield stored in bags or not',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('crop_storage', 'didYieldStoredInBags');
  },
};
