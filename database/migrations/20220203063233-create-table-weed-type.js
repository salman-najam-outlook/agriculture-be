'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weed_type',
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
          allowNull: true,
          type: Sequelize.INTEGER,
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
      return queryInterface.bulkInsert('weed_type', [
        {name: 'Spear grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Star grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Siam weed', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Nutgrass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Milk weed', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Witch weed', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Couch grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Dayflower', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Bahama grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'African feather grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Elephant grass', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Wild sunflower', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Carpet grass', createdAt: new Date(), updatedAt: new Date()}
      ]);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('weed_type');
  },
};
