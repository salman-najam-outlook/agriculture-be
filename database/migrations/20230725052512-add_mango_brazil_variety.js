'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const sql = 'SELECT * FROM options WHERE name = :name AND groupName = :groupName';
    const crop = await queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { name: "Mango (Brazil)", groupName: 'crop-type'}
    });
    if(crop.length) {
      await queryInterface.bulkInsert(
        "crops",
        [
          {
            cropTypeOptId: crop[0].id,
            name: "Bourbon",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "Coquinho",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "Haden",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "Van Dike",
            createdAt: new Date(),
            updatedAt: new Date(),
          },

        ],
        {}
      );
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
