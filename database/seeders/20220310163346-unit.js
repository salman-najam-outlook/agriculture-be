('use strict');

const moment = require('moment');
const options = [
  {
    unitType: 'BulkDensity',
    unitList: [{ abbvr: 'g/ml', unitType: 'g/ml' }],
  },
  {
    unitType: 'NitrogenUnit',
    unitList: [
      { abbvr: 'mg/l', unitType: 'mg/l' },
      { abbvr: 'kg/ha', unitType: 'kg/ha' },
      { abbvr: 'ppm', unitType: 'ppm' },
    ],
  },
  {
    unitType: 'PhosphorusUnit',
    unitList: [
      { abbvr: 'mg/l', unitType: 'mg/l' },
      { abbvr: 'kg/ha', unitType: 'kg/ha' },
      { abbvr: 'ppm', unitType: 'ppm' },
    ],
  },
  {
    unitType: 'SulphurUnit',
    unitList: [
      { abbvr: 'mg/l', unitType: 'mg/l' },
      { abbvr: 'kg/ha', unitType: 'kg/ha' },
      { abbvr: 'ppm', unitType: 'ppm' },
    ],
  },
  {
    unitType: 'PotassiumUnit',
    unitList: [
      { abbvr: 'mg/l', unitType: 'mg/l' },
      { abbvr: 'kg/ha', unitType: 'kg/ha' },
      { abbvr: 'ppm', unitType: 'ppm' },
    ],
  },
  {
    unitType: 'TotalLimeWeightUnit',
    unitList: [
      { abbvr: 'Grams', unitType: 'Grams' },
      { abbvr: 'Kilograms', unitType: 'Kilograms' },
      { abbvr: 'Tonnes', unitType: 'Tonnes' },
      { abbvr: 'Pounds', unitType: 'Pounds' },
    ],
  },
  {
    unitType: 'LimingRateWeightAreaUnit',
    unitList: [
      { abbvr: 'Kg per acre', unitType: 'Kg per acre' },
      { abbvr: 'Hectare', unitType: 'Hectare' },
      { abbvr: 'Tonne per acre', unitType: 'Tonne per acre' },
    ],
  },
  {
    unitType: 'TotalOrganicInputAppliedWeightUnit',
    unitList: [
      { abbvr: 'Kilograms', unitType: 'Kilograms' },
      { abbvr: 'Tonnes', unitType: 'Tonnes' },
      { abbvr: 'Pounds', unitType: 'Pounds' },
    ],
  },
  {
    unitType: 'OrganicInputApplicationRateWeightAreaUnit',
    unitList: [
      { abbvr: 'Kg per acre', unitType: 'Kg per acre' },
      { abbvr: 'Hectare', unitType: 'Hectare' },
      { abbvr: 'Tonne per acre', unitType: 'Tonne per acre' },
    ],
  },

  {
    unitType: 'TotalSyntheticFertilizerUsedWeightUnit',
    unitList: [
      { abbvr: 'Kilograms', unitType: 'Kilograms' },
      { abbvr: 'Tonnes', unitType: 'Tonnes' },
      { abbvr: 'Pounds', unitType: 'Pounds' },
    ],
  },
  {
    unitType: 'SyntheticFertilizerApplicationRateWeightAreaUnit',
    unitList: [
      { abbvr: 'Kg per acre', unitType: 'Kg per acre' },
      { abbvr: 'Hectare', unitType: 'Hectare' },
      { abbvr: 'Tonne per acre', unitType: 'Tonne per acre' },
    ],
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all(
      options.map(async (option) => {
        let data = [
          {
            name: option.unitType,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          },
        ];
        let unitType = await queryInterface.bulkInsert('unit_types', data, {});

        await Promise.all(
          option.unitList.map(async (unitValue) => {
            let data2 = [
              {
                name: unitValue.unitType,
                abbvr: unitValue.abbvr,
                unitType: unitType,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              },
            ];

            await queryInterface.bulkInsert('units_list', data2, {});
          })
        );
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all(
      options.map(async (option) => {
        let unitType = await queryInterface.rawSelect(
          'unit_types',
          {
            where: {
              name: option.unitType,
            },
          },
          ['id']
        );

        await queryInterface.bulkDelete(
          'units_list',
          { unitType: unitType },
          {}
        );
        await queryInterface.bulkDelete('unit_types', { id: unitType }, {});
      })
    );
  },
};
