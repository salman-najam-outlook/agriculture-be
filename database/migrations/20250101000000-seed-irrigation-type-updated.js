'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    // First, insert the main categories
    const categories = [
      { name: 'Ground Water', category: 'Ground Water', isCategory: true, sortOrder: 1 },
      { name: 'Surface Water', category: 'Surface Water', isCategory: true, sortOrder: 2 },
      { name: 'Stored Water', category: 'Stored Water', isCategory: true, sortOrder: 3 },
      { name: 'Community Source', category: 'Community Source', isCategory: true, sortOrder: 4 },
      { name: 'Manual', category: 'Manual', isCategory: true, sortOrder: 5 },
      { name: 'Other', category: 'Other', isCategory: true, sortOrder: 6 }
    ];

    const categoryRecords = categories.map(cat => ({
      ...cat,
      parentId: null,
      isUserSpecific: false,
      userId: null,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('irrigation_type_updated', categoryRecords, {});

    // Get the inserted category IDs
    const insertedCategories = await queryInterface.sequelize.query(
      'SELECT id, category FROM irrigation_type_updated WHERE isCategory = true ORDER BY sortOrder',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.category] = cat.id;
    });

    // Now insert the subcategories
    const subcategories = [
      // Ground Water subcategories
      { name: 'Bore well', category: 'Ground Water', parentId: categoryMap['Ground Water'], sortOrder: 1 },
      { name: 'Tube Well', category: 'Ground Water', parentId: categoryMap['Ground Water'], sortOrder: 2 },
      { name: 'Shallow Well', category: 'Ground Water', parentId: categoryMap['Ground Water'], sortOrder: 3 },
      { name: 'Hand Pump', category: 'Ground Water', parentId: categoryMap['Ground Water'], sortOrder: 4 },
      { name: 'Artesian Well', category: 'Ground Water', parentId: categoryMap['Ground Water'], sortOrder: 5 },

      // Surface Water subcategories
      { name: 'River', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 1 },
      { name: 'Stream', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 2 },
      { name: 'Canal', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 3 },
      { name: 'Lake', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 4 },
      { name: 'Pond', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 5 },
      { name: 'Dam / Reservoir', category: 'Surface Water', parentId: categoryMap['Surface Water'], sortOrder: 6 },

      // Stored Water subcategories
      { name: 'Rainwater Harvesting Tank', category: 'Stored Water', parentId: categoryMap['Stored Water'], sortOrder: 1 },
      { name: 'Farm Pits / Trenches', category: 'Stored Water', parentId: categoryMap['Stored Water'], sortOrder: 2 },
      { name: 'On-Farm Reservoir', category: 'Stored Water', parentId: categoryMap['Stored Water'], sortOrder: 3 },
      { name: 'Cistern / Underground Tank', category: 'Stored Water', parentId: categoryMap['Stored Water'], sortOrder: 4 },

      // Community Source subcategories
      { name: 'Spring Water', category: 'Community Source', parentId: categoryMap['Community Source'], sortOrder: 1 },
      { name: 'Municipal Water Supply', category: 'Community Source', parentId: categoryMap['Community Source'], sortOrder: 2 },
      { name: 'Treated / Recycled Water', category: 'Community Source', parentId: categoryMap['Community Source'], sortOrder: 3 },
      { name: 'Tanker Supply', category: 'Community Source', parentId: categoryMap['Community Source'], sortOrder: 4 },
      { name: 'Shared Irrigation Network / Cooperative Supply', category: 'Community Source', parentId: categoryMap['Community Source'], sortOrder: 5 },

      // Manual subcategories
      { name: 'Manual Watering (Buckets, Cans)', category: 'Manual', parentId: categoryMap['Manual'], sortOrder: 1 },
      { name: 'Drip-fed from Barrel / Small Tank', category: 'Manual', parentId: categoryMap['Manual'], sortOrder: 2 }
    ];

    const subcategoryRecords = subcategories.map(sub => ({
      ...sub,
      isCategory: false,
      isUserSpecific: false,
      userId: null,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('irrigation_type_updated', subcategoryRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('irrigation_type_updated', {}, {});
  },
}; 