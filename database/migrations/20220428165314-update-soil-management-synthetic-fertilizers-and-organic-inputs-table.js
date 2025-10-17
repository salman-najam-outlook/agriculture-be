'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('soil_management_synthetic_fertilizers', 'syntheticFertilizerId', {
        after: 'id',
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('soil_management_organic_inputs', 'organicInputId', {
        after: 'id',
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('soil_management_synthetic_fertilizers', 'syntheticFertilizerId'),
      queryInterface.removeColumn('soil_management_organic_inputs', 'organicInputId'),
    ]);
  }
};
