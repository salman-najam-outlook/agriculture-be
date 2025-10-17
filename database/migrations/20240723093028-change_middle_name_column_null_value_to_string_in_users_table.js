'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Update existing null values to ''
      await queryInterface.sequelize.query(
        `UPDATE \`users\` SET \`middleName\` = '' WHERE \`middleName\` IS NULL;`,
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
