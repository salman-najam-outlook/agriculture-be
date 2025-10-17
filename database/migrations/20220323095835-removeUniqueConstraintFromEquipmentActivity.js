'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeConstraint('equipment_activity', 'name');
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addConstraint('equipment_activity', {
      type: 'UNIQUE',
      fields: ['name'],
      name: 'name',
    });
  },
};
