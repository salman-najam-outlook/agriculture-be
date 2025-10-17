"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const pineappleSurinameId = await queryInterface.sequelize.query(
      "SELECT * FROM options where name = 'Pineapple (Suriname)'",
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );



    await queryInterface.bulkInsert(
      "crops",
      [
        {
          cropTypeOptId: pineappleSurinameId[0].id,
          name: "Want Rice",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: pineappleSurinameId[0].id,
          name: "Djogo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: pineappleSurinameId[0].id,
          name: "Red Round Ingi Pineapple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cropTypeOptId: pineappleSurinameId[0].id,
          name: "Elongated Ingi Pineapple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
