'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soil_prep_activity',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }
    ).then(()=>{
      return queryInterface.bulkInsert('soil_prep_activity', [
        {name: 'Clearing of land', createdAt: new Date(), updatedAt: new Date()},
        {name: 'First ploughing', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Harrowing', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Levelling', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Flooding', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Burning', createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('soil_prep_activity');
  }
};
