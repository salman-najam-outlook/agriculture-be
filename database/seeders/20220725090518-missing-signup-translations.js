"use strict";
const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const translationData = [
      {
        english: "Password must be at least 5 characters.",
        hindi: "Password must be at least 5 characters.",
        marathi: "Password must be at least 5 characters.",
        nepali: "Password must be at least 5 characters.",
        spanish: "La contraseña debe tener al menos 5 caracteres.",
        indonesian: "Kata sandi harus minimal 5 karakter.",
        arabic: "Password must be at least 5 characters.",
        portugese: "Password must be at least 5 characters.",
        french: "Password must be at least 5 characters.",
        swahili: "Password must be at least 5 characters.",
        bengali: "Password must be at least 5 characters.",
        oromo: "Password must be at least 5 characters.",
        somali: "Password must be at least 5 characters.",
        amharic: "Password must be at least 5 characters.",
        vietnamese: "Password must be at least 5 characters.",
        greek: "Password must be at least 5 characters.",
        mandarin: "Password must be at least 5 characters.",
        turkish: "Password must be at least 5 characters.",
      },
      {
        english: "Your password must contain at least one lower case letter.",
        hindi: "Your password must contain at least one lower case letter.",
        marathi: "Your password must contain at least one lower case letter.",
        nepali: "Your password must contain at least one lower case letter.",
        spanish: "Su contraseña debe contener al menos una letra minúscula.",
        indonesian: "Kata sandi Anda harus mengandung setidaknya satu huruf kecil.",
        arabic: "Your password must contain at least one lower case letter.",
        portugese: "Your password must contain at least one lower case letter.",
        french: "Your password must contain at least one lower case letter.",
        swahili: "Your password must contain at least one lower case letter.",
        bengali: "Your password must contain at least one lower case letter.",
        oromo: "Your password must contain at least one lower case letter.",
        somali: "Tour password must contain at least one lower case letter.",
        amharic: "Your password must contain at least one lower case letter.",
        vietnamese: "Your password must contain at least one lower case letter.",
        greek: "Your password must contain at least one lower case letter.",
        mandarin: "Your password must contain at least one lower case letter.",
        turkish: "Your password must contain at least one lower case letter.",
      },
      {
        english: "Your password must contain at least one upper case letter.",
        hindi: "Your password must contain at least one upper case letter.",
        marathi: "Your password must contain at least one upper case letter.",
        nepali: "Your password must contain at least one upper case letter.",
        spanish: "Su contraseña debe contener al menos una letra mayúscula.",
        indonesian: "Kata sandi Anda harus mengandung setidaknya satu huruf besar.",
        arabic: "Your password must contain at least one upper case letter.",
        portugese: "Your password must contain at least one upper case letter.",
        french: "Your password must contain at least one upper case letter.",
        swahili: "Your password must contain at least one upper case letter.",
        bengali: "Your password must contain at least one upper case letter.",
        oromo: "Your password must contain at least one upper case letter.",
        somali: "Your password must contain at least one upper case letter.",
        amharic: "Your password must contain at least one upper case letter.",
        vietnamese: "Your password must contain at least one upper case letter.",
        greek: "Your password must contain at least one upper case letter.",
        mandarin: "Your password must contain at least one upper case letter.",
        turkish: "Your password must contain at least one upper case letter.",
      },
      {
        english: "Your password must contain at least one special character.",
        hindi: "Your password must contain at least one special character.",
        marathi: "Your password must contain at least one special character.",
        nepali: "Your password must contain at least one special character.",
        spanish: "Su contraseña debe contener al menos un carácter especial.",
        indonesian: "Kata sandi Anda harus mengandung setidaknya satu karakter khusus.",
        arabic: "Your password must contain at least one special character.",
        portugese: "Your password must contain at least one special character.",
        french: "Your password must contain at least one special character.",
        swahili: "Your password must contain at least one special character.",
        bengali: "Your password must contain at least one special character.",
        oromo: "Your password must contain at least one special character.",
        somali: "Your password must contain at least one special character.",
        amharic: "Your password must contain at least one special character.",
        vietnamese: "Your password must contain at least one special character.",
        greek: "Your password must contain at least one special character.",
        mandarin: "Your password must contain at least one special character.",
        turkish: "Your password must contain at least one special character.",
      },
      {
        english: "Your password must contain at least one digit.",
        hindi: "Your password must contain at least one digit.",
        marathi: "Your password must contain at least one digit.",
        nepali: "Your password must contain at least one digit.",
        spanish: "Su contraseña debe contener al menos un dígito.",
        indonesian: "Kata sandi Anda harus berisi setidaknya satu digit.",
        arabic: "Your password must contain at least one digit.",
        portugese: "Your password must contain at least one digit.",
        french: "Your password must contain at least one digit.",
        swahili: "Your password must contain at least one digit.",
        bengali: "Your password must contain at least one digit.",
        oromo: "Your password must contain at least one digit.",
        somali: "Your password must contain at least one digit.",
        amharic: "Your password must contain at least one digit.",
        vietnamese: "Your password must contain at least one digit.",
        greek: "Your password must contain at least one digit.",
        mandarin: "Your password must contain at least one digit.",
        turkish: "Your password must contain at least one digit.",
      }
    ];

    await queryInterface.bulkInsert(
      "global_translation_metadata",
      translationData
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
