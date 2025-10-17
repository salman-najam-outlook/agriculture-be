'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('weed', 'cropVarietyId');
    await queryInterface.removeColumn('weed', 'weedStageId');
    await queryInterface.removeColumn('weed', 'weedMethodId');
    await queryInterface.removeColumn('weed', 'weedTypeId');
    await queryInterface.addColumn('weed', 'cropTypeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'options',
        key: 'id',
      },
    });
    await queryInterface.addColumn('weed', 'area', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
