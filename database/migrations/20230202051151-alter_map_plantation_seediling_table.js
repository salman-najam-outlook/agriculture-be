'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("map_plantation_seedlings", "date", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("map_plantation_seedlings", "timeToBearFruitStatus", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("map_plantation_seedlings", "date")
    await queryInterface.removeColumn("map_plantation_seedlings", "timeToBearFruitStatus")
  }
};
