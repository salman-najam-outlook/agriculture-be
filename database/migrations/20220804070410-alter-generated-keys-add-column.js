'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
     await queryInterface.addColumn('generated_keys', 'org_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
     await queryInterface.removeColumn('generated_keys', 'org_id');

  }
};
