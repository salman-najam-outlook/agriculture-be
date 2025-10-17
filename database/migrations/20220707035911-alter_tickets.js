'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tickets', 'org_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'id',
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tickets', 'org_id');
  }
};
