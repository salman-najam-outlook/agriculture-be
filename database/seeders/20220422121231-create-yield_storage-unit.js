('use strict');
const moment = require('moment');
const options = [
  {
    unitType: 'Storage-Yield',
    unitList: [
      { abbvr: 'lb', unitType: 'Pounds', factor: null },
      { abbvr: 'kg', unitType: 'Kilograms', factor: 2.20462 },
      { abbvr: 't', unitType: 'Tonnes', factor: 2204.62 },
    ],
  },
];

module.exports = {
  up: async (queryInterface) => {
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
                factor: unitValue.factor,
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

  down: async (queryInterface) => {
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
