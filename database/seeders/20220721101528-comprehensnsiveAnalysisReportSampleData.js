'use strict';
const _ = require('lodash');

const pdfReport = [
  {
    find: 'Cardamom',
    name: 'Cardamom.pdf',
    fileS3Key: '',
    location: 'https://dimitra-public-images.s3.amazonaws.com/Cardamom.pdf',
  },
  {
    find: 'Coffee-Uganda',
    name: 'Coffee-Uganda.pdf',
    fileS3Key: '',
    location: 'https://dimitra-public-images.s3.amazonaws.com/Cardamom.pdf',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      for (let { find, name, location, fileS3Key } of pdfReport) {
        let sql = `select id, name, groupName from options where name like ? and groupName='crop-type'`;
        const cropTypes = await queryInterface.sequelize.query(sql, {
          replacements: [`%${find}%`],
          type: Sequelize.QueryTypes.SELECT,
        });

        if (_.isEmpty(cropTypes)) continue;

        const setData = { name, location, fileS3Key };
        let comprehensnsiveAnalysisReportsId = await queryInterface.insert(
          null,
          'comprehensnsive_analysis_reports',
          setData,
          { transaction }
        );
        comprehensnsiveAnalysisReportsId = comprehensnsiveAnalysisReportsId[0];

        const setMap = cropTypes?.map(({ id: cropTypeId }) => ({
          cropTypeId,
          comprehensnsiveAnalysisReportsId,
        }));
        await queryInterface.bulkInsert(
          'ComprehensnsiveAnalysisReportsAndCropTypes',
          setMap,
          { transaction }
        );
      }

      await transaction.commit();
    } catch (err) {
      await transaction?.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete(
        'ComprehensnsiveAnalysisReportsAndCropTypes',
        null,
        {
          transaction,
        }
      );
      await queryInterface.bulkDelete(
        'comprehensnsive_analysis_reports',
        null,
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction?.rollback();
      throw err;
    }
  },
};
