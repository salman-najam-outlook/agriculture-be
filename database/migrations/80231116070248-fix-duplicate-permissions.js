'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
        DELETE FROM user_role_membership_module_permission
        WHERE id IN (
          SELECT id FROM (
            SELECT id
              FROM
              user_role_membership_module_permission urmmp
            WHERE
              urmmp.id = CONCAT_WS('_', urmmp.user_role_id, urmmp.membership_plan_id, urmmp.module_id, urmmp.permission_id)
              AND EXISTS (
                SELECT
                  id
                FROM
                  user_role_membership_module_permission urmmp2
                WHERE
                  urmmp2.user_role_id = urmmp.user_role_id
                  and urmmp2.module_id = urmmp.module_id
                  and urmmp2.permission_id = urmmp.permission_id
                  and urmmp2.membership_plan_id = urmmp.membership_plan_id
                  and urmmp2.id != urmmp.id
              )
          ) AS ids
        );
      `,
        { transaction }
      );

      await queryInterface.bulkUpdate(
        'user_role_membership_module_permission',
        {
          id: queryInterface.sequelize.fn(
            'CONCAT_WS',
            '_',
            queryInterface.sequelize.col('user_role_id'),
            queryInterface.sequelize.col('membership_plan_id'),
            queryInterface.sequelize.col('module_id'),
            queryInterface.sequelize.col('permission_id')
          ),
        },
        {
          id: {
            [Sequelize.Op.ne]: queryInterface.sequelize.fn(
              'CONCAT_WS',
              '_',
              queryInterface.sequelize.col('user_role_id'),
              queryInterface.sequelize.col('membership_plan_id'),
              queryInterface.sequelize.col('module_id'),
              queryInterface.sequelize.col('permission_id')
            ),
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {},
};
