'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the options to be seeded
    const optionsToSeed = [
      // Health Conditions
      { id: 8119, name: "Dead", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8120, name: "Stuned", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8121, name: "Underdeveloped", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8122, name: "Health Growth", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8123, name: "Severely Damaged", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8124, name: "No Infestation", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8125, name: "Good Health", groupName: "health-condition", user_id: null, created_at: new Date(), updated_at: new Date() },

      // Program Types
      { id: 8117, name: "RWA Tree", groupName: "program-type", user_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8118, name: "Carbon Credits", groupName: "program-type", user_id: null, created_at: new Date(), updated_at: new Date() },
    ];

    console.log(`🌱 Starting migration seeder for ${optionsToSeed.length} options...`);

    // Check which options already exist by ID
    const existingOptionsById = await queryInterface.sequelize.query(
      `SELECT id, name, groupName FROM options WHERE id IN (${optionsToSeed.map(opt => opt.id).join(',')})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('conflictingIds-->', existingOptionsById);

    // Check which options already exist by name and groupName (to catch duplicates with different IDs)
    const nameGroupPairs = optionsToSeed.map(opt => `('${opt.name}', '${opt.groupName}')`).join(',');
    const existingOptionsByName = await queryInterface.sequelize.query(
      `SELECT id, name, groupName FROM options WHERE (name, groupName) IN (${nameGroupPairs})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create maps for quick lookup
    const existingByIdMap = existingOptionsById.reduce((map, option) => {
      map[option.id] = option;
      return map;
    }, {});

    const existingByNameMap = existingOptionsByName.reduce((map, option) => {
      const key = `${option.name}-${option.groupName}`;
      map[key] = option;
      return map;
    }, {});

    // Filter out options that already exist
    const optionsToInsert = [];
    const skippedOptions = [];

    optionsToSeed.forEach(option => {
      const existsById = existingByIdMap[option.id];
      const existsByName = existingByNameMap[`${option.name}-${option.groupName}`];

      if (existsById) {
        // Check if the existing option has the same name and groupName
        if (existsById.name === option.name && existsById.groupName === option.groupName) {
          console.log(`✅ Option already exists (exact match) - ID: ${option.id}, Name: "${option.name}", Group: "${option.groupName}"`);
          skippedOptions.push({ ...option, reason: 'exists_exact_match', existing: existsById });
        } else {
          console.log(`❌ ID CONFLICT - ID ${option.id} already exists with different data: "${existsById.name}" (${existsById.groupName}) vs "${option.name}" (${option.groupName})`);
          skippedOptions.push({ ...option, reason: 'id_conflict', existing: existsById });
        }
      } else if (existsByName) {
        console.log(`⚠️  Option already exists by name - ID: ${option.id}, Name: "${option.name}", Group: "${option.groupName}" (existing ID: ${existsByName.id})`);
        skippedOptions.push({ ...option, reason: 'exists_by_name', existing: existsByName });
      } else {
        console.log(`✅ Will insert option - ID: ${option.id}, Name: "${option.name}", Group: "${option.groupName}"`);
        optionsToInsert.push(option);
      }
    });

    // Insert only the options that don't exist
    if (optionsToInsert.length > 0) {
      console.log(`\n📝 Inserting ${optionsToInsert.length} new options...`);
      await queryInterface.bulkInsert("options", optionsToInsert, {});
      console.log(`✅ Successfully inserted ${optionsToInsert.length} options`);
    } else {
      console.log(`\nℹ️  All options already exist. No new options to insert.`);
    }

    // Summary
    const exactMatches = skippedOptions.filter(opt => opt.reason === 'exists_exact_match').length;
    const idConflicts = skippedOptions.filter(opt => opt.reason === 'id_conflict').length;
    const nameConflicts = skippedOptions.filter(opt => opt.reason === 'exists_by_name').length;
    
    console.log(`\n📊 Migration Seeder Summary:`);
    console.log(`   Total options defined: ${optionsToSeed.length}`);
    console.log(`   Exact matches (already exist): ${exactMatches}`);
    console.log(`   ID conflicts (different data): ${idConflicts}`);
    console.log(`   Name conflicts (different ID): ${nameConflicts}`);
    console.log(`   Newly inserted: ${optionsToInsert.length}`);
    console.log(`   Total skipped: ${skippedOptions.length}`);

    if (skippedOptions.length > 0) {
      console.log(`\n📋 Skipped Options Details:`);
      skippedOptions.forEach(option => {
        if (option.reason === 'exists_exact_match') {
          console.log(`   ✅ ID ${option.id}: "${option.name}" (${option.groupName}) - Already exists with exact same data`);
        } else if (option.reason === 'id_conflict') {
          console.log(`   ❌ ID ${option.id}: "${option.name}" (${option.groupName}) - ID CONFLICT with existing: "${option.existing.name}" (${option.existing.groupName})`);
        } else if (option.reason === 'exists_by_name') {
          console.log(`   ⚠️  ID ${option.id}: "${option.name}" (${option.groupName}) - Already exists with different ID (${option.existing.id})`);
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const optionIds = [8117, 8118, 8119, 8120, 8121, 8122, 8123, 8124, 8125];
    const optionNames = [
      "Dead", "Stuned", "Underdeveloped", "Health Growth", "Severely Damaged", 
      "No Infestation", "Good Health", "RWA Tree", "Carbon Credits"
    ];
    const groupNames = ["health-condition", "program-type"];
    
    console.log(`🗑️  Starting rollback for migration seeder...`);
    
    // Check which options exist before deletion
    const existingOptionsById = await queryInterface.sequelize.query(
      `SELECT id, name, groupName FROM options WHERE id IN (${optionIds.join(',')})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingOptionsByName = await queryInterface.sequelize.query(
      `SELECT id, name, groupName FROM options WHERE name IN (${optionNames.map(name => `'${name}'`).join(',')}) AND groupName IN (${groupNames.map(group => `'${group}'`).join(',')})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Combine and deduplicate existing options
    const allExistingOptions = [...existingOptionsById, ...existingOptionsByName];
    const uniqueExistingOptions = allExistingOptions.filter((option, index, self) => 
      index === self.findIndex(o => o.id === option.id)
    );

    if (uniqueExistingOptions.length > 0) {
      console.log(`🗑️  Deleting ${uniqueExistingOptions.length} options...`);
      uniqueExistingOptions.forEach(option => {
        console.log(`   - ID: ${option.id}, Name: "${option.name}", Group: "${option.groupName}"`);
      });
      
      // Delete by both ID and name/groupName to ensure complete cleanup
      await queryInterface.bulkDelete("options", {
        [Sequelize.Op.or]: [
          { id: { [Sequelize.Op.in]: optionIds } },
          {
            name: { [Sequelize.Op.in]: optionNames },
            groupName: { [Sequelize.Op.in]: groupNames }
          }
        ]
      }, {});
      
      console.log(`✅ Successfully deleted ${uniqueExistingOptions.length} options`);
    } else {
      console.log(`ℹ️  No options found to delete.`);
    }
  }
}; 