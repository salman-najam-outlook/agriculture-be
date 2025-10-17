'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const transaction = await queryInterface.sequelize.transaction()
      await queryInterface.removeColumn("plantations", "commodity_id", { transaction });
      // await queryInterface.removeColumn("plantations", "harvested_trees_count", { transaction });
      await queryInterface.removeColumn("plantations", "area", { transaction });
      await queryInterface.addColumn('plantations', 'no_of_coffee_trees', {
        type: Sequelize.INTEGER,
      }, { transaction });
      await queryInterface.addColumn('plantations', 'bearing_fruit_status', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }, { transaction });
      await queryInterface.addColumn('plantations', 'time_to_bear_fruit', {
        allowNull: true,
        type: Sequelize.DATE,
      }, { transaction });
      await queryInterface.addColumn('plantations', 'no_of_trees_bearing_fruit', {
        type: Sequelize.INTEGER,
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
