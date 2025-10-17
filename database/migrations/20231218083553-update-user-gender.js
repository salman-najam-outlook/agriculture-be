'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("UPDATE users SET gender = 'male' where gender like 'Masculino';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'female' where gender like 'Femenino';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'male' where gender like 'Male';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'female' where gender like 'Female';");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("UPDATE users SET gender = 'Masculino' where gender like 'male';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'Femenino' where gender like 'female';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'Male' where gender like 'male';");
    await queryInterface.sequelize.query("UPDATE users SET gender = 'Female' where gender like 'female';");
  }
};
