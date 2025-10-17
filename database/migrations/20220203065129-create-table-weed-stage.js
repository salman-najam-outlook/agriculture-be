'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weed_stage',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['name', 'userId'],
          },
        },
      }
    ).then(()=>{
      return queryInterface.bulkInsert('weed_stage', [
        {name: 'Pre-emergence', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Post emergence', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Pre-planting/land preparation', createdAt: new Date(), updatedAt: new Date()},
        {name: 'At top dressing', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Flowering', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Days after sowing', createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('weed_stage');
  },
};
