'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        unitType: 3,
        units: [
          {
            name: "Liter-Per-Hectar",
            factor: "0.1"
          }
        ]
      },
      {
        unitType: 4,
        units: [
          {
            name: "Kilogram per Hectare",
            factor: "0.247105"
          },
          {
            name: "Tonnes per Hectare",
            factor: "4.04686"
          },
          {
            name: "Tonnes per Acre",
            factor: "0.000404686"
          },
        ]
      },
      {
        unitType: 11,
        units: [
          {
            name: "Tonnes",
            factor: "0.001"
          }
        ]
      },
      {
        unitType: 12,
        units: [
          {
            name: "Kilogram per Hectare",
            factor: "0.247105"
          },
          {
            name: "Tonnes per Acre",
            factor: "0.000404686"
          },
          {
            name: "Tonnes per Hectare",
            factor: "4.04686"
          }
        ]
      },
      {
        unitType: 13,
        units: [
          {
            name: "Litres/hectare",
            factor: "0.001"
          },
          {
            name: "Ounces/hectare",
            factor: "0.00003527396"
          },
          {
            name: "g/hectare",
            factor: "0.000001"
          },
          {
            name: "kg/hectare",
            factor: "0.000001"
          },
        ]
      },
      {
        unitType: 14,
        units: [
          {
            name: "Litres",
            factor: "0.001"
          },
          {
            name: "Ounces",
            factor: "0.00003527396"
          },
          {
            name: "kg",
            factor: "0.000001"
          },
          {
            name: "g",
            factor: "0.000001"
          }
        ]
      },
      {
        unitType: 47,
        units: [
          {
            name: "kg/cm3",
            factor: "0.000001"
          }
        ]
      }
    ]
    for( const row of data ) {
      for( const unit of row.units) {
        let sql = 'SELECT * FROM units_list WHERE unitType = :unitType and name = :unitName';
        const unitLists = await queryInterface.sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { unitType: row.unitType, unitName: unit.name}
        });
        if(unitLists && unitLists.length > 0) {
          const item = {factor: unit.factor, updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss")};
          await queryInterface.bulkUpdate('units_list', item, { id: unitLists[0].id });
          console.log(`${unit.name}, id: ${unitLists[0].id} updated`);
        }
      }
    }

    const nullableItems = [
      {
        unitType: 3,
        name: "Milliliters per Square Meter"
      },
      {
        unitType: 12,
        name: "Kilogram per Acre"
      },
    ]

    for (const row of nullableItems) {
      const item = {factor: null, updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss")};
      await queryInterface.bulkUpdate('units_list', item, { unitType: row.unitType, name: row.name });
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
