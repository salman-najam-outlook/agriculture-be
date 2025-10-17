'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_membership', 'plan_type', {
      type: Sequelize.ENUM(["enterprise", "global"]),
      allowNull: false,
      defaultVlue: "enterprise"
    });


  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_membership', 'user_role_id');
    await queryInterface.removeColumn('user_membership', 'org_id');
  }
};
