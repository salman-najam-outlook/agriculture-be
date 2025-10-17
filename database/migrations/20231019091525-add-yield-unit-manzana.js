("use strict");

const moment = require("moment");
const options = {
  unitType: "harvesting-yield-household-consumption",
  unitList: [
    { name: "Kilogram per Manzana", abbvr: "kg/mz", factor: 1.72974 },
    {
      name: "Tonne per Manzana",
      abbvr: "Tonne per Manzana",
      factor: 0.00172974,
    },
    {
      name: "Bushels per Manzana",
      abbvr: "Bushels per Manzana",
      factor: 0.0635,
    },
  ],
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const unitType = await queryInterface.sequelize.query(
      `SELECT id FROM dbdimitra.unit_types where name = '${options.unitType}'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    await Promise.all(
      options.unitList.map(async (unitValue) => {
        let data2 = [
          {
            name: unitValue.name,
            abbvr: unitValue.abbvr,
            unitType: unitType[0].id,
            factor: unitValue.factor,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ];
        await queryInterface.bulkInsert("units_list", data2, {});
      })
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
