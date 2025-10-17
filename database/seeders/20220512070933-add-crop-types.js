'use strict';
const groupName = 'crop-type';
const cropTypes = [
  'Sugarcane-India',
  'Sugarcane-Colombia',
  'Onion-India',
  'Potato-Nepal',
  'Potato-Bolivia',
  'Potato-Colombia',
  'Cardamom-Nepal',
  'Quinoa -Bolivia',
  'Corn-Uganda',
  'Soybean-Brazil',
  'Rice-Nepal',
  'Wheat-Lybia',
  'Safflower-India',
  'Coffee-Uganda',
  'Coffee-Indonesia',
  'Barley',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const set = cropTypes.map((name) => ({ name, groupName }));
      await queryInterface.bulkInsert('options', set, {});
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'options',
      { name: cropTypes, groupName },
      {}
    );
  },
};
