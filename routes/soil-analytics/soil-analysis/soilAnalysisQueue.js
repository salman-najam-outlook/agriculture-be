// worker.js
const Queue = require('bull');
const db = require(rootPath + "/models");
const fetchSoilAnalysis = require("./soilAnalysisAIService");

const fetchAndSaveAnalysisQueue = new Queue('saveAnalysisQueue', {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});

const saveAnalysisAndRanges = async (latitude, longitude, analysisRequest, analysisPayload) => {
  try {
    const request = await db.SoilAnalysisRequest.findOne({
      where: {
        id: analysisRequest.id,
      },
    });
    request.remarks = analysisPayload.message;
    if(analysisPayload.success === false){
    // update the request status to failed
    //find and update the request
  
    request.status = 'FAILED';
    request.refreshAt = new Date();
    await request.save();
    return { success: false, message: analysisPayload.message };
    }
   
    // Create a new request entry
    request.status = 'SUCCESS';
    request.refreshAt = new Date();
    await request.save();


    // Prepare the payload for analysis metadata
    const analyticPayload = getPayloadForAnalysisMetaData(request.id, analysisPayload.data);

    if (!analyticPayload.length) {
      throw new Error('No analysis data found');
    }

    // Create new analysis metadata entries
    const newSoilAnalysisEntries = await db.SoilAnalysisMetadata.bulkCreate(
      analyticPayload
    );

    // Prepare the payload for parameter ranges
    const soilRangeData = getPayloadForRange(newSoilAnalysisEntries, analysisPayload.data);

    // Create new parameter range entries
    await db.SoilAnalysisParameterRange.bulkCreate(soilRangeData);

   
    return { success: true, message: 'Analysis data saved successfully' };
  } catch (error) {
    
    throw error;
  }
};

const getPayloadForAnalysisMetaData = (requestId, analysisData) => {
  return analysisData.map((analysis) => ({
    requestId,
    cf: analysis.cf,
    unit: analysis.unit,
    name: analysis.name,
    description: analysis.description,
  }));
};

const getPayloadForRange = (newSoilAnalysisEntries, analysisData) => {
  return analysisData.flatMap((analysis, index) => {
    const ranges = analysis.data;
    return Object.entries(ranges).map(([depth, rangeData]) => ({
      analysis_id: newSoilAnalysisEntries[index].id,
      parameter_key: analysis.name,
      range: depth,
      uncertainty: rangeData.uncertainty,
      value: rangeData.value,
    }));
  });
};


fetchAndSaveAnalysisQueue.process(async (job, done) => {
  const { latitude, longitude, request, parameters } = job.data;
  try {
    const analysisData = await fetchSoilAnalysis(latitude, longitude, parameters);
    const {success,message} = await saveAnalysisAndRanges(latitude, longitude,request, analysisData);
    done(null, { success, message});
  } catch (error) {
    console.error('Worker Error:', error.message, error.stack);
    done(new Error('Failed to fetch and save analysis data'));
  }
});


module.exports = fetchAndSaveAnalysisQueue;
