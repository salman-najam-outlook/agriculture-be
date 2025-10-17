'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'managerTribe', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users','dryMillingPic', {
      allowNull: true,
      type: Sequelize.JSON,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'managerTribe');
    await queryInterface.removeColumn('users', 'dryMillingPic');
  }
};
