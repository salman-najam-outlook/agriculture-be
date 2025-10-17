const db = require(rootPath + "/models");
const { success } = require(rootPath + "/helpers/language");
const { successRespSync } = require(rootPath + "/helpers/api");
const fetchAndSaveAnalysisQueue = require("./soilAnalysisQueue");
const { v4: uuidv4 } = require('uuid');

const handleErrorResponse = (res, error, message) => {
  console.error(message, error);
  return res.json({ success: false, message: "Server error" });
};

const fetchExistingData = async (latitude, longitude) => {
  return await db.SoilAnalysisRequest.findOne({
    where: { latitude, longitude },
    include: [
      {
        model: db.SoilAnalysisMetadata,
        as: "soil_analysis_metadata",
        attributes: ["id", "cf", "unit", "name", "description"],
        include: [
          {
            model: db.SoilAnalysisParameterRange,
            attributes: ["range", "uncertainty", "value"],
            as: "parameter_ranges",
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const saveRequestData = async (latitude, longitude, jobId) => {
  return await db.SoilAnalysisRequest.create({
    latitude,
    longitude,
    jobId,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
    refreshAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  });
};

const startFetchingSoilAnalytics = async (req, res) => {
  let { latitude, longitude } = req.body;
  latitude = Number(latitude)
  longitude = Number(longitude)
  const jobId = uuidv4();

  try {
    const existingData = await fetchExistingData(latitude, longitude);
    if (existingData) {
      const refreshAt = new Date(existingData.refreshAt);
      if (existingData.status === 'FAILED' || new Date() === refreshAt) {
        const request = await saveRequestData(latitude, longitude, jobId);
        fetchAndSaveAnalysisQueue.add({ latitude, longitude, request }, { jobId });
        return res.json({
          success: true,
          message: "Data fetching in progress.",
          data: { jobId, ...request.get() },
        });
      }
      return res.json({
        success: true,
        message: "Data fetched already",
        data: existingData,
      });
    }

    const request = await saveRequestData(latitude, longitude, jobId);
    fetchAndSaveAnalysisQueue.add({ latitude, longitude, request }, { jobId });
    return res.json({
      success: true,
      message: "Data fetching in progress.",
      data: { jobId, ...request.get() },
    });
  } catch (error) {
    return handleErrorResponse(res, error, "Error in startFetchingSoilAnalytics:");
  }
};

const getSoilAnalyticsJobStatus = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await fetchAndSaveAnalysisQueue.getJob(jobId);
    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }
    return res.json({
      success: true,
      message: "Job status fetched successfully",
      data: job,
    });
  } catch (error) {
    return handleErrorResponse(res, error, "Error in getSoilAnalyticsJobStatus:");
  }
};

const getSoilAnalytics = async (req, res) => {
  try {
    const analysisData = await fetchAllAnalysisData(req, res);
    analysisData.success = true;
    analysisData.message = "Data fetched successfully";
    return res.json(
     analysisData
    );
  } catch (err) {
    return handleErrorResponse(res, err, "Error in getSoilAnalytics:");
  }
};

const getSoilAnalyticsById = async (req, res) => {
  const { id } = req.params;

  try {
    const soilAnalysis = await db.SoilAnalysisRequest.findOne({
      where: { id },
      include: [
        {
          model: db.SoilAnalysisMetadata,
          as: "soil_analysis_metadata",
          attributes: ["id", "cf", "unit", "name", "description"],
          include: [
            {
              model: db.SoilAnalysisParameterRange,
              attributes: ["range", "uncertainty", "value"],
              as: "parameter_ranges",
            },
          ],
        },
      ],
    });

    if (!soilAnalysis) {
      return res.json(successRespSync({ msg: success.NOT_FOUND }));
    }

    return res.json(
      successRespSync({ msg: success.FETCH, data: soilAnalysis })
    );
  } catch (err) {
    return handleErrorResponse(res, err, "Error in getSoilAnalyticsById:");
  }
};

const deleteSoilAnalytics = async (req, res) => {
  const { id } = req.params;

  try {
    await db.SoilAnalysisRequest.destroy({ where: { id } });
    return res.json(successRespSync({ msg: success.DELETE }));
  } catch (err) {
    return handleErrorResponse(res, err, "Error in deleteSoilAnalytics:");
  }
};

const fetchAllAnalysisData = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const queryOptions = {
      include: [
        {
          model: db.SoilAnalysisMetadata,
          as: "soil_analysis_metadata",
          attributes: ["id", "cf", "unit", "name", "description"],
          include: [
            {
              model: db.SoilAnalysisParameterRange,
              attributes: ["range", "uncertainty", "value"],
              as: "parameter_ranges",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      distinct: true,
    };

    if (page && limit) {
      queryOptions.offset = (page - 1) * parseInt(limit, 10);
      queryOptions.limit = parseInt(limit, 10);
    }

    const data = await db.SoilAnalysisRequest.findAndCountAll(queryOptions);

    return {
      data: data.rows,
      page: page ? parseInt(page, 10) : null,
      limit: limit ? parseInt(limit, 10) : null,
      total: data.count,
    };
  } catch (error) {
    throw new Error("Failed to fetch analysis data");
  }
};

module.exports = {
  startFetchingSoilAnalytics,
  getSoilAnalyticsJobStatus,
  getSoilAnalytics,
  getSoilAnalyticsById,
  deleteSoilAnalytics,
  fetchExistingData,
  fetchAllAnalysisData,
};
