'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('roles', 'name')

    await queryInterface.addConstraint('roles', {
      fields: ['name', 'organization'],
      type: 'unique',
      name: 'name_organization_unique'
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('roles', 'name_organization_unique');
  }
};
