'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let groupName = 'certification';
      const certifications = [
        { groupName, name: 'Global G.A.P.', createdAt: new Date(), updatedAt: new Date() },
        { groupName, name: 'Rainforest Alliance', createdAt: new Date(), updatedAt: new Date() },
        { groupName, name: 'Fair Trade', createdAt: new Date(), updatedAt: new Date() },
        { groupName, name: 'Organic', createdAt: new Date(), updatedAt: new Date() },
        { groupName, name: "Woman's Hand", createdAt: new Date(), updatedAt: new Date() },
        { groupName, name: 'Carbon Neutral', createdAt: new Date(), updatedAt: new Date() },
      ];

      for (const certification of certifications) {
        const [existingCertification] = await queryInterface.sequelize.query(
          'SELECT * FROM options WHERE groupName = :groupName AND name = :name',
          {
            replacements: { groupName: certification.groupName, name: certification.name },
            type: Sequelize.QueryTypes.SELECT,
            transaction,
          }
        );

        if (existingCertification) {
          await queryInterface.bulkUpdate(
            'options',
            { updatedAt: new Date() },
            { id: existingCertification.id },
            { transaction }
          );
        } else {
          await queryInterface.bulkInsert('options', [certification], { transaction });
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
