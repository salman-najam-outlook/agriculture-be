'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'userTribe', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'facilityPicUrl', {
      type: Sequelize.STRING(500),
    });
    await queryInterface.addColumn('users', 'facilityPicS3Key', {
      type: Sequelize.STRING(500),
    });
    await queryInterface.addColumn('users', 'facilityPicName', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('users', 'userTribe');
     await queryInterface.removeColumn('users', 'facilityPicUrl');
     await queryInterface.removeColumn('users', 'facilityPicS3Key');
     await queryInterface.removeColumn('users', 'facilityPicName');
  }
};
