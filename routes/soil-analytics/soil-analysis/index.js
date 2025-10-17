const express = require('express');
const router = express.Router();
const SoilAnalyticsController = require('./SoilAnalytics.controller');
const auth = require(rootPath + "/middleware/auth");

// Route to get all soil analytics (more general route)
router.post('/', auth, SoilAnalyticsController.startFetchingSoilAnalytics);

router.get('/job/:jobId', auth, SoilAnalyticsController.getSoilAnalyticsJobStatus);

router.get('/', auth, SoilAnalyticsController.getSoilAnalytics);
// Route to get soil analytics by ID (more specific route)
router.get('/:id', auth, SoilAnalyticsController.getSoilAnalyticsById);

// Additional routes for adding, updating, and deleting soil analytics
// Uncomment these as needed
// router.post('/', auth, SoilAnalyticsController.addSoilAnalytics);
// router.put('/:id', auth, SoilAnalyticsController.updateSoilAnalytics);
router.delete('/:id', auth, SoilAnalyticsController.deleteSoilAnalytics);

module.exports = router;
