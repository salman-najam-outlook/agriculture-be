'use strict';

module.exports = {
  up: async (queryInterface) => {
    let names = [
      'Hand hoe', 'Ox drawn plough', 'Mould board plough', 'Ridge plough',
      'Harrow', 'Tractor', 'Drill', 'Ox drawn plough',
      'Subsoiler', 'Cultipacker', 'Chisel plow', 'Wheelbarrow', 'Rake', 'Slasher'
    ];
    let prepareNames = [];
    names.forEach(function(name){
      prepareNames.push({
        activity: 2,
        name: name,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    await queryInterface.bulkInsert('equipment_name', prepareNames);
    let enames = (await queryInterface.sequelize.query('select * from equipment_name where userId is null'))[0];
    let prepareEquipments = [];
    names.forEach((item) => {
      let name = enames.find((n)=>{
        return n.name == item;
      });
      prepareEquipments.push({
        equipmentName: name.id,
        isDefault: true, displayName: item, quantity: 1, createdAt: new Date(), updatedAt: new Date()
      });
    });
    return queryInterface.bulkInsert('equipment', prepareEquipments);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.bulkDelete('equipment', {
        userId: null
      }),
      queryInterface.bulkDelete('equipment_name', {
        userId: null
      })
    ]);
  }
};
