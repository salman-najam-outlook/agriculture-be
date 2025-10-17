'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let membershipDetail = {
        membership_type: 'Farmer and coffee farmer',
        satellite_report: 5000,
        advanced_report: 5000,
        membership_duration: 5000,
        membership_duration_unit: 'day(s)',
        membership_duration_in_days: 5000,
        membership_fee: 10,
        default_status: 0,
        description: 'Membership with only farmer and coffee farmer role',
        org_id: null,
        plan_type: 'enterprise',
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      }
    let user_role = [
      {
        membership_id: null,
        user_role_id: 'coffee_farmer',
        isDeleted: false,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        membership_id: null,
        user_role_id: 'farmer',
        isDeleted: false,
        createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
      }
    ]
    let organizations = await queryInterface.sequelize.query('select * from organization', { type: Sequelize.QueryTypes.SELECT });
    organizations.forEach(async (element) => {
      let membershipLocal = { ...membershipDetail }
      membershipLocal.org_id = element.id;
      const membership = await queryInterface.insert(null, 'user_membership', membershipLocal);
      user_role.forEach(async (role) => {
        let localRole = { ...role };
        localRole.membership_id = membership[0];
        await queryInterface.insert(null, 'user_role_membership_map', localRole)
      })
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
