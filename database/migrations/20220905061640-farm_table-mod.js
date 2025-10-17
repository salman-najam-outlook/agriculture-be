'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Promise.all([
        // drop downs start
        queryInterface.addColumn('user_farms', 'farmType', {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
        }),
        queryInterface.addColumn('user_farms', 'productionSystem', {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
        }),
        queryInterface.addColumn('user_farms', 'farmOwner', {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
        }),
        // drop downs ends
        queryInterface.addColumn('user_farms', 'country', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'state', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'city', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'govRegistrationNum', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'contractMating', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'cooperativeId', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'licenceNum', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'licenceExpiryDate', {
          type: Sequelize.DATEONLY,
        }),
        queryInterface.addColumn('user_farms', 'regulatorName', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'regulatorRepresentiveName', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'houseNum', {
          type: Sequelize.STRING,
        }),
        queryInterface.addColumn('user_farms', 'street', {
          type: Sequelize.STRING,
        }),
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await Promise.all([
        queryInterface.removeColumn('user_farms', 'farmType'),
        queryInterface.removeColumn('user_farms', 'productionSystem'),
        queryInterface.removeColumn('user_farms', 'farmOwner'),
        queryInterface.removeColumn('user_farms', 'country'),
        queryInterface.removeColumn('user_farms', 'state'),
        queryInterface.removeColumn('user_farms', 'city'),
        queryInterface.removeColumn('user_farms', 'govRegistrationNum'),
        queryInterface.removeColumn('user_farms', 'contractMating'),
        queryInterface.removeColumn('user_farms', 'cooperativeId'),
        queryInterface.removeColumn('user_farms', 'licenceNum'),
        queryInterface.removeColumn('user_farms', 'licenceExpiryDate'),
        queryInterface.removeColumn('user_farms', 'regulatorName'),
        queryInterface.removeColumn('user_farms', 'houseNum'),
        queryInterface.removeColumn('user_farms', 'street'),
        queryInterface.removeColumn('user_farms', 'regulatorRepresentiveName'),
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
