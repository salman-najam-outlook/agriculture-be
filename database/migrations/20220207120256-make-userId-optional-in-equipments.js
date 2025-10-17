'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('equipment', 'isDefault', {
      type: Sequelize.BOOLEAN,
      defaulVaule: false
    });

    await queryInterface.changeColumn('equipment_name', 'userID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaulVaule: null
    });

    await queryInterface.changeColumn('equipment', 'userID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaulVaule: null
    });
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('equipment', 'isDefault'),
      queryInterface.changeColumn('equipment_name', 'userID', {
        type: Sequelize.INTEGER,
        allowNull: false
      }),
      queryInterface.changeColumn('equipment', 'userID', {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ]);
  },
};
