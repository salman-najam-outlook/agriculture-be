'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("pest_infestation_symptoms", "pestTypeId", {
      after: "id",
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "pest_types",
        key: "id",
      },
    });
    await queryInterface.addColumn("pest_infestation_symptoms", "userId", {
      after: "name",
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("pest_management_infestation_symptoms","pestTypeId")
    await queryInterface.removeColumn("pest_management_infestation_symptoms","userId")
  }
};
