'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE disease_control_types SET hasOptions = 1 WHERE name = 'Chemical / Biological'`,
    );
    await queryInterface.createTable('disease_control_type_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      diseaseControlTypeId: {
        allowNull: false,
        references: {
          model: 'disease_control_types',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    }).then(() => {
      return queryInterface.bulkInsert('disease_control_type_options', [
        { name: 'Synthetic', diseaseControlTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Biological', diseaseControlTypeId: 2, createdAt: new Date(), updatedAt: new Date() },

      ]);
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('disease_control_type_options');
  },
};
