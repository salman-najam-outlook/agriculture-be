'use strict';

const type = [
  'soil_type',
  'crop_variety',
  'input_type',
  'liming_material',
  'organic_inputs',
  'synthetic_fertilizers',
  'synthetic_application_method',
  'organic_application_method',
  'soil_application_method',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('map_soilmanagement_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.ENUM(type),
        allowNull: true,
      },
      optionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      soilManagementId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('map_soilmanagement_options', {
      type: 'UNIQUE',
      fields: ['type', 'optionId', 'soilManagementId'],
      name: 'type_optionid_soilmgmtid',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('map_soilmanagement_options');
  },
};
