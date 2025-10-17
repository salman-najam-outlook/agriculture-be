('use strict');

const moment = require('moment');
const options = {
  unitType: 'Weight-Area',
  unitList: [{ abbvr: 'Kilogram/Tree', unitType: 'Kilogram/Tree' }],
};

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const unitType = await queryInterface.sequelize.query(`SELECT id FROM dbdimitra.unit_types where name = '${options.unitType}'`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    await Promise.all(
      options.unitList.map(async (unitValue) => {
        let data2 = [
          {
            name: unitValue.unitType,
            abbvr: unitValue.abbvr,
            unitType: unitType[0].id,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          },
        ];
        await queryInterface.bulkInsert('units_list', data2, {});
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
