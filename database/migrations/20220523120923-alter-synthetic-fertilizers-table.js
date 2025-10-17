'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return [
          queryInterface.addColumn(
            'synthetic_fertilizers',
            'n',
            Sequelize.STRING
          ), 
          queryInterface.addColumn(
            'synthetic_fertilizers',
            'p',
            Sequelize.STRING
          ),
          queryInterface.addColumn(
            'synthetic_fertilizers',
            'k',
            Sequelize.STRING
          )
      ];
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn('synthetic_fertilizers', 'n'),
      queryInterface.removeColumn('synthetic_fertilizers', 'p'),
      queryInterface.removeColumn('synthetic_fertilizers', 'k')
    ];
  }
};
