"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('soil_managements', 'isDeleted')
    await queryInterface.addColumn("soil_managements", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("soil_management_farm", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("soil_management_segment", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("soil_management_soil_type", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("soil_management_crop_variety", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("soil_management_cost", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
   await queryInterface.removeColumn('soil_managements', 'deletedAt')
   await queryInterface.removeColumn('soil_management_farm', 'deletedAt')
   await queryInterface.removeColumn('soil_management_segment', 'deletedAt')
   await queryInterface.removeColumn('soil_management_soil_type', 'deletedAt')
   await queryInterface.removeColumn('soil_management_crop_variety', 'deletedAt')
   await queryInterface.removeColumn('soil_management_cost', 'deletedAt')
  },
};
