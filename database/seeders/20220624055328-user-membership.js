'use strict';
const moment = require('moment');

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('user_membership', [
      {
        membership_type: 'coffee farmer',
        membership_duration: 4,
        membership_duration_unit: 'year(s)',
        membership_fee: 2999,
        default_status: 1,
        createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'user_membership',
      { membership_type: 'coffee farmer' },
      {}
    );
  },
};
