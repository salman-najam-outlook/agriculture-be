("use strict");

const moment = require("moment");
const options = {
  unitType: "Area",
  unitList: [{ abbvr: "mz", name: "Manzana", factor: 1.72974 }],
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
