const express = require('express');

const router = express.Router();

router.use('/protocols', require('./esg-protocol'));
router.use('/issues', require('./esg-issue'));
router.use('/goals', require('./esg-goal'));

router.use('/discussions', require('./discussion'));

router.use('/survey-response', require('./survey/response/esgResponse'))

router.use('/analytics', require('./esg-analytics'));

module.exports = router;
