'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("options", [
      {
        groupName: 'crop-season',
        name: 'summer',
      },
      {
        groupName: 'crop-season',
        name: 'autumn',
      },
    ]);

    await queryInterface.sequelize.query(`UPDATE options SET name = "rainy/wet season" WHERE name="long rains" AND groupName="crop-season"`);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
