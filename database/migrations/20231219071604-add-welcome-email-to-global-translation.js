'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");

const lagnuageObject = [
  {
    english: "Dimitra Email Verification",
    hindi: "दीमित्रा ईमेल सत्यापन",
    marathi: "दिमित्र ईमेल सत्यापन",
    nepali: "दिमित्र इमेल सत्यापन",
    spanish: "Verificación de Correo Electrónico Dimitra",
    indonesian: "Verifikasi Email Dimitra",
    arabic: "تحقق من البريد الإلكتروني لديميترا",
    portugese: "Verificação de Email Dimitra",
    french: "Vérification d'email Dimitra",
    swahili: "Uthibitisho wa Barua pepe ya Dimitra",
    bengali: "দিমিত্রা ইমেল যাচাই",
    oromo: "Dimitra Email Verification",
    somali: "Dimitra Email Verification",
    amharic: "ድምጥራ ኢመይል ምረጡ",
    vietnamese: "Xác minh Email Dimitra",
    turkish: "Dimitra E-posta Doğrulama",
    mandarin: "迪米特拉邮件验证",
    greek: "Επαλήθευση Email Δήμητρα",
    japanese: "ディミトラメール確認",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Welcome to Dimitra - Email Verification",
    hindi: "डिमित्रा में आपका स्वागत है - ईमेल सत्यापन",
    marathi: "डिमित्रा वर आपले स्वागत आहे - ईमेल सत्यापन",
    nepali: "डिमित्रा मा स्वागत छ - ईमेल सत्यापन",
    spanish: "Bienvenido a Dimitra - Verificación de correo electrónico",
    indonesian: "Selamat datang di Dimitra - Verifikasi Email",
    arabic: "مرحبًا بك في ديميترا - التحقق من البريد الإلكتروني",
    portugese: "Bem-vindo ao Dimitra - Verificação de e-mail",
    french: "Bienvenue à Dimitra - Vérification de l'e-mail",
    swahili: "Karibu kwa Dimitra - Uthibitisho wa Barua pepe",
    bengali: "ডিমিত্রা - ইমেল যাচাইকরণে স্বাগতম",
    oromo: "Dimitra - Iimeelii Gubaa",
    somali: "So dhawoow Dimitra - Xaqiijinta Iimeelka",
    amharic: "ደህና መጣል እንኳን ደህና መጡ - ኢሜይል ማረጃ",
    vietnamese: "Chào mừng bạn đến với Dimitra - Xác minh Email",
    turkish: "Dimitra'ya hoş geldiniz - E-posta Doğrulama",
    mandarin: "欢迎来到Dimitra - 电子邮件验证",
    greek: "Καλώς ήρθατε στο Dimitra - Επαλήθευση Email",
    japanese: "ディミトラへようこそ - メール確認",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.bulkInsert(
        "global_translation_metadata",
        lagnuageObject,
        {},
        {},
        { transaction }
      );
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err;
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

