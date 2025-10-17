'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('users', 'permissionToContact', {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      });
      await queryInterface.addColumn('users', 'preRegistrationStatus', {
        type: Sequelize.ENUM('inprogress', 'complete'),
        defaultValue: null,
      });
      await queryInterface.addColumn('users', 'preRegistrationToken', {
        type: Sequelize.STRING(100),
        unique: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('users', 'permissionToContact');
      await queryInterface.removeColumn('users', 'preRegistrationStatus');
      await queryInterface.removeColumn('users', 'preRegistrationToken');
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
