'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('fertilizer_input_type', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    }).then(()=>{
      return queryInterface.bulkInsert('fertilizer_input_type', [
        {name: 'Organic', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Synthetic', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Soil', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Foliar Fertilization', createdAt: new Date(), updatedAt: new Date()},
      ]);
    });;
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('fertilizer_input_type');
  }
};
