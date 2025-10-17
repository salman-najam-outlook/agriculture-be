'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('PestImages', 'cropTypeId', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'options',
        key: 'id',
      },
    });
    await queryInterface.addColumn('PestImages', 'fileId', {
      type: Sequelize.STRING(350),
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('PestImages', 'cropTypeId');
    await queryInterface.removeColumn('PestImages', 'fileId');
  },
};
