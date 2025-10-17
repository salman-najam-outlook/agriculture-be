"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const growthData = [
      {
        "name": "Coffee",
        "stages": [
          "Leaf bud formation stage",
          "Flowwering stage",
          "Bean filling stage",
          "Maturity/harvesting stage",
          "Self pruning stage",
          "Vegetative stage"
        ]
      },
    ];

    for (const gwData of growthData) {
      let sql =
        "SELECT * FROM options WHERE groupName = :cropType AND name like :name";
      const options = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { cropType: "crop-type", name: "%" + gwData.name + "%" },
      });
      if (options.length > 0) {
        for (const option of options) {
          sql =
            "SELECT * FROM crop_observation_growth_stage WHERE cropType = :cropType";
          const crop_observation_growth_stage =
            await queryInterface.sequelize.query(sql, {
              type: Sequelize.QueryTypes.SELECT,
              replacements: { cropType: option.id },
            });
          if (crop_observation_growth_stage.length === 0) {
            for (const stage of gwData.stages) {
              console.log(stage, option.id)
              const newData = {
                name: stage.trim(),
                cropType: option.id,
              };
              await queryInterface.insert(
                null,
                "crop_observation_growth_stage",
                newData
              );
            }
          }
        }
      }
    }
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

