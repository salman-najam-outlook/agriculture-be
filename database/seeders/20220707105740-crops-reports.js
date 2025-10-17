'use strict';
const moment = require('moment');
const { cropReportsTypeData } = require("../../helpers/consts");
module.exports = {
  async up (queryInterface, Sequelize) {
    let cropsReportsTypeSeed=[];
    cropReportsTypeData.forEach((data) =>
    cropsReportsTypeSeed.push({
        cropName: data.cropName,
        fileS3Key: data.fileS3Key,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    await queryInterface.bulkInsert("crops_reports", cropsReportsTypeSeed, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('crops_reports', null, {});
  }
};

