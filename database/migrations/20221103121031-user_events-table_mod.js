'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('user_events', 'moduleId', {
        type: Sequelize.STRING,
      });
      await queryInterface.addConstraint('user_events', {
        fields: ['moduleId'],
        type: 'foreign key',
        references: {
          table: 'parent_modules',
          field: 'id',
        },
      });
      await queryInterface.changeColumn('user_events', 'subModuleId', {
        type: Sequelize.STRING,
      });
      await queryInterface.addConstraint('user_events', {
        fields: ['subModuleId'],
        type: 'foreign key',
        references: {
          table: 'modules',
          field: 'id',
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
