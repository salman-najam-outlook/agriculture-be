'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("carbon_credit_projects", "dimitra_office_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'dimitra_offices',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropColumn('carbon_credit_projects', 'dimitra_office_id');
  },
};