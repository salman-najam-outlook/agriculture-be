'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("disease_control_types", "hasOptions", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.sequelize.query(
      `UPDATE disease_control_types SET name = 'Cultural / Manual' WHERE name = 'Cultural/Mechanical/Biological'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE disease_control_types SET name = 'Chemical / Biological' WHERE name = 'Chemical'`,
    );
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "disease_control_types",
      "hasOptions"
    );

    await queryInterface.sequelize.query(
      `UPDATE disease_control_types SET name = 'Cultural/Mechanical/Biological' WHERE name = 'Cultural / Manual'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE disease_control_types SET name = 'Chemical' WHERE name = 'Chemical / Biological'`,
    );
  },
};
