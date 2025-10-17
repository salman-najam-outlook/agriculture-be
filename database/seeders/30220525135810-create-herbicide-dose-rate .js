'use strict';
const moment = require('moment');
const unitsArr = [
  {name: 'Litres/hectare', abbvr: 'L/hectare'},
  {name: 'Ounces/hectare', abbvr: 'Oz/hectare'},
  {name: 'mg/hectare', abbvr: 'mg/hectare'},
  {name: 'g/hectare', abbvr: 'g/hectare'},
  {name: 'kg/hectare', abbvr: 'kg/hectare'},
]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.sequelize.query("UPDATE units_list SET name = 'Litres/hectare', abbvr = 'L/hectare' WHERE abbvr ='mg/L/acre';");
    await queryInterface.sequelize.query("UPDATE units_list SET name = 'Ounces/hectare', abbvr = 'Oz/hectare'  WHERE abbvr ='mg/L/hectare';");
    await queryInterface.sequelize.query("UPDATE units_list SET name = 'mg/hectare', abbvr = 'mg/hectare'  WHERE abbvr ='ml/L/acre';");
    await queryInterface.sequelize.query("UPDATE units_list SET name = 'g/hectare', abbvr = 'g/hectare'  WHERE abbvr ='ml/L/hectare';");

    
   await queryInterface.bulkInsert('units_list', [
    {
      name: 'kg/hectare',
      abbvr: 'kg/hectare',
      unitType: 13,
      createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    }
   ]
   );
  },

  async down(queryInterface, Sequelize) {

  },
};
