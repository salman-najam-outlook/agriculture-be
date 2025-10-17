'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
const langaugeObjects = [
  {
    english: "User already exist with this mobile number",
    hindi: 'इस मोबाइल नंबर के साथ पहले से ही एक उपयोगकर्ता मौजूद है',
    marathi: 'या मोबाइल नंबरसह वापरकर्ता आधीच आहे',
    spanish: 'Ya existe un usuario con este número de móvil',
    indonesian: 'Pengguna sudah ada dengan nomor telepon ini',
    portugese: 'Usuário já existe com este número de celular',
    nepali: 'यस मोबाइल नम्बरसँग पहिले नै एक प्रयोगकर्ता छ',
    french: 'Un utilisateur existe déjà avec ce numéro de téléphone portable',
    arabic: 'المستخدم موجود بالفعل بهذا الرقم المحمول',
    swahili: 'Mtumiaji tayari yupo na nambari hii ya simu',
    bengali: 'এই মোবাইল নম্বরে ইতিমধ্যে ব্যবহারকারী বিদ্যমান',
    oromo: 'Nama kana dura naqamte bilbila',
    somali: 'User horey u jiidashay tirada taleefonkaan',
    vietnamese: 'Người dùng đã tồn tại với số điện thoại này',
    amharic: 'የአስተያየት የሚሰራ ምንም ልክ ቁጥር የተሰኘው አልተገኘም',
    greek: 'Υπάρχει ήδη χρήστης με αυτό τον αριθμό κινητού',
    mandarin: '使用者已存在此手機號碼',
    japanese: 'この携帯番号で既にユーザーが存在します',
    turkish: 'Bu mobil numara ile zaten bir kullanıcı mevcut',
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    english: "User already exist with this email",
    hindi: 'इस ईमेल के साथ पहले से ही एक उपयोगकर्ता मौजूद है',
    marathi: 'या ईमेलसह वापरकर्ता आधीच आहे',
    spanish: 'Ya existe un usuario con este correo electrónico',
    indonesian: 'Pengguna sudah ada dengan email ini',
    portugese: 'Usuário já existe com este e-mail',
    nepali: 'यस इमेलसँग पहिले नै एक प्रयोगकर्ता छ',
    french: 'Un utilisateur existe déjà avec cette adresse e-mail',
    arabic: 'المستخدم موجود بالفعل بهذا البريد الإلكتروني',
    swahili: 'Mtumiaji tayari yupo na barua pepe hii',
    bengali: 'এই ইমেল সহ ব্যবহারকারী ইতিমধ্যে বিদ্যমান',
    oromo: 'Tirada imel bilbilaa nama keessa hinqabneefi',
    somali: 'User horey u jiidashay email-kaan',
    vietnamese: 'Người dùng đã tồn tại với địa chỉ email này',
    amharic: 'የኢሜል አድራሻ የሚሰራ ምንም ልክ የተገኘው ተገኝተዋል',
    greek: 'Υπάρχει ήδη χρήστης με αυτό το email',
    mandarin: '使用者已存在此電子郵件',
    japanese: 'このメールアドレスで既にユーザーが存在します',
    turkish: 'Bu e-posta ile zaten bir kullanıcı mevcut',
    createdAt: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const obj in langaugeObjects) {
        await queryInterface.insert(null, 'global_translation_metadata', langaugeObjects[obj]);
      }
    } catch (err) {
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    for (const obj of langaugeObjects) {
      await queryInterface.bulkDelete('global_translation_metadata', { english: langaugeObjects[obj].english }, {}, {});
    }
  }
};
