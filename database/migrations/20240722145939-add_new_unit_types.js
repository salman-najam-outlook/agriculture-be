'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('unit_types', [
      {
        name: 'CalciumUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Calcium Unit'
      },
      {
        name: 'MagnesiumUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Magnesium Unit'
      },
      {
        name: 'IronUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Iron Unit'
      },
      {
        name: 'ZincUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Zinc Unit'
      },
      {
        name: 'BoronUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Boron Unit'
      },
      {
        name: 'SoilOrganicCarbonUnit',
        createdAt: new Date(),
        updatedAt: new Date(),
        label: 'Soil Organic Carbon Unit'
      }
    ],{
      updateOnDuplicate: ['name', 'label', 'updatedAt']
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('unit_types', {
      name: [
        'CalciumUnit',
        'MagnesiumUnit',
        'IronUnit',
        'ZincUnit',
        'BoronUnit',
        'SoilOrganicCarbonUnit'
      ]
    });
  }
};
