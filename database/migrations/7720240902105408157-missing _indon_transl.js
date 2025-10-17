'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const translationData = [
        {
          english: "EUDR Assessment",
          indonesian: "Penilaian EUDR"
        },
        {
          english: "Farmer",
          indonesian: "Petani"
        },
        {
          english: "Processing Station",
          indonesian: "Stasiun Pengolahan"
        },
        {
          english: "Batch Management",
          indonesian: "Manajemen Batch"
        },
        {
          english: "Final Product",
          indonesian: "Produk Akhir"
        },
        {
          english: "Production Chart",
          indonesian: "Bagan Produksi"
        },
        {
          english: "Purchase Confirmations",
          indonesian: "Konfirmasi Pembelian"
        },
        {
          english: "Cacao",
          indonesian: "Kakao"
        },
        {
          english: "Assesments And Surveys",
          indonesian: "Penilaian dan Survei"
        },
        {
          english: "Carbon Credit",
          indonesian: "Kredit Karbon"
        },
        {
          english: "Crop Health Report",
          indonesian: "Laporan Kesehatan Tanaman"
        },
        {
          english: "Forest Report",
          indonesian: "Laporan Hutan"
        },
        {
          english: "Land Suitability",
          indonesian: "Kesesuaian Lahan"
        },
        {
          english: "Weather Analysis Report",
          indonesian: "Laporan Analisis Cuaca"
        },
        {
          english: "Add Crop Disease Data",
          indonesian: "Tambah Data Penyakit Tanaman"
        },
        {
          english: "Detect Crop Disease",
          indonesian: "Deteksi Penyakit Tanaman"
        },
        {
          english: "Lime Calculator",
          indonesian: "Kalkulator Kapur"
        },
        {
          english: "Nutrient Calculator",
          indonesian: "Kalkulator Nutrisi"
        },
        {
          english: "Soil Analytics",
          indonesian: "Analisis Tanah"
        },
        {
          english: "My Trees",
          indonesian: "Pohon Saya"
        },
        {
          english: "NFT",
          indonesian: "NFT"
        }
      ];

      await queryInterface.bulkInsert('global_translation_metadata', translationData, { transaction });
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {

  }
};