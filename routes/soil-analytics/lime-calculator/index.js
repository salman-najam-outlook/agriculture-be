// routes
const express = require("express");
const router = express.Router();
const LimeAnalysisController = require("./LimeAnalysis.controller");
const auth = require(rootPath + "/middleware/auth");

router.post("/", auth, LimeAnalysisController.processLimeAnalysis);

router.get("/", auth, LimeAnalysisController.getAllLimeAnalysis);

router.get(
  "/job/:jobId",
  auth,
  LimeAnalysisController.getLimeAnalysisJobStatus
);

router.get("/:id", auth, LimeAnalysisController.getLimeAnalysisById);

router.delete("/:id", auth, LimeAnalysisController.deleteLimeAnalysis);

module.exports = router;
