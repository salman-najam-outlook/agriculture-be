'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weed_methods',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        parentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'weed_methods',
            key: 'id',
          },
        },
        name: {
          type: Sequelize.STRING,
        },
        isDefault: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
      return queryInterface.bulkInsert('weed_methods', [
        { id: 1, name: 'Cultural / Manual / Mechanical', isDefault: true, createdAt: new Date(), updatedAt: new Date() },
        {id: 2, name: 'Chemical', isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Hand pulling', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Hoeing', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Mowing/ploughing', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Smother/mulching', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'High temperatures/plastic cover', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Burning', parentId: 1, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Broadcast banding', parentId: 2, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Spraying', parentId: 2, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Spot application', parentId: 2, isDefault: true, createdAt: new Date(), updatedAt: new Date()},
        {name: 'Aerial application', parentId: 2, isDefault: true, createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('weed_methods');
  },
};
