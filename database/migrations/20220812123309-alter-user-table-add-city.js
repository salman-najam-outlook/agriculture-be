'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     */
    await queryInterface.addColumn('users', 'city', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "stateId"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     */
     await queryInterface.addColumn('users', 'city')
  }
};
