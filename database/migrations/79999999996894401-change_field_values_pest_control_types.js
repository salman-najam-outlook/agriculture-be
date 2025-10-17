'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pest_control_types", "hasOptions", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.sequelize.query(
      `UPDATE pest_control_types SET name = 'Cultural / Manual' WHERE name = 'Cultural/Natural'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE pest_control_types SET name = 'Chemical / Biological' WHERE name = 'Chemical'`,
    );
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "pest_control_types",
      "hasOptions"
    );

    await queryInterface.sequelize.query(
      `UPDATE pest_control_types SET name = 'Cultural/Natural' WHERE name = 'Cultural / Manual'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE pest_control_types SET name = 'Chemical' WHERE name = 'Chemical / Biological'`,
    );
  },
};
