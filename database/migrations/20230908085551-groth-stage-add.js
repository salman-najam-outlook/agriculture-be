"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const growthData = [
      {
        name: "Green gram",
        stages: [
          "Emergence stage",
          "Initial Growth",
          "Casing Split and Root Growth",
          "Leaf Growth",
          "Flowering",
          "Pod filling",
          "Maturity",
        ],
      },
      {
        name: "Pineapple",
        stages: [
          "Bud Emergence",
          "Flower Induction",
          "Vegetative growth stage",
          "Reproductive Growth stage",
          "HARVESTING",
        ],
      },
      {
        name: "Cocoa",
        stages: [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Vegetative phase",
        ],
      },
    ];
    for (const gwData of growthData) {
      let sql =
        "SELECT * FROM options WHERE groupName = :cropType AND name like :name";
      const options = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { cropType: "crop-type", name: gwData.name + "%" },
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
