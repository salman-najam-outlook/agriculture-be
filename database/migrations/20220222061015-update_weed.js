'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('weed', 'weed_method_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'weed_methods',
        key: 'id',
      },
      onDelete: 'CASCADE'
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
