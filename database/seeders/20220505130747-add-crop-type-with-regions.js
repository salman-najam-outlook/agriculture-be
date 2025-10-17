'use strict';
const cropTypeWithRegionsData = [
 {
   name: "Onion-India",
   groupName:"crop-type"
 },
 {
  name:"Sugarcane-India",
  groupName:"crop-type"
 },
 {
  name:"Sugarcane-Colombia",
  groupName:"crop-type"
 },
 {
  name:"Potato-Nepal",
  groupName:"crop-type"
 },
 {
  name:"Potato-Bolivia",
  groupName:"crop-type"
 },
 {
  name:"Potato-Colombia",
  groupName:"crop-type"
 },
 {
  name:"Cardamom-Nepal",
  groupName:"crop-type"
 },
 {
  name:"Quinoa-Bolivia",
  groupName:"crop-type"
 }, 
 {
  name:"Corn-Uganda",
  groupName:"crop-type"
 },
 {
  name:"Soybean-Brazil",
  groupName:"crop-type"
 },
 {
  name:"Rice-Nepal",
  groupName:"crop-type"
 },
 {
  name:"Wheat-Lybia",
  groupName:"crop-type"
 },
 {
  name:"Safflawer-India",
  groupName:"crop-type"
 },
 {
  name:"Coffee-Uganda",
  groupName:"crop-type"
 },
 {
  name:"Coffee-Indonesia",
  groupName:"crop-type"
 },
 {
  name:"Barley-India",
  groupName:"crop-type"
 },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const set = cropTypeWithRegionsData.map((data) => {
      return { name:data.name,groupName:data.groupName};
    });
    await queryInterface.bulkInsert('options', set, {});
  },

  down: async (queryInterface, Sequelize)=>{
    await Promise.all(    
    cropTypeWithRegionsData.map(async (option) => {
      let cropId = await queryInterface.rawSelect(
        'options',
        {
          where: {
            name: option.name,
          },
        },
        ['id']
      );
      await queryInterface.bulkDelete(
        'options',
        { id: cropId },
        {}
      );
    })
    );
  }
};
