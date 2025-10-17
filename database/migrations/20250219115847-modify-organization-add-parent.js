'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('organization','parentId',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "organization",
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('organization','isSubOrganization', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('organization','parentId');
    await queryInterface.removeColumn('organization','isSubOrganization');
  }
};
