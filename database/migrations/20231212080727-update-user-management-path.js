'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    //const organization = 8
    try {
      let organizations = await queryInterface.sequelize.query(
        "select distinct organization from sidebar_menu;",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      for (let org of organizations) {
        await queryInterface.sequelize.query(
          `UPDATE sidebar_menu set route_path_name = 'UserManagement' WHERE organization = ${org.organization} and id = 'user_management';`,
          {
            type: queryInterface.sequelize.QueryTypes.UPDATE,
          }
        );
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback()
      console.error(err);
      throw err
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};