'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('soil_application_method', [
      {name: 'Manual application', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Soil application', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Foliar application', createdAt: new Date(), updatedAt: new Date()},

    ]);


    const translations = [
      {
        "english": "Soil application",
        "hindi": "मृदा आवेदन",
        "marathi": "माती अनुप्रयोग",
        "nepali": "माटोको अनुप्रयोग",
        "spanish": "Aplicación de suelo",
        "swahili": "Maombi ya udongo",
        "indonesian": "Aplikasi tanah",
        "french": "Application au sol",
        "portugese": "Aplicação de solo",
        "arabic": "تطبيق التربة",
        "bengali": "মাটি প্রয়োগ",
        "oromo": "Hojii lafa",
        "somali": "Codsiga ciidda",
        "vietnamese": "Ứng dụng đất",
        "amharic": "እንቁ መተግበሪያ",
        "greek": "Εφαρμογή εδάφους",
        "mandarin": "土壤施用",
        "turkish": "Toprak uygulaması",
        "japanese": "土壌施用",
        "dutch": "Bodemtoepassing"
      },
      {
        "english": "Manual application",
        "hindi": "मैनुअल आवेदन",
        "marathi": "मॅन्युअल अनुप्रयोग",
        "nepali": "म्यानुअल आवेदन",
        "spanish": "Aplicación manual",
        "swahili": "Maombi ya mwongozo",
        "indonesian": "Aplikasi manual",
        "french": "Application manuelle",
        "portugese": "Aplicação manual",
        "arabic": "التطبيق اليدوي",
        "bengali": "ম্যানুয়াল আবেদন",
        "oromo": "Hojii harka",
        "somali": "Codsiga gacanta",
        "vietnamese": "Ứng dụng thủ công",
        "amharic": "መመሪያ መተግበሪያ",
        "greek": "Εγχειρίδιο εφαρμογής",
        "mandarin": "手动应用",
        "turkish": "Manuel uygulama",
        "japanese": "手動アプリケーション",
        "dutch": "Handmatige toepassing"
      }
      
     
    ];

    await queryInterface.bulkInsert('global_translation_metadata', translations);
  },
  down: async (queryInterface) => {

  }
};
