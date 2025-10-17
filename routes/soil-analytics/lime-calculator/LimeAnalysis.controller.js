const limeCalculationService = require("./limeCalculationService");
const fetchAndSaveLimeAnalysisQueue = require("./limeQueue");
const db = require(rootPath + "/models");
const { v4: uuidv4 } = require("uuid");

class LimeAnalysisController {
  static async processLimeAnalysis(req, res) {
    try {
      const soilData = req.body;
      const jobId = uuidv4();

      // Save initial request data with status 'PENDING'
      const limeAnalysis = await db.LimeAnalysisResult.create({
        ...soilData,
        status: "PENDING",
        remarks: null,
        currentSoilPh: null,
        limeNeeded: null,
        limeUnit: null,
        note: null,
        success: null,
        totalCost: null,
      });

      // Add job to the queue
      fetchAndSaveLimeAnalysisQueue.add(
        { payloadForAnalysis: soilData, limeAnalysisId: limeAnalysis.id },
        { jobId }
      );

      // Return the job ID and initial status
      res.status(200).json({ jobId, limeAnalysis });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllLimeAnalysis(req, res) {
   
    let queryOptions = {};
    const { page, limit } = req.query;

    if (page && limit) {
      queryOptions.offset = (page - 1) * parseInt(limit, 10);
      queryOptions.limit = parseInt(limit, 10);
    }
 
    if (req.query.orderBy && req.query.order) {
      queryOptions.order = [[req.query.orderBy, req.query.order]];
    }

    queryOptions.order = [["createdAt", "DESC"]];
    try {
      const limeAnalysis = await db.LimeAnalysisResult.findAndCountAll(queryOptions);
      res.status(200).json({ data: limeAnalysis.rows, total: limeAnalysis.count, page, limit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLimeAnalysisById(req, res) {
    const { id } = req.params;
    try {
      const limeAnalysis = await db.LimeAnalysisResult.findOne({
        where: { id },
      });

      if (!limeAnalysis) {
        return res.json({ message: "Lime analysis not found" });
      }

      return res.json({ data: limeAnalysis });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteLimeAnalysis(req, res) {
    const { id } = req.params;

    try {
      await db.LimeAnalysisResult.destroy({ where: { id } });
      return res.json({ message: "Lime analysis deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLimeAnalysisJobStatus(req, res) {
    const { jobId } = req.params;
    try {
      const job = await fetchAndSaveLimeAnalysisQueue.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const state = await job.getState();
      const progress = await job.progress();
      const returnData = { jobId, state, progress };

      if (state === "completed") {
        const result = await job.returnvalue;
        returnData.result = result;
      }

      res.status(200).json(returnData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LimeAnalysisController;
