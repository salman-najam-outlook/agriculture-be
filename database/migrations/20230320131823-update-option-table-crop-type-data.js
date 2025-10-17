"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const pattern = /\((.*?)\)/;
    let crops = await queryInterface.sequelize.query(
      'SELECT * FROM options WHERE groupName = "crop-type"', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });

    crops.forEach(async (item) => {
      const match = item.name.match(pattern);
      if (match) {
        const countryName = match[1];
        item.region = countryName;
      } else {
        item.region = "general";
      }

      await queryInterface.bulkUpdate("options", item, {
        id: item.id,
      });
    });
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
