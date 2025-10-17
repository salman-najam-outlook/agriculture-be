'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    let existingTemperatureUnit = null;
    const units = [
      {
        name: "Fahrenheit",
        abbvr: "°F",
        unitType: null,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: "Celsius",
        abbvr: "°C",
        unitType: null,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: "Kelvin",
        abbvr: "K",
        unitType: null,
        createdAt: new Date(), updatedAt: new Date()
      },
    ];

    existingTemperatureUnit = await queryInterface.sequelize.query(
      'SELECT * FROM unit_types where name = "Temperature"', {
      type: queryInterface.sequelize.QueryTypes.SELECT,
      plain: true
    });

    if (existingTemperatureUnit) {

      for (let i = 0; i < units.length; i++) {
        const element = units[i];

        const unitExists = await queryInterface.sequelize.query(
          'SELECT * FROM units_list where name = :name', {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          plain: true,
          replacements: { name: element.name }
        });

        if (!unitExists) {
          await queryInterface.bulkInsert('units_list', [
            {
              ...element,
              unitType: existingTemperatureUnit.id,
            }
          ])
        }
      }

    } else {
      const temp = await queryInterface.bulkInsert('unit_types', [
        {
          name: "Temperature",
          createdAt: new Date(), updatedAt: new Date()
        }
      ])
      await queryInterface.bulkInsert('units_list', units.map(u => { return { ...u, unitType: temp } }))
    }
  },

  async down(queryInterface, Sequelize) {
  },
};
