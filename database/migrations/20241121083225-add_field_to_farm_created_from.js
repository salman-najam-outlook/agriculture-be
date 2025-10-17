'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_farms', 'farm_created_from', {
      type: Sequelize.ENUM,
      values:['mobile','admin','bulk_import','dds','other'],
      allowNull: true,
      comment: 'Where actually farm created from mobile,admin,dds,other',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_farms', 'farm_created_from');
  }
};
