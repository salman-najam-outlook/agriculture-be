'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const translations = [
        {
          english: 'Raw Cacao Beans',
          hindi: 'कच्चा काकाओ बीन्स',
          spanish: 'Granos de Cacao Crudo',
          swahili: 'Maharage ya Cacao Mbichi',
          portugese: 'Grãos de Cacau Cru',
          arabic: 'فول الكاكاو الخام',
          vietnamese: 'Hạt cacao sống',
        },
        {
          english: 'Fermented And Dried Cacao Beans',
          hindi: 'संगाना और सुखा काकाओ बीन्स',
          spanish: 'Granos de Cacao Fermentados y Secos',
          swahili: 'Maharage ya Cacao Vilivyosagwa na Kukaushwa',
          portugese: 'Grãos de Cacau Fermentados e Secos',
          arabic: 'حبوب الكاكاو المخمرة والمجففة',
          vietnamese: 'Hạt cacao lên men và sấy khô',

        },
        {
          english: 'Cacao Nibs',
          hindi: 'काकाओ निब्स',
          spanish: 'Trozos de Cacao',
          swahili: 'Vidonge vya Cacao',
          portugese: 'Nibs de Cacau',
          arabic: 'قطع الكاكاو',
          vietnamese: 'Hạt cacao nhỏ',

        },
        {
          english: 'Cacao Mass (Liquid)',
          hindi: 'काकाओ मास (तरल',
          spanish: 'Masa de Cacao (Líquida)',
          swahili: 'Masi ya Cacao (Vitunguu)',
          portugese: 'Massa de Cacau (Líquida)',
          arabic: 'كتلة الكاكاو (سائلة)',
          vietnamese: 'Hạt cacao (Dạng lỏng)',

        },
        {
          english: 'Cacao Mass (Solid)',
          hindi: 'काकाओ मास (ठोस)',
          spanish: 'Masa de Cacao (Sólida)',
          swahili: 'Masi ya Cacao (Gumu)',
          portugese: 'Massa de Cacau (Sólida)',
          arabic: 'كتلة الكاكاو (صلبة)',
          vietnamese: 'Hạt cacao (Dạng rắn)',

        },
        {
          english: 'Cacao Butter',
          hindi: 'काकाओ बटर',
          spanish: 'Manteca de Cacao',
          swahili: 'Siagi ya Cacao',
          portugese: 'Manteiga de Cacau',
          arabic: 'زبدة الكاكاو',
          vietnamese: 'Bơ cacao',

        },
        {
          english: 'Cacao Powder',
          hindi: 'काकाओ पाउडर',
          spanish: 'Polvo de Cacao',
          swahili: 'Unga wa Cacao',
          portugese: 'Pó de Cacau',
          arabic: 'مسحوق الكاكاو',
          vietnamese: 'Bột cacao',

        },
        {
          english: 'Chocolate Liquor',
          hindi: 'चॉकलेट लिकर',
          spanish: 'Licor de Chocolate',
          swahili: 'Leka ya Chokoleti',
          portugese: 'Licor de Chocolate',
          arabic: 'شراب الشوكولاتة',
          vietnamese: 'Rượu chocolate',

        },
        {
          english: 'Chocolate Products',
          hindi: 'चॉकलेट उत्पाद',
          spanish: 'Productos de Chocolate',
          swahili: 'Bidhaa za Chokoleti',
          portugese: 'Produtos de Chocolate',
          arabic: 'منتجات الشوكولاتة',
          vietnamese: 'Sản phẩm sô cô la',

        },
        {
          english: 'Fair Trade Or Specialty Deliveries',
          hindi: 'फेयर ट्रेड या विशेष पहुंचानें',
          spanish: 'Entregas de Comercio Justo o Especiales',
          swahili: 'Biashara Haki au Utoaji Maalum',
          portugese: 'Entregas de Comércio Justo ou Especiais',
          arabic: 'تسليم عادل أو خدمات خاصة',
          vietnamese: 'Giao hàng công bằng hoặc đặc biệt'
        }
      ]

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        translations,
        {},
        {},
        { transaction }
      );

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
