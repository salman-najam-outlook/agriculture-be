'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('DiseaseImages', 'cropTypeId', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'options',
        key: 'id',
      },
    });
    await queryInterface.addColumn('DiseaseImages', 'fileId', {
      type: Sequelize.STRING(350),
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DiseaseImages', 'cropTypeId');
    await queryInterface.removeColumn('DiseaseImages', 'fileId');
  },
};
