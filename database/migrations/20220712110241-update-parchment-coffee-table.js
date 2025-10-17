'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(
      'parchment_coffees',
      'usedForWarehouse'
    );
    await queryInterface.addColumn(
      'parchment_coffees',
      'usedForWarehouse',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        after: 'status',
      }
    )
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
