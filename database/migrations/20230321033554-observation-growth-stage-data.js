'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const growthData = [
      {
        "name": "Maize",
        "stages": [
          "Stage 0 (Pre-emergence)",
          "Stage 1 (Emerged)",
          "Stage 2 (cob development)",
          "Stage 3 (vegetative growth, pre-flowering)",
          "Stage 4 (flowering- pollination)",
          "Stage 5 (kernel development)",
          "Stage 6 (grain filling)",
          "Stage 7 (maturity)",
          "Stage 8 (Harvest)"
        ]
      },
      {
        "name": "Potato",
        "stages": [
          "Emergence stage",
          "Stolon formation stage",
          "Tuber formation stage",
          "Tuber developement stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Quinoa",
        "stages": [
          "Emergence stage",
          "Vegetative stage",
          "Flowering stage",
          "Fruit development stage",
          "Ripening stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Cassava",
        "stages": [
          "Crop establishment stage",
          "Vegetative stage",
          "Tuber formation stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Timothy",
        "stages": [
          "Emergence stage",
          "Early vegetative stage",
          "Active tillering stage",
          "Half bloom stage - 1 st cut",
          "Regrowth period",
          "2nd cut of timothy grass"
        ]
      },
      {
        "name": "Rhodes",
        "stages": [
          "Emergence stage",
          "Early vegetative stage",
          "Active tillering stage",
          "Growth stage",
          "Harvesting stage - 1 st cut",
          "Regrowth period",
          "2nd cut of rhodes grass"
        ]
      },
      {
        "name": "Rapeseed",
        "stages": [
          "Emergence stage",
          "Leaf Development",
          "Rosette stage",
          "Inflorescence emergence",
          "Flowering stage:",
          "Siliqua stage",
          "Ripening phase",
          "Harvesting phase"
        ]
      },
      {
        "name": "Green gram",
        "stages": [
          "Emergence stage",
          "Initial Growth",
          "Casing Split and Root Growth",
          "Leaf Growth",
          "Flowering",
          "Pod filling",
          "Maturity"
        ]
      },
      {
        "name": "Sorghum",
        "stages": [
          "Emergence stage",
          "leaf visiblestage",
          "Growing point differentiation (GPD) stage",
          "flag leaf stage",
          "Boot stage",
          "Reproductive or heading stages",
          "Flowering stage",
          "Milk stage",
          "Dough stage"
        ]
      },
      {
        "name": "Sesame",
        "stages": [
          "Seedling stage",
          "Pre flowering ",
          "Pre reproduction",
          "Early and Mid Bloom",
          "Late Bloom ",
          "Harvesting "
        ]
      },
      {
        "name": "Onion ",
        "stages": [
          "Germination stage",
          "Transplanting stage ",
          "Vegetative stage ",
          "Bulbing stage ",
          "Maturity ",
          "Harvesting "
        ]
      },
      {
        "name": "Alfalfa ",
        "stages": [
          "Germination and emergence",
          "Vegetative stage",
          "Early bud",
          "Late bud",
          "Flowering ",
          "Regrowth"
        ]
      },
      {
        "name": "Pearl Millet",
        "stages": [
          "Germination stage",
          "Panicle initiation",
          "Boot stage",
          "50% stigma emergence ",
          "Milk stage ",
          "Dough stage",
          "Physiological maturity "
        ]
      },
      {
        "name": "Sugarcane",
        "stages": [
          "Germination stage",
          "Tillering ",
          "Grand growth phase ",
          "Maturation phase",
          "Harvesting phase",
          "Stage 5",
          "Stage 6"
        ]
      },
      {
        "name": "Banana",
        "stages": [
          "Emerging Suckers Stage",
          " Growth Stage",
          "Vigorous Growth Stage",
          "Shooting Stage",
          "Complete Flowering Stage",
          "Formation of fruit Stage",
          "Fruit Development Stage",
          "Harvesting Stage"
        ]
      },
      {
        "name": "Lettuce",
        "stages": [
          "Germination stage",
          "Seedling stage",
          "               More leaf stage",
          "                   Foliage formation",
          "Foilage growth",
          "Harvesting stage"
        ]
      },
      {
        "name": "Chilli",
        "stages": [
          "Germination stage",
          "Vegetative stage",
          "Flower initiation and flowering stage",
          "Fruiting stage",
          "Maturity stage",
          "Harvesting stage"
        ]
      },
      {
        "name": "Maize",
        "stages": [
          "Stage 1 (Germination and emergence)",
          "Stage 2 (cob development)",
          "Stage 3 (vegetative growth, pre-flowering)",
          "Stage 4 (flowering- pollination)",
          "Stage 5 (kernel development)",
          "Stage 6 (grain filling)",
          "Stage 7 (Physiological maturity)",
          "Stage 8 (Harvest)"
        ]
      },
      {
        "name": "Rice",
        "stages": [
          "Tillering stage",
          "Stem elongation",
          "Penicle initiation",
          "Booting stage",
          "Flowering stage",
          "Milking stage",
          "Dough stage",
          "Mature stage"
        ]
      },
      {
        "name": "Soybean",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage ",
          "Initial maturity satge ",
          "Harvesting"
        ]
      },
      {
        "name": "Wheat",
        "stages": [
          "Germination stage",
          "Crown root initation",
          "Tillering",
          "Jointing stage",
          "Flowering",
          "Milking stage",
          "Physiological maturity"
        ]
      },
      {
        "name": "Garlic ",
        "stages": [
          "Germination stage",
          "Vegetative stage ",
          "Bulbing stage ",
          "Maturation phase",
          "Harvesting phase"
        ]
      },
      {
        "name": "Cabbage",
        "stages": [
          "Transplanting stage ",
          "Plant establishment stage",
          "Cupping stage",
          "Head development stage",
          "Maturity stage",
          "Harvesting stage"
        ]
      },
      {
        "name": "Safflower",
        "stages": [
          "Emergence",
          "Rosette",
          "Stem elongation",
          "Branching",
          "Flowering",
          "Maturation"
        ]
      },
      {
        "name": "Cotton ",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Dry beans",
        "stages": [
          "Vegetative",
          "Flowering",
          "Pod development",
          "Maturity"
        ]
      },
      {
        "name": "Tomato",
        "stages": [
          "Vegatative",
          "Flowering",
          "First fruit set",
          "Fruit development",
          "Harvesting stage"
        ]
      },
      {
        "name": "Cardamom",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest phase "
        ]
      },
      {
        "name": "Oil palm",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase"
        ]
      },
      {
        "name": "Tea",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest first vegetative stage"
        ]
      },
      {
        "name": "Lemon",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase"
        ]
      },
      {
        "name": "Olive",
        "stages": [
          "Sprouting, emergence of the bud",
          "Flowering",
          "Fruit formation",
          "Fruit development",
          "Maturation",
          "Harvesting"
        ]
      },
      {
        "name": "Cocoa",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ]
      },
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
      {
        "name": "Black pepper",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest phase "
        ]
      },
      {
        "name": "Nutmeg & mace",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest phase "
        ]
      }
    ];

    for( const gwData of growthData) {
      let sql = 'SELECT * FROM options WHERE groupName = :cropType AND name like :name';
      const options = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { cropType: 'crop-type', name: '%'+gwData.name+'%' }
      });
      if(options.length > 0) {
        const option = options[0];
        sql = 'SELECT * FROM crop_observation_growth_stage WHERE cropType = :cropType';
        const crop_observation_growth_stage = await queryInterface.sequelize.query(sql, { 
          type: Sequelize.QueryTypes.SELECT,
          replacements: { cropType: option.id }
        });
        if(crop_observation_growth_stage.length === 0) {
          for (const stage of gwData.stages) {
            const newData = {
              name: stage.trim(),
              cropType: option.id
            };
            console.log(JSON.stringify(newData));
            await queryInterface.insert(null, 'crop_observation_growth_stage', newData);
          }
        }
      } else {
        sql = 'INSERT INTO options (name, groupName, createdAt, updatedAt) VALUES (:name, :groupName, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
        const replacements = { name: gwData.name, groupName: 'crop-type'};
        await queryInterface.sequelize.query(sql, { replacements });
        const [result] = await queryInterface.sequelize.query('SELECT LAST_INSERT_ID() AS id');
        const optionId = result[0].id;
        for (const stage of gwData.stages) {
          const newData = {
            name: stage.trim(),
            cropType: optionId
          };
          console.log(JSON.stringify(newData));
          await queryInterface.insert(null, 'crop_observation_growth_stage', newData);
        }
      }
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
