'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query("UPDATE units_list SET factor = 3.785 WHERE abbvr ='g/ac';");
      await queryInterface.sequelize.query("UPDATE units_list SET factor = 1.532 WHERE abbvr ='g/hc';");
      await queryInterface.sequelize.query("UPDATE units_list SET factor = 0.404 WHERE abbvr ='l/hc';");
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
