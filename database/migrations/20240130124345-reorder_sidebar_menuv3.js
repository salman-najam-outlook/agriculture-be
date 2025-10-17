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

    try {
      let organizations = await queryInterface.sequelize.query(
        "select distinct organization from sidebar_menu;",
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );
      for (let org of organizations) {
        let organization = org.organization
        const sqlStatements = [
          "UPDATE sidebar_menu SET  `order` = 2 WHERE id = 'crops_overview' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET  `order` = 3 WHERE id = 'cacao' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET  `order` = 4 WHERE id = 'farm_management' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET  `order` = 5 WHERE id = 'survey_builder' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET  `order` = 6 WHERE id = 'deforestation' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET  `order` = 7 WHERE id = 'user_management' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `parent_menu_id`='user_management',  `order` = 5 WHERE id = 'role_requests' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 8 WHERE id = 'faq' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 9 WHERE id = 'tickets' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 10 WHERE id = 'activity_log' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 11 WHERE id = 'users/profiles' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 12 WHERE id = 'member_data' AND `organization` =" + organization + ";",
          "UPDATE sidebar_menu SET `order` = 13 WHERE id = 'admin_roles' AND `organization` =" + organization + ";",
        ];
        for (let qr of sqlStatements) {
          await queryInterface.sequelize.query(qr, { transaction })
        }
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback()
      console.error(err);
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
