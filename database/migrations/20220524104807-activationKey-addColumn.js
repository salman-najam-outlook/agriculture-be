'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('activation_key', 'membershipValidity', {
      type: Sequelize.DATE,
      comment: 'expiry date of the membership',
    });

    await queryInterface.addColumn('activation_key', 'membershipExtendedDays', {
      type: Sequelize.INTEGER,
      comment: 'number of membership extension days',
    });

    await queryInterface.addColumn(
      'activation_key',
      'membershipExtensionReason',
      {
        type: Sequelize.TEXT,
        comment: 'reason for membership extension',
      }
    );

    await queryInterface.addColumn('activation_key', 'membershipExtendedBy', {
      type: Sequelize.INTEGER,
      comment: 'userId of admin who updated membership',
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'activation_key',
      'membershipExtendedDays'
    );
    await queryInterface.removeColumn(
      'activation_key',
      'membershipExtensionReason'
    );
    await queryInterface.removeColumn('activation_key', 'membershipExtendedBy');
    await queryInterface.removeColumn('activation_key', 'membershipValidity');
  },
};
