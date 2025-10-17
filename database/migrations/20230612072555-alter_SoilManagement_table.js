'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('soil_managements', 'cropTypeId')
    await queryInterface.dropTable('soil_management_crop_variety');
    await queryInterface.renameColumn(
      'soil_management_farm',
      'soilManagementId',
      'soilInformationId'
    );
    await queryInterface.renameColumn(
      'soil_management_segment',
      'soilManagementId',
      'soilInformationId'
    );
    await queryInterface.renameColumn(
      'soil_management_soil_type',
      'soilManagementId',
      'soilInformationId'
    );
    await queryInterface.renameColumn(
      'soil_management_cost',
      'soilManagementId',
      'soilInformationId'
    );
    await queryInterface.renameTable('soil_managements', 'soil_information');
    await queryInterface.renameTable('soil_management_farm', 'soil_information_farm');
    await queryInterface.renameTable('soil_management_segment', 'soil_information_segment');
    await queryInterface.renameTable('soil_management_soil_type', 'soil_information_soil_type');
    await queryInterface.renameTable('soil_management_cost', 'soil_information_cost');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('soil_management_crop_variety');
     */
  }
};
