'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_membership', 'user_role_id', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'user_role',
        key: 'id',
      },
    });
    await queryInterface.addColumn('user_membership', 'org_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id',
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_membership', 'user_role_id');
    await queryInterface.removeColumn('user_membership', 'org_id');
  }
};
