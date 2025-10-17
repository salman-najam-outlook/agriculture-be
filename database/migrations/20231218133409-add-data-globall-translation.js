'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");

const lagnuageObject = [
  {
    english: "Coffee Overview",
    hindi: "कॉफी अवलोकन",
    marathi: "कॉफी एकूण",
    nepali: "कफी अवलोकन",
    spanish: "Panorama del Café",
    indonesian: "Gambaran Kopi",
    arabic: "نظرة عامة على القهوة",
    portugese: "Visão Geral do Café",
    french: "Aperçu du Café",
    swahili: "Muhtasari wa Kahawa",
    bengali: "কফি ওভারভিউ",
    oromo: "Gubbaa Baqqalaa",
    somali: "Faahfaahinta Qaxwa",
    amharic: "ቡና መታየት",
    vietnamese: "Tổng quan về Cà phê",
    turkish: "Kahve Genel Bakış",
    mandarin: "咖啡概况",
    greek: "Επισκόπηση Καφέ",
    japanese: "コーヒー概要",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "User Management",
    hindi: "उपयोगकर्ता प्रबंधन",
    marathi: "वापरकर्ता व्यवस्थापन",
    nepali: "प्रयोगकर्ता प्रबन्धन",
    spanish: "Gestión de Usuarios",
    indonesian: "Manajemen Pengguna",
    arabic: "إدارة المستخدمين",
    portugese: "Gestão de Usuários",
    french: "Gestion des Utilisateurs",
    swahili: "Usimamizi wa Watumiaji",
    bengali: "ব্যবহারকারী ব্যবস্থাপনা",
    oromo: "Mana Maree Qindeessuun",
    somali: "Maamulka isticmaaleyaasha",
    amharic: "የተጠቃሚ ማህበረሰብ",
    vietnamese: "Quản lý Người dùng",
    turkish: "Kullanıcı Yönetimi",
    mandarin: "用户管理",
    greek: "Διαχείριση Χρηστών",
    japanese: "ユーザー管理",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Main Dashboard",
    hindi: "मुख्य डैशबोर्ड",
    marathi: "मुख्य डॅशबोर्ड",
    nepali: "मुख्य ड्यासबोर्ड",
    spanish: "Tablero Principal",
    indonesian: "Dasbor Utama",
    arabic: "لوحة المعلومات الرئيسية",
    portugese: "Painel Principal",
    french: "Tableau de Bord Principal",
    swahili: "Dashibodi Kuu",
    bengali: "মুখ্য ড্যাশবোর্ড",
    oromo: "Fayyisaa Baarota",
    somali: "Dashboorarka Madaxa",
    amharic: "ዋና መደበኛ",
    vietnamese: "Bảng Điều Khiển Chính",
    turkish: "Ana Kontrol Paneli",
    mandarin: "主要仪表盘",
    greek: "Κύριος Πίνακας Ελέγχου",
    japanese: "メインダッシュボード",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "User Dashboard",
    hindi: "उपयोगकर्ता डैशबोर्ड",
    marathi: "वापरकर्ता डॅशबोर्ड",
    nepali: "प्रयोगकर्ता ड्यासबोर्ड",
    spanish: "Tablero de Usuario",
    indonesian: "Dasbor Pengguna",
    arabic: "لوحة معلومات المستخدم",
    portugese: "Painel do Usuário",
    french: "Tableau de Bord de l'Utilisateur",
    swahili: "Dashibodi ya Mtumiaji",
    bengali: "ব্যবহারকারী ড্যাশবোর্ড",
    oromo: "Fayyisaa Istaatistiksii",
    somali: "Dashboorarka isticmaale",
    amharic: "የተጠቃሚ መረጃ ቤት",
    vietnamese: "Bảng Điều Khiển Người Dùng",
    turkish: "Kullanıcı Paneli",
    mandarin: "用户仪表盘",
    greek: "Πίνακας Ελέγχου Χρήστη",
    japanese: "ユーザーダッシュボード",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Farm Management",
    hindi: "खेत प्रबंधन",
    marathi: "शेत प्रबंधन",
    nepali: "खेत प्रबन्धन",
    spanish: "Gestión Agrícola",
    indonesian: "Manajemen Pertanian",
    arabic: "إدارة المزرعة",
    portugese: "Gestão Agrícola",
    french: "Gestion Agricole",
    swahili: "Usimamizi wa Shamba",
    bengali: "ফার্ম ম্যানেজমেন্ট",
    oromo: "Mana Maree Magaala",
    somali: "Maamulka Beeraha",
    amharic: "የተለያዩ መረጃ ሰነዶች",
    vietnamese: "Quản lý Nông trại",
    turkish: "Çiftlik Yönetimi",
    mandarin: "农场管理",
    greek: "Διαχείριση Αγροκτήματος",
    japanese: "農場管理",
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
