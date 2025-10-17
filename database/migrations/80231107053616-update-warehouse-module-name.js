'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('parent_modules', { name: 'Coffee Warehouse' }, { id: 'warehouse' });
    await queryInterface.insert(null, 'global_translation_metadata', {
      english: 'Coffee Warehouse',
      hindi: 'कॉफी गोदाम',
      marathi: 'कॉफी वेअरहाउस',
      nepali: 'कफी गोदाम',
      spanish: 'Almacén de Café',
      swahili: 'Ghala la Kahawa',
      indonesian: 'Gudang Kopi',
      french: 'Entrepôt de Café',
      portugese: 'Armazém de Café',
      arabic: 'مستودع القهوة',
      bengali: 'কফি গুদাম',
      oromo: 'Waareeha Qaxwa',
      somali: 'Guriga Qaxwa',
      vietnamese: 'Kho Cà phê',
      amharic: 'ቡና የቢሊቆቲካ ጉድዬ',
      greek: 'Αποθήκη Καφέ',
      mandarin: '咖啡仓库',
      turkish: 'Kahve Deposu',
      japanese: 'コーヒー倉庫',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('parent_modules', { name: 'Warehouse' }, { id: 'warehouse' });
  },
};
