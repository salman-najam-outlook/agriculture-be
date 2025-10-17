'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.changeColumn(
          'equipment',
          'fuelType',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          'equipment',
          'loanStatus',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.changeColumn(
          'equipment',
          'equipmentType',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          { transaction }
        ),
        queryInterface.addConstraint(
          'equipment',
          {
            fields: ['fuelType'],
            type: 'foreign key',
            name: 'fuelTypeFK',
            references: {
              table: 'options',
              field: 'id',
            },
          },
          { transaction }
        ),
        queryInterface.addConstraint(
          'equipment',
          {
            fields: ['loanStatus'],
            type: 'foreign key',
            name: 'loanStatusFK',
            references: {
              table: 'options',
              field: 'id',
            },
          },
          { transaction }
        ),
        queryInterface.addConstraint(
          'equipment',
          {
            fields: ['equipmentType'],
            type: 'foreign key',
            name: 'equipmentTypeFK',
            references: {
              table: 'options',
              field: 'id',
            },
          },
          { transaction }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {},
};
