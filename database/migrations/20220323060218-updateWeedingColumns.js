'use strict';
const CHANGE_COLUMNS = ['herbicideRate', 'herbicideUsed', 'area'];
module.exports = {
  async up(queryInterface, Sequelize) {
    CHANGE_COLUMNS.forEach((column) => {
      queryInterface.changeColumn('weed', column, {
        type: Sequelize.DOUBLE,
        allowNull: column === 'area' ? false : true,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    CHANGE_COLUMNS.forEach((column) => {
      queryInterface.changeColumn('weed', column, {
        type: Sequelize.INTEGER,
        allowNull: column === 'area' ? false : true,
      });
    });
  },
};
