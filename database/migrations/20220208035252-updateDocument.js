'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('document', {
      type: 'foreign key',
      fields: ['parentId'],
      name: 'document_parentId_fkey',
      references: {
        table: 'document',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('document', 'document_parentId_fkey');
  },
};
