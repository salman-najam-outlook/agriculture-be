'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('document', 'isDefaultFolder', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('document', 'isDefaultFolder')
  }
};