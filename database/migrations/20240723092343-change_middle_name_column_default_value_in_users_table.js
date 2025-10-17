'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Change the default value of the column to ''
      await queryInterface.changeColumn(
        'users',
        'middleName',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: '',
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {

  }
};
