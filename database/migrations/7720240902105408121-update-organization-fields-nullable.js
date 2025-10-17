const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('organization', 'dimitraPointSystem', {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('organization', 'dimitraPointSystem', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    });
  },
};