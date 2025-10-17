// worker.js
const Queue = require('bull');
const db = require(rootPath + "/models");
const axios = require('axios');
const { calculateLime } = require('./limeCalculationService');

const fetchAndSaveLimeAnalysisQueue = new Queue('fetchAndSaveLimeAnalysisQueue', {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});


const saveLimeAnalysis = async (limeAnalysisId, analysisPayload) => {
  try {
    const limeAnalysis = await db.LimeAnalysisResult.findOne({
      where: { id: limeAnalysisId },
    });

    if (!limeAnalysis) {
      throw new Error('Lime analysis request not found');
    }

    if (analysisPayload.success === false) {
      limeAnalysis.status = 'FAILED';
      limeAnalysis.success = false;
      limeAnalysis.remarks = analysisPayload.message ||"Region not supported"
      limeAnalysis.note = analysisPayload.note || analysisPayload.message || 'Failed to fetch data'
      await limeAnalysis.save();
      return { success: false, message: analysisPayload.message };
    }

    limeAnalysis.status = 'SUCCESS';
    limeAnalysis.currentSoilPh = analysisPayload.currentSoilPh;
    limeAnalysis.limeNeeded = analysisPayload.limeNeeded;
    limeAnalysis.limeUnit = analysisPayload.limeUnit;
    limeAnalysis.note = analysisPayload.note;
    limeAnalysis.success = analysisPayload.success;
    limeAnalysis.totalCost = analysisPayload.totalCost;
    limeAnalysis.success = true;
    await limeAnalysis.save();

    return { success: true, message: 'Lime analysis data saved successfully' };
  } catch (error) {
    throw error;
  }
};

fetchAndSaveLimeAnalysisQueue.process(async (job, done) => {
  const { payloadForAnalysis, limeAnalysisId } = job.data;
  try {
    const response = await calculateLime(payloadForAnalysis);
    const { success, message } = await saveLimeAnalysis(limeAnalysisId, response);
    done(null, { success, message });
  } catch (error) {
    console.error('Worker Error:', error.message, error.stack);
    done(new Error('Failed to fetch and save lime analysis data'));
  }
});

module.exports = fetchAndSaveLimeAnalysisQueue;
