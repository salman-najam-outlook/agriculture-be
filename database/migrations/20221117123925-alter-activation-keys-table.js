'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('activation_key', 'qrCodeUrl', {
      type: Sequelize.STRING,
      after: "license_key",
      allowNull: true
    });
    await queryInterface.addColumn('activation_key', 'qrCodeS3Key', {
      type: Sequelize.STRING,
      after: "qrCodeUrl",
      allowNull: true
    });
    await queryInterface.addColumn('activation_key', 'qrCodeName', {
      type: Sequelize.STRING,
      after: "qrCodeS3Key",
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('activation_key', 'qrCodeUrl');
    await queryInterface.removeColumn('activation_key', 'qrCodeS3Key');
    await queryInterface.removeColumn('activation_key', 'qrCodeName');
  },
};
