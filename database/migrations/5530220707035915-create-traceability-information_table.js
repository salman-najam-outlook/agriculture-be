'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('traceability_informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      startDateTime: {
        type: Sequelize.DATE,
      },
      endDateTime: {
        type: Sequelize.DATE,
      },

      farmAndZone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('traceability_informations');
  },
};
