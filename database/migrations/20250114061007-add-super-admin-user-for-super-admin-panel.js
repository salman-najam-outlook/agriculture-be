'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = {
      firstName: 'Maha',
      lastName: 'Admin',
      email: 'superadministrator@dimitra.io',
      organization: 3,
      farm_limit: 10,
      password: '$2b$06$PfyPWu89lQ0/fb933pFZuus3cS8C84IjVjXHOgfXvTOa8.peKZfH.',
      isLogin: 1,
      verified: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await queryInterface.sequelize.transaction(async (transaction) => {
      const [existingUser] = await queryInterface.sequelize.query(
        'SELECT id FROM users WHERE email = :email',
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { email: user.email },
          transaction
        }
      );

      if (existingUser) {
        await queryInterface.bulkUpdate(
          'users',
          {
            firstName: user.firstName,
            lastName: user.lastName,
            organization: user.organization,
            farm_limit: user.farm_limit,
            password: user.password,
            isLogin: user.isLogin,
            verified: user.verified,
            updatedAt: new Date()
          },
          { id: existingUser.id },
          { transaction }
        );
      } else {
        await queryInterface.bulkInsert('users', [user], { transaction });
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'superadministrator@dimitra.io' }, {});
  }
};