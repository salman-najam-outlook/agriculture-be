'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weed',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cropVarietyId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'crop_variety', key: 'id' },
          onDelete: 'CASCADE'
        },
        weedTypeId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'weed_type', key: 'id' },
          onDelete: 'CASCADE'
        },
        date: {
          allowNull: false,
          type: Sequelize.DATE
        },
        weedStageId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'weed_stage', key: 'id' },
          onDelete: 'CASCADE'
        },
        weedingDays: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        weedMethodId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'weed_methods', key: 'id' },
          onDelete: 'CASCADE'
        },
        herbicideType: {
          allowNull: true,
          type: Sequelize.STRING
        },
        herbicideUsed: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        herbicideUsedUnitId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { as: 'herbicideunit', model: 'units', key: 'id' },
          onDelete: 'CASCADE'
        },
        herbicideRate: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        herbicideRateUnitId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { as: 'herbiciderateunit', model: 'units', key: 'id' },
          onDelete: 'CASCADE'
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
      }
    ).then(function(){
      return queryInterface.bulkInsert('units', [
        { country_id: 1, field: 'mg/L/acre', unit_category_id: 1, unit_subCategory_id: 8, abbreviation: 'mg/L/acre', createdAt: new Date(), updatedAt: new Date() }
      ]);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('weed');
  },
};
