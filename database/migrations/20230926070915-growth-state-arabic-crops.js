"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const growthData = [
      {
        name: "Papaya",
        stages: [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ],
      },
      {
        name: "Potato",
        stages: [
          "Emergence stage",
          "Stolon formation stage",
          "Tuber formation stage",
          "Tuber developement stage",
          "Tuber development stage",
          "Harvest stage",
        ],
      },
      {
        name: "Olive",
        stages: [
          "Sprouting, emergence of the bud",
          "Flowering",
          "Fruit formation",
          "Fruit development",
          "Maturation",
          "Harvesting",
        ],
      },
      {
        name: "Date palm",
        stages: [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ],
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
              console.log(stage, option.id);
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
