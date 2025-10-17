'use strict';

const saveMap = [
  {
    moduleId: 'soilpreparation',
    attributeNum: 'm1ma1',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('app_user_module_recomm_maps', saveMap, {
        updateOnDuplicate: ['attributeNum'],
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
