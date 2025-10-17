('use strict');
const moment = require('moment');
const options = [
  {
    unitType: 'PotassiumUnit',
    unitList: [
      { abbvr: 'mg/l', unitType: 'mg/l', factor: null },
      { abbvr: 'kg/ha', unitType: 'kg/ha', factor: 2 },
      { abbvr: 'ppm', unitType: 'ppm', factor: 1.001142303 },
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
