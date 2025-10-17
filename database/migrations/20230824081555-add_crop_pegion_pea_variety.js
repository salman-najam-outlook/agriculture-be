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
      replacements: { name: "Pigeon pea (Peru)", groupName: 'crop-type'}
    });
    if(crop.length) {
      await queryInterface.bulkInsert(
        "crops",
        [
          {
            cropTypeOptId: crop[0].id,
            name: "SIPAN",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "PROMPEX2000",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "La Negra",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            cropTypeOptId: crop[0].id,
            name: "La Pacarana",
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
