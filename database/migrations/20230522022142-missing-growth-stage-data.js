'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const growthData = [
      {
        "name": "Cassava (Brazil)",
        "stages": [
          "Crop establishment stage",
          "Vegetative stage",
          "Tuber formation stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Cassava (Democratic republic of the Congo)",
        "stages": [
          "Crop establishment stage",
          "Vegetative stage",
          "Tuber formation stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Cassava (Nigeria)",
        "stages": [
          "Crop establishment stage",
          "Vegetative stage",
          "Tuber formation stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Cassava (Uganda)",
        "stages": [
          "Crop establishment stage",
          "Vegetative stage",
          "Tuber formation stage",
          "Tuber development stage",
          "Harvest stage"
        ]
      },
      {
        "name": "Wheat (Lybia)",
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
        "name": "Wheat (Brazil)",
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
        "name": "Soybean(Bolivia)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Soybean(India)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Soybean(Paraguay)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Soybean(Canada)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Soybean(USA)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Soybean (Brazil)",
        "stages": [
          "Emergence stage",
          "1st to nth trifoliolate stage",
          "Beginning bloom/first flower stage",
          "Full bloom/flower in top two nodes stage",
          "Pod stage",
          "Initial maturity satge",
          "Harvesting"
        ]
      },
      {
        "name": "Rice (Nepal)",
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
        "name": "Potato (Colombia)",
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
        "name": "Potato (Bolivia)",
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
        "name": "Potato (Canada)",
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
        "name": "Potato (USA)",
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
        "name": "Potato (India)",
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
        "name": "Potato (Nepal)",
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
        "name": "Tomato (India)",
        "stages": [
          "Vegatative",
          "Flowering",
          "First fruit set",
          "Fruit development",
          "Harvesting stage"
        ]
      },
      {
        "name": "Tomato (Egypt)",
        "stages": [
          "Vegatative",
          "Flowering",
          "First fruit set",
          "Fruit development",
          "Harvesting stage"
        ]
      },
      {
        "name": "Tomato (usa)",
        "stages": [
          "Vegatative",
          "Flowering",
          "First fruit set",
          "Fruit development",
          "Harvesting stage"
        ]
      },
      {
        "name": "coffee (Bolivia)",
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
        "name": "coffee (Guatemala)",
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
        "name": "coffee (Mexico)",
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
        "name": "coffee (Uganda)",
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
        "name": "coffee (India)",
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
        "name": "Coffee (Ethiopia)",
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
        "name": "Coffee (Indonesia)",
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
        "name": "Coffee (colombia)",
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
        "name": "coffee (Vietnam)",
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
        "name": "Coffee (Brazil)",
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
        "name": "coffee (Panama)",
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
        "name": "coffee (Honduras)",
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
        "name": "Safflower (India)",
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
        "name": "Safflower (Argentina)",
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
        "name": "Safflower (USA)",
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
        "name": "Banana (India)",
        "stages": [
          "Emerging Suckers Stage",
          "Growth Stage",
          "Vigorous Growth Stage",
          "Shooting Stage",
          "Complete Flowering Stage",
          "Formation of fruit Stage",
          "Fruit Development Stage",
          "Harvesting Stage"
        ]
      },
      {
        "name": "Banana (Bolivia)",
        "stages": [
          "Emerging Suckers Stage",
          "Growth Stage",
          "Vigorous Growth Stage",
          "Shooting Stage",
          "Complete Flowering Stage",
          "Formation of fruit Stage",
          "Fruit Development Stage",
          "Harvesting Stage"
        ]
      },
      {
        "name": "Banana (Indonesia)",
        "stages": [
          "Emerging Suckers Stage",
          "Growth Stage",
          "Vigorous Growth Stage",
          "Shooting Stage",
          "Complete Flowering Stage",
          "Formation of fruit Stage",
          "Fruit Development Stage",
          "Harvesting Stage"
        ]
      },
      {
        "name": "Tea (Uganda)",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest first vegetative stage"
        ]
      },
      {
        "name": "Cotton (australia)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Cotton (argentina)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Cotton (brazil)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Cotton (usa)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Cotton (india)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Cotton(sudan)",
        "stages": [
          "Emergence",
          "Square formation",
          "Flowering",
          "Boll formation",
          "Maturation"
        ]
      },
      {
        "name": "Oil palm (Indonesia)",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase"
        ]
      },
      {
        "name": "Cocoa (Ivory Coast)",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ]
      },
      {
        "name": "Cocoa (Colombia)",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ]
      },
      {
        "name": "Cocoa (Peru)",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
        ]
      },
      {
        "name": "Olive (Libya)",
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
        "name": "Timothy (USA)",
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
        "name": "Alfalfa (North America)",
        "stages": [
          "Germination and emergence",
          "Vegetative stage",
          "Early bud",
          "Late bud",
          "Flowering",
          "Regrowth"
        ]
      },
      {
        "name": "Rapeseed (China)",
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
        "name": "Rapeseed (Canada)",
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
        "name": "Rapeseed (India)",
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
        "name": "Nutmeg&mace (Indonesia)",
        "stages": [
          "Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase",
          "Post harvest phase "
        ]
      },
      {
        "name": "Chilli (India)",
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
        "name": "Onion (Zambia)",
        "stages": [
          "Germination stage",
          "Transplanting stage",
          "Vegetative stage",
          "Bulbing stage",
          "Maturity",
          "Harvesting "
        ]
      },
      {
        "name": "Green gram ( India )",
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
        "name": "Green gram ( Ethiopia )",
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
        "name": "Lemon (India)",
        "stages": [
          "First Vegetative phase",
          "Second Vegetative phase",
          "Flowering / Reproductive phase",
          "Harvest / Reproductive phase"
        ]
      },
      {
        "name": "Garlic (India)",
        "stages": [
          "Germination stage",
          "Vegetative stage",
          "Bulbing stage",
          "Maturation phase",
          "Harvesting phase"
        ]
      },
      {
        "name": "Sugarcane (Colombia)",
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
        "name": "Sugarcane (India)",
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
