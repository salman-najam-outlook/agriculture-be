'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('cacao_purchase_orders', 'cacao_weight')

    await queryInterface.addColumn('cacao_purchase_orders', 'cacao_weight', {
      allowNull: true,
      type: Sequelize.DOUBLE,
      after: 'cacao_variety'
    });
    await queryInterface.addColumn('cacao_purchase_orders', 'cacao_weight_unit_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'units_list',
        key: 'id',
      },
      after: 'cacao_weight',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
