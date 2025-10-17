'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("seedlings", "commodity_id");
    await queryInterface.removeColumn("seedlings", "plantation_id");
    await queryInterface.removeColumn("seedlings", "source_of_seeds");
    await queryInterface.removeColumn("seedlings", "no_of_trees");
    await queryInterface.addColumn('seedlings', 'no_of_seeds', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('seedlings', 'seed_producer', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('seedlings', 'origin_of_the_seeds', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
