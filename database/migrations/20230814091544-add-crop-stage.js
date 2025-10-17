"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const growthData = [
      {
        name: "Cowpea",
        stages: ["Vegetative", "Flowering", "Pod development", "Maturity"],
      },
      {
        name: "Pea",
        stages: [
          "Germination stage",
          "Vegetative growth stage",
          "Inflorescence  stage",
          "Flowering stage",
          "Fruit Devlopment stage",
          "Ripening  stage",
          "Harvesting stage",
        ],
      },
      {
        name: "Rose",
        stages: [
          "Establishment stage",
          "Budding stage",
          "Flower initiation and blooming stage",
          "Harvesting stage",
        ],
      },
      {
        name: "Carrot",
        stages: [
          "Seed Germination",
          "Seedling",
          "Vegetative Growth",
          "Maturation",
          "Harvest",
        ],
      },
      {
        name: "Sweet Potato",
        stages: [
          "Establishment stage",
          "Storage root initiation stage",
          "Storage root bulking stage",
          "Harvest stage",
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

  async down(queryInterface, Sequelize) {},
};
