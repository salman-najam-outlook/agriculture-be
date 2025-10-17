'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'irrigation',
      'waterSource'
    );

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'irrigation',
      'waterSource',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    );
  }
};
