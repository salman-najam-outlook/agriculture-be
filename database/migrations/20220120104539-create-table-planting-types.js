'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('planting_types', {
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
    }).then(()=>{
      return queryInterface.bulkInsert('planting_types', [
        {name: 'Seeds', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Cuttings', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Graft', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Tissue culture', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Division/sets', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Budding', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Seed tubers', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Corms', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Suckers', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Crown', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Slips', createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('planting_types');
  }
};
