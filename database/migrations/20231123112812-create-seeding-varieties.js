"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("coffee_seeding_varieties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coffee_seeding_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "seedlings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      coffee_variety_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "coffee_variety",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    const seedlingsData = await queryInterface.sequelize.query(
      "SELECT id, coffee_variety FROM seedlings"
    );

    // const transformedSeedlingMapData = seedlingsData[0]
    //   .filter((row) => row.coffee_variety !== null || row.coffee_variety !== 0)
    //   .map((row) => {
    //     console.log(row)
    //     return ({
        // coffee_seeding_id: row.id,
        // coffee_variety_id: row.coffee_variety,
        // createdAt: new Date(),
        // updatedAt: new Date(),
    //   })});

      const transformedSeedlingMapData = seedlingsData[0]
      .filter((row) => row.coffee_variety !== null && row.coffee_variety !== 0);
  
    const invalidCoffeeVarietyIds = [];
    const validCoffeeVariety = [];
  
    for (const row of transformedSeedlingMapData) {
      const coffeeVarietyExists = await queryInterface.sequelize.query(
        `SELECT id FROM coffee_variety WHERE id = ${row.coffee_variety}`
      );
  
      if (coffeeVarietyExists[0].length === 0) {
        invalidCoffeeVarietyIds.push(row.coffee_variety);
      } else {
        validCoffeeVariety.push(row)
      }
    }
  
    if (invalidCoffeeVarietyIds.length > 0) {
      console.log('Invalid coffee_variety_id values:', invalidCoffeeVarietyIds);
    }

    const mappedData = validCoffeeVariety.map(row => ({
      coffee_seeding_id: row.id,
      coffee_variety_id: row.coffee_variety,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    
    await queryInterface.bulkInsert(
      "coffee_seeding_varieties",
      mappedData,
      {}
    );



    await queryInterface.removeColumn("seedlings", "coffee_variety");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("coffee_seeding_varieties");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
